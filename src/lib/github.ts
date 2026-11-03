import { site } from "@/src/data/site";

export type ContributionLevel = 0 | 1 | 2 | 3 | 4;

export type GitHubActivityCell = {
  id: string;
  /** ISO date `YYYY-MM-DD`; empty for sample cells. */
  date: string;
  count: number;
  level: ContributionLevel;
  /** 0-based, oldest week first. */
  week: number;
  /** 0 = Sunday. */
  weekday: number;
};

export type GitHubActivity = {
  totalContributions: number;
  weeks: number;
  cells: GitHubActivityCell[];
  source: "github" | "fallback";
};

type GitHubContributionLevel =
  | "NONE"
  | "FIRST_QUARTILE"
  | "SECOND_QUARTILE"
  | "THIRD_QUARTILE"
  | "FOURTH_QUARTILE";

type GitHubContributionDay = {
  date: string;
  contributionCount: number;
  contributionLevel: GitHubContributionLevel;
};

export type GitHubWeek = {
  contributionDays: GitHubContributionDay[];
};

type GitHubGraphQLResponse = {
  data?: {
    user?: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: GitHubWeek[];
        };
      };
    } | null;
  };
  errors?: Array<{ message: string }>;
};

/** A rolling year: GitHub's default calendar spans 53 partial weeks. */
const WINDOW_WEEKS = 53;

const githubQuery = `
  query GitHubContributions($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }
`;

const levels: Record<GitHubContributionLevel, ContributionLevel> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

export function toLevel(level: GitHubContributionLevel): ContributionLevel {
  return levels[level] ?? 0;
}

/** Keeps the most recent 53 weeks; `week` counts from 0 at the oldest kept week. */
export function normalizeWeeks(weeks: GitHubWeek[]): GitHubActivityCell[] {
  return weeks.slice(-WINDOW_WEEKS).flatMap((week, weekIndex) =>
    week.contributionDays.map((day) => ({
      id: day.date,
      date: day.date,
      count: day.contributionCount,
      level: toLevel(day.contributionLevel),
      week: weekIndex,
      weekday: weekdayOf(day.date),
    })),
  );
}

/** Weekday of an ISO date (0 = Sunday); 0 when the date cannot be parsed. */
function weekdayOf(date: string): number {
  const day = new Date(`${date}T00:00:00Z`).getUTCDay();
  return Number.isNaN(day) ? 0 : day;
}

/** Sample data is fine in development but must never ship as if it were real. */
export function shouldShowCommits(
  activity: Pick<GitHubActivity, "source">,
  nodeEnv: string | undefined,
): boolean {
  return activity.source === "github" || nodeEnv !== "production";
}

function createFallbackActivity(): GitHubActivity {
  const cells: GitHubActivityCell[] = [];
  let seed = 42;
  const rnd = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  for (let week = 0; week < WINDOW_WEEKS; week += 1) {
    for (let weekday = 0; weekday < 7; weekday += 1) {
      const random = rnd();
      let level: ContributionLevel = 0;
      if (random > 0.35) level = 1;
      if (random > 0.55) level = 2;
      if (random > 0.78) level = 3;
      if (random > 0.92) level = 4;
      if ((weekday === 0 || weekday === 6) && random < 0.7 && level > 0) {
        level = (level - 1) as ContributionLevel;
      }

      cells.push({ id: `sample-${week}-${weekday}`, date: "", count: level * 2, level, week, weekday });
    }
  }

  return {
    totalContributions: cells.reduce((sum, cell) => sum + cell.count, 0),
    weeks: WINDOW_WEEKS,
    cells,
    source: "fallback",
  };
}

export async function getGitHubActivity(): Promise<GitHubActivity> {
  const token = process.env.GH_TOKEN ?? process.env.GITHUB_TOKEN;
  const username = process.env.GH_USERNAME || process.env.GITHUB_USERNAME || site.githubUsername;

  if (!token) {
    return createFallbackActivity();
  }

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: githubQuery, variables: { login: username } }),
      signal: AbortSignal.timeout(15_000),
    });

    if (!response.ok) {
      return createFallbackActivity();
    }

    const payload = (await response.json()) as GitHubGraphQLResponse;
    const calendar = payload.data?.user?.contributionsCollection.contributionCalendar;

    if (!calendar || payload.errors?.length) {
      return createFallbackActivity();
    }

    const cells = normalizeWeeks(calendar.weeks);

    return {
      totalContributions: calendar.totalContributions,
      weeks: Math.max(1, ...cells.map((cell) => cell.week + 1)),
      cells,
      source: "github",
    };
  } catch {
    return createFallbackActivity();
  }
}

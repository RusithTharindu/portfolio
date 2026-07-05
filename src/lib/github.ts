export type GitHubActivityCell = {
  id: string;
  date: string;
  count: number;
  color: string;
  gridColumn: number;
  gridRow: number;
};

export type GitHubRepository = {
  name: string;
  description: string | null;
  url: string;
  stargazerCount: number;
  forkCount: number;
  primaryLanguage: {
    name: string;
    color: string | null;
  } | null;
  pushedAt: string;
};

export type GitHubActivity = {
  totalContributions: number;
  fromLabel: string;
  toLabel: string;
  cells: GitHubActivityCell[];
  topStarredRepositories: GitHubRepository[];
  recentlyActiveRepositories: GitHubRepository[];
  source: "github" | "fallback";
};

type GitHubContributionDay = {
  date: string;
  contributionCount: number;
  color: string;
};

type GitHubWeek = {
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
      topStarredRepositories: {
        nodes: GitHubRepository[];
      };
      recentlyActiveRepositories: {
        nodes: GitHubRepository[];
      };
    };
  };
  errors?: Array<{ message: string }>;
};

const fallbackPalette = ["#18181b", "#2a1a1c", "#4a1f22", "#7a2a2e", "#f06a5f"];

const githubQuery = `
  query GitHubPortfolio($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              color
            }
          }
        }
      }
      topStarredRepositories: repositories(
        first: 4
        ownerAffiliations: OWNER
        isFork: false
        orderBy: { field: STARGAZERS, direction: DESC }
      ) {
        nodes {
          name
          description
          url
          stargazerCount
          forkCount
          primaryLanguage {
            name
            color
          }
          pushedAt
        }
      }
      recentlyActiveRepositories: repositories(
        first: 4
        ownerAffiliations: OWNER
        isFork: false
        orderBy: { field: PUSHED_AT, direction: DESC }
      ) {
        nodes {
          name
          description
          url
          stargazerCount
          forkCount
          primaryLanguage {
            name
            color
          }
          pushedAt
        }
      }
    }
  }
`;

function formatMonthLabel(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "2-digit",
  }).format(new Date(date));
}

function normalizeWeeks(weeks: GitHubWeek[]) {
  const recentWeeks = weeks.slice(-26);

  return recentWeeks.flatMap((week, weekIndex) =>
    week.contributionDays.map((day, dayIndex) => ({
      id: day.date,
      date: day.date,
      count: day.contributionCount,
      color: getContributionColor(day.contributionCount),
      gridColumn: weekIndex + 1,
      gridRow: dayIndex + 1,
    })),
  );
}

function getContributionColor(count: number) {
  if (count <= 0) return fallbackPalette[0];
  if (count <= 2) return fallbackPalette[1];
  if (count <= 5) return fallbackPalette[2];
  if (count <= 9) return fallbackPalette[3];

  return fallbackPalette[4];
}

function createFallbackActivity(): GitHubActivity {
  const cells: GitHubActivityCell[] = [];
  let seed = 42;
  const rnd = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  for (let day = 0; day < 7; day += 1) {
    for (let week = 0; week < 26; week += 1) {
      const random = rnd();
      let level = 0;
      if (random > 0.35) level = 1;
      if (random > 0.55) level = 2;
      if (random > 0.78) level = 3;
      if (random > 0.92) level = 4;
      if ((day === 0 || day === 6) && random < 0.7) {
        level = Math.max(0, level - 1);
      }

      cells.push({
        id: `${week}-${day}`,
        date: "",
        count: level,
        color: fallbackPalette[level],
        gridColumn: week + 1,
        gridRow: day + 1,
      });
    }
  }

  return {
    totalContributions: 1284,
    fromLabel: "sample",
    toLabel: "data",
    cells,
    topStarredRepositories: [],
    recentlyActiveRepositories: [],
    source: "fallback",
  };
}

export async function getGitHubActivity(): Promise<GitHubActivity> {
  const token = process.env.GH_TOKEN ?? process.env.GITHUB_TOKEN;
  const username = process.env.GH_USERNAME ?? process.env.GITHUB_USERNAME;

  if (!token || !username) {
    return createFallbackActivity();
  }

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: githubQuery,
        variables: {
          login: username,
        },
      }),
      next: {
        revalidate: 60 * 60 * 6,
      },
    });

    if (!response.ok) {
      return createFallbackActivity();
    }

    const payload = (await response.json()) as GitHubGraphQLResponse;
    const user = payload.data?.user;

    if (!user || payload.errors?.length) {
      return createFallbackActivity();
    }

    const weeks = user.contributionsCollection.contributionCalendar.weeks;
    const cells = normalizeWeeks(weeks);

    return {
      totalContributions:
        user.contributionsCollection.contributionCalendar.totalContributions,
      fromLabel: cells[0]?.date ? formatMonthLabel(cells[0].date) : "recent",
      toLabel: cells.at(-1)?.date
        ? formatMonthLabel(cells.at(-1)!.date)
        : "now",
      cells,
      topStarredRepositories: user.topStarredRepositories.nodes,
      recentlyActiveRepositories: user.recentlyActiveRepositories.nodes,
      source: "github",
    };
  } catch {
    return createFallbackActivity();
  }
}

"use client";

import { useInView } from "motion/react";
import { type CSSProperties, useRef } from "react";
import type { ContributionLevel, GitHubActivity } from "@/src/lib/github";
import { formatDay } from "@/src/lib/time";

/** Weeks shown below 640px. */
const MOBILE_WEEKS = 26;

const levelColors: Record<ContributionLevel, string> = {
  0: "#181818",
  1: "#2e2416",
  2: "#5e4521",
  3: "#a97a3a",
  4: "#e0a458",
};

function describe(count: number, date: string): string {
  const noun = count === 1 ? "contribution" : "contributions";
  return date ? `${count} ${noun} on ${formatDay(date)}` : `${count} ${noun} (sample)`;
}

type CommitGraphProps = {
  activity: GitHubActivity;
};

/**
 * Contribution calendar, one column per week. Cells pop in column by column the
 * first time the graph scrolls into view; phones show only the latest 26 weeks.
 */
export function CommitGraph({ activity }: CommitGraphProps) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.3 });
  const firstMobileWeek = activity.weeks - MOBILE_WEEKS;

  return (
    <div
      ref={ref}
      role="img"
      aria-label={`${activity.totalContributions.toLocaleString("en-US")} contributions in the last year`}
      data-seen={seen ? "" : undefined}
      style={{ "--weeks": activity.weeks, "--mobile-weeks": MOBILE_WEEKS } as CSSProperties}
      className="group grid grid-cols-[repeat(var(--mobile-weeks),minmax(0,1fr))] grid-rows-[repeat(7,auto)] gap-[3px] min-[640px]:grid-cols-[repeat(var(--weeks),minmax(0,1fr))]"
    >
      {activity.cells.map((cell) => {
        const hiddenOnMobile = cell.week < firstMobileWeek;
        return (
          <span
            key={cell.id}
            data-reveal=""
            data-settle=""
            title={describe(cell.count, cell.date)}
            style={
              {
                "--col": cell.week + 1,
                "--mobile-col": cell.week - firstMobileWeek + 1,
                gridRow: cell.weekday + 1,
                backgroundColor: levelColors[cell.level],
                transitionDelay: `${cell.week * 12}ms`,
              } as CSSProperties
            }
            className={`aspect-square scale-0 rounded-[2px] transition-[scale] duration-[400ms] ease-pop group-data-[seen]:scale-100 [grid-column:var(--mobile-col)] min-[640px]:block min-[640px]:[grid-column:var(--col)] ${
              hiddenOnMobile ? "hidden" : ""
            }`}
          />
        );
      })}
    </div>
  );
}

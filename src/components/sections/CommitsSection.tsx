import { Band } from "@/src/components/chrome/Band";
import { Reveal } from "@/src/components/chrome/Reveal";
import { CommitGraph } from "@/src/components/sections/CommitGraph";
import { RollingCount } from "@/src/components/sections/RollingCount";
import { type GitHubActivity, shouldShowCommits } from "@/src/lib/github";

type CommitsSectionProps = {
  activity: GitHubActivity;
};

/** GitHub contributions for the last year. Hidden in production when real data is unavailable. */
export function CommitsSection({ activity }: CommitsSectionProps) {
  if (!shouldShowCommits(activity, process.env.NODE_ENV)) return null;

  return (
    <Reveal as="section" id="commits" aria-labelledby="commits-title">
      <Band
        id="commits-title"
        title="Commits"
        aside={
          <>
            {activity.source === "fallback" ? <span className="mr-2 text-acc">sample data</span> : null}
            <RollingCount value={activity.totalContributions} /> in the last year
          </>
        }
      />
      <div className="px-4 pt-4 pb-[22px] xs:px-7">
        <CommitGraph activity={activity} />
      </div>
    </Reveal>
  );
}

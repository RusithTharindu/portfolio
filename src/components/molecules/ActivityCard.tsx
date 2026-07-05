import { ActivityGrid } from "@/src/components/atoms/ActivityGrid";
import { MotionCard } from "@/src/components/atoms/MotionCard";
import { SectionLabel } from "@/src/components/atoms/SectionLabel";
import type { GitHubActivity, GitHubRepository } from "@/src/lib/github";

const scaleColors = ["#18181b", "#2a1a1c", "#4a1f22", "#7a2a2e", "#f06a5f"];

type ActivityCardProps = {
  activity: GitHubActivity;
};

type RepositoryListProps = {
  title: string;
  repositories: GitHubRepository[];
  emptyLabel: string;
};

function RepositoryList({ title, repositories, emptyLabel }: RepositoryListProps) {
  return (
    <div className="gh-repo-group">
      <div className="gh-repos-title">{title}</div>
      {repositories.length ? (
        repositories.map((repository) => (
          <a href={repository.url} className="gh-repo" key={`${title}-${repository.name}`}>
            <span
              className="gh-repo-lang"
              style={{
                background: repository.primaryLanguage?.color ?? "var(--text-3)",
              }}
            />
            <span className="gh-repo-main">
              <span className="gh-repo-name">{repository.name}</span>
              <span className="gh-repo-desc">
                {repository.description ?? "No description provided."}
              </span>
            </span>
            <span className="gh-repo-meta">
              stars {repository.stargazerCount} · forks {repository.forkCount}
            </span>
          </a>
        ))
      ) : (
        <div className="gh-repo-empty">{emptyLabel}</div>
      )}
    </div>
  );
}

export function ActivityCard({ activity }: ActivityCardProps) {
  return (
    <MotionCard className="cell c-github" delay={0.3}>
      <div className="gh">
        <SectionLabel>Activity</SectionLabel>
        <div className="gh-head">
          <div className="gh-count">
            {activity.totalContributions.toLocaleString()} <small>CONTRIBUTIONS</small>
          </div>
          <div className="gh-year">
            {activity.source === "github" ? "GitHub" : "sample data"}
          </div>
        </div>
        <ActivityGrid cells={activity.cells} />
        <div className="gh-legend">
          <span>{activity.fromLabel}</span>
          <span className="gh-scale">
            less
            {scaleColors.map((color) => (
              <i style={{ background: color }} key={color} />
            ))}
            more
          </span>
          <span>{activity.toLabel}</span>
        </div>
        <div className="gh-repos">
          <RepositoryList
            title="Top starred"
            repositories={activity.topStarredRepositories}
            emptyLabel="Set GH_TOKEN and GH_USERNAME."
          />
          <RepositoryList
            title="Recently active"
            repositories={activity.recentlyActiveRepositories}
            emptyLabel="Set GH_TOKEN and GH_USERNAME."
          />
        </div>
      </div>
    </MotionCard>
  );
}

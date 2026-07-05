import { Chip } from "@/src/components/atoms/Chip";
import type { Project } from "@/src/data/projects";

type ProjectSectionsProps = {
  project: Project;
};

function splitRole(role: string) {
  const separatorIndex = role.indexOf(".");

  if (separatorIndex === -1) {
    return { lead: role, rest: "" };
  }

  return {
    lead: role.slice(0, separatorIndex + 1),
    rest: role.slice(separatorIndex + 1),
  };
}

export function ProjectSections({ project }: ProjectSectionsProps) {
  const role = splitRole(project.role);

  return (
    <div className="p-grid">
      <div className="p-label">Overview</div>
      <div className="p-body p-section">
        <h2>The problem</h2>
        <p>{project.overview.problem}</p>
        <h2>The approach</h2>
        <p>{project.overview.approach}</p>
      </div>

      <div className="p-label">Role</div>
      <div className="p-body p-section">
        <p>
          <strong>{role.lead}</strong>
          {role.rest}
        </p>
      </div>

      <div className="p-label">Highlights</div>
      <div className="p-body p-section">
        <ul>
          {project.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      </div>

      <div className="p-label">Stack</div>
      <div className="p-body p-section">
        <div className="p-chips">
          {project.stack.map((item, index) => (
            <Chip className="p-chip" isPrimary={index === 0} key={item}>
              {item}
            </Chip>
          ))}
        </div>
      </div>

      <div className="p-label">At a glance</div>
      <div className="p-body p-section">
        <div className="p-kv">
          {project.glance.map(([key, value]) => (
            <div className="row" key={key}>
              <b>{key}</b>
              <span className={key === "Status" ? "accent-text" : undefined}>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

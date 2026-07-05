"use client";

import {
  FormEvent,
  KeyboardEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { projects } from "@/src/data/projects";
import {
  education,
  socials,
  stackGroups,
  stats,
  timeline,
} from "@/src/data/portfolio";

type TerminalTone = "accent" | "dim" | "error" | "success" | "text";

type TerminalLine =
  | {
      kind: "blank";
    }
  | {
      href?: string;
      kind: "text";
      text: string;
      tone?: TerminalTone;
    };

type TerminalEntry = {
  command?: string;
  id: number;
  lines: TerminalLine[];
};

type TerminalModeProps = {
  isActive: boolean;
  onExit: () => void;
};

type CommandResult = {
  action?: "clear" | "exit" | "navigate";
  href?: string;
  lines: TerminalLine[];
};

const prompt = {
  host: "bento",
  path: "~/portfolio",
  user: "rusith",
};

const commandSummaries: Array<[string, string]> = [
  ["about", "read the short bio"],
  ["skills", "list the stack by group"],
  ["projects", "show selected work"],
  ["project <slug>", "inspect a project"],
  ["experience", "show recent roles"],
  ["education", "show degrees"],
  ["stats", "show portfolio metrics"],
  ["contact", "show contact links"],
  ["open <target>", "open github, linkedin, email, or a project"],
  ["clear", "reset the terminal"],
  ["exit", "return to bento mode"],
];

const welcomeLines: TerminalLine[] = [
  {
    kind: "text",
    text: "Rusith Tharindu Thushan interactive shell",
    tone: "accent",
  },
  {
    kind: "text",
    text: "Software engineer focused on secure, polished web systems.",
  },
  { kind: "blank" },
  { kind: "text", text: "Run `help` to list commands.", tone: "dim" },
];

function line(
  text: string,
  tone: TerminalTone = "text",
  href?: string,
): TerminalLine {
  return {
    href,
    kind: "text",
    text,
    tone,
  };
}

function blank(): TerminalLine {
  return { kind: "blank" };
}

function findSocial(target: string) {
  const normalized = target.toLowerCase();

  return socials.find((social) => {
    const label = social.label.toLowerCase();

    return label === normalized || label.split(" ")[0] === normalized;
  });
}

function buildOpenTargets() {
  return new Map<string, string>([
    ["github", "https://github.com/RusithTharindu"],
    ["linkedin", "https://www.linkedin.com/in/rusith-tharindu-thushan/"],
    ["email", "mailto:rusith.tharindu.thushan@gmail.com"],
    ["mail", "mailto:rusith.tharindu.thushan@gmail.com"],
    ...projects.map(
      (project) => [project.slug, `/projects/${project.slug}`] as const,
    ),
  ]);
}

function runCommand(rawCommand: string): CommandResult {
  const command = rawCommand.trim();
  const [base = "", ...args] = command.split(/\s+/);
  const normalized = base.toLowerCase();

  if (!command) {
    return {
      lines: [],
    };
  }

  if (normalized === "clear") {
    return {
      action: "clear",
      lines: [],
    };
  }

  if (["exit", "bento", "gui"].includes(normalized)) {
    return {
      action: "exit",
      lines: [line("Returning to bento mode...", "accent")],
    };
  }

  if (["help", "?"].includes(normalized)) {
    return {
      lines: [
        line("available commands", "accent"),
        ...commandSummaries.map(([name, description]) =>
          line(`  ${name.padEnd(16, " ")} ${description}`, "dim"),
        ),
      ],
    };
  }

  if (["whoami", "about"].includes(normalized)) {
    return {
      lines: [
        line("Rusith Tharindu Thushan", "accent"),
        line("Software Engineer | Cybersecurity postgraduate | Sri Lanka"),
        line(
          "I build React, Next.js, Node.js, and Java systems with a bias for clean interfaces, reliable backend contracts, and security-minded engineering.",
          "dim",
        ),
      ],
    };
  }

  if (["skills", "stack"].includes(normalized)) {
    const groupQuery = args.join(" ").toLowerCase();
    const groups = groupQuery
      ? stackGroups.filter(([group]) =>
          group.toLowerCase().includes(groupQuery),
        )
      : stackGroups;

    if (!groups.length) {
      return {
        lines: [line(`No stack group found for "${groupQuery}".`, "error")],
      };
    }

    return {
      lines: groups.flatMap(([group, items]) => [
        line(group, "accent"),
        line(`  ${items.join("  /  ")}`, "dim"),
      ]),
    };
  }

  if (["projects", "work"].includes(normalized)) {
    return {
      lines: [
        line("selected projects", "accent"),
        ...projects.map((project) =>
          line(
            `  ${project.slug.padEnd(8, " ")} ${project.title} - ${project.description}`,
            "dim",
            `/projects/${project.slug}`,
          ),
        ),
        blank(),
        line("Run `project passgo` or `open passgo` for details.", "dim"),
      ],
    };
  }

  if (normalized === "project") {
    const slug = args[0]?.toLowerCase();
    const project = projects.find((item) => item.slug === slug);

    if (!project) {
      return {
        lines: [
          line("Project not found.", "error"),
          line(
            `Available: ${projects.map((item) => item.slug).join(", ")}`,
            "dim",
          ),
        ],
      };
    }

    return {
      lines: [
        line(
          `${project.title} [${project.status}]`,
          "accent",
          `/projects/${project.slug}`,
        ),
        line(project.lede, "dim"),
        blank(),
        line(`role: ${project.role}`),
        line(`stack: ${project.stack.join(", ")}`, "dim"),
        ...project.highlights
          .slice(0, 3)
          .map((highlight) => line(`- ${highlight}`, "dim")),
      ],
    };
  }

  if (["experience", "timeline"].includes(normalized)) {
    return {
      lines: timeline.flatMap(([period, role, company, description]) => [
        line(`${period} | ${role} @ ${company}`, "accent"),
        line(`  ${description}`, "dim"),
      ]),
    };
  }

  if (normalized === "education") {
    return {
      lines: education.flatMap((item) => [
        line(`${item.period} | ${item.qualification}`, "accent"),
        line(`  ${item.institution} - ${item.state}`, "dim"),
        line(`  ${item.highlights.join(" / ")}`, "dim"),
      ]),
    };
  }

  if (normalized === "stats") {
    return {
      lines: stats.map(([value, suffix, label]) =>
        line(`${value}${suffix === "*" ? "" : suffix}  ${label}`, "accent"),
      ),
    };
  }

  if (["contact", "socials"].includes(normalized)) {
    return {
      lines: [
        line("contact", "accent"),
        line(
          "  email     rusith.tharindu.thushan@gmail.com",
          "dim",
          "mailto:rusith.tharindu.thushan@gmail.com",
        ),
        ...socials.map((social) =>
          line(
            `  ${social.label.padEnd(9, " ")} ${social.href}`,
            "dim",
            social.href,
          ),
        ),
      ],
    };
  }

  if (normalized === "open") {
    const target = args[0]?.toLowerCase();

    if (!target) {
      return {
        lines: [
          line("Usage: open <github|linkedin|email|project-slug>", "error"),
        ],
      };
    }

    const href = buildOpenTargets().get(target) ?? findSocial(target)?.href;

    if (!href) {
      return {
        lines: [line(`Unknown target "${target}".`, "error")],
      };
    }

    if (href.startsWith("/")) {
      return {
        action: "navigate",
        href,
        lines: [line(`Opening ${target}...`, "success")],
      };
    }

    window.open(href, "_blank", "noopener,noreferrer");

    return {
      lines: [line(`Opening ${target}...`, "success", href)],
    };
  }

  return {
    lines: [
      line(`${base}: command not found`, "error"),
      line("Run `help` to see available commands.", "dim"),
    ],
  };
}

function Prompt() {
  return (
    <span className="tm-prompt" aria-hidden="true">
      <span className="tm-user">{prompt.user}</span>
      <span className="tm-dim">@</span>
      <span>{prompt.host}</span> <span className="tm-path">{prompt.path}</span>{" "}
      <span className="tm-dim">$</span>
    </span>
  );
}

function TerminalLineView({ item }: { item: TerminalLine }) {
  if (item.kind === "blank") {
    return (
      <div className="tm-line" aria-hidden="true">
        &nbsp;
      </div>
    );
  }

  const className = item.tone ? `tm-line tone-${item.tone}` : "tm-line";

  if (item.href) {
    if (item.href.startsWith("/")) {
      return (
        <Link className={className} href={item.href}>
          {item.text}
        </Link>
      );
    }
    return (
      <a
        className={className}
        href={item.href}
        rel="noopener noreferrer"
        target="_blank"
      >
        {item.text}
      </a>
    );
  }

  return <div className={className}>{item.text}</div>;
}

export function TerminalMode({ isActive, onExit }: TerminalModeProps) {
  const router = useRouter();
  const [entries, setEntries] = useState<TerminalEntry[]>([
    {
      id: 0,
      lines: welcomeLines,
    },
  ]);
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const historyIndex = useRef<number | null>(null);
  const nextId = useRef(1);

  const sidebarProjects = useMemo(() => projects, []);

  useEffect(() => {
    if (isActive) {
      window.setTimeout(() => inputRef.current?.focus(), 520);
    }
  }, [isActive]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [entries]);

  function pushEntry(command: string, lines: TerminalLine[]) {
    setEntries((current) => [
      ...current,
      {
        command,
        id: nextId.current,
        lines,
      },
    ]);
    nextId.current += 1;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const command = input.trim();
    const result = runCommand(command);

    setInput("");
    historyIndex.current = null;

    if (command) {
      setCommandHistory((current) => [...current, command]);
    }

    if (result.action === "clear") {
      setEntries([]);
      return;
    }

    pushEntry(command, result.lines);

    if (result.action === "exit") {
      window.setTimeout(onExit, 260);
    }

    if (result.action === "navigate" && result.href) {
      window.setTimeout(() => router.push(result.href!), 260);
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowUp") {
      event.preventDefault();

      if (!commandHistory.length) return;

      const next =
        historyIndex.current === null
          ? commandHistory.length - 1
          : Math.max(0, historyIndex.current - 1);

      historyIndex.current = next;
      setInput(commandHistory[next] ?? "");
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();

      if (historyIndex.current === null) return;

      const next = historyIndex.current + 1;

      if (next >= commandHistory.length) {
        setInput("");
        historyIndex.current = null;
        return;
      }

      historyIndex.current = next;
      setInput(commandHistory[next] ?? "");
    }
  }

  return (
    <section
      aria-hidden={!isActive}
      aria-label="Terminal portfolio mode"
      className={isActive ? "terminal-mode is-active" : "terminal-mode"}
      inert={!isActive}
    >
      <div className="terminal-mode-window">
        <div className="terminal-mode-bar">
          <div className="term-window-controls" aria-hidden="true">
            <span className="term-dot r" />
            <span className="term-dot y" />
            <span className="term-dot g" />
          </div>
          <div className="terminal-mode-title">rusith@bento:~/portfolio</div>
          <button
            aria-label="Return to bento mode"
            className="terminal-close"
            onClick={onExit}
            type="button"
          >
            <span aria-hidden="true">exit</span>
          </button>
        </div>

        <div className="terminal-mode-layout">
          <aside className="terminal-side" aria-label="Portfolio directories">
            <div className="terminal-side-kicker">/home/rusith</div>
            <div className="terminal-tree">
              <span>portfolio</span>
              <span>about.md</span>
              <span>skills.json</span>
              <span>experience.log</span>
              <span>education.txt</span>
              {sidebarProjects.map((project) => (
                <Link
                  className="terminal-route"
                  href={`/projects/${project.slug}`}
                  key={project.slug}
                >
                  ./projects/{project.slug}
                </Link>
              ))}
            </div>
            <div className="terminal-side-stat">
              <span>mode</span>
              <b>interactive</b>
            </div>
          </aside>

          <div
            className="terminal-console"
            onClick={() => inputRef.current?.focus()}
            ref={scrollRef}
          >
            <div className="terminal-scroll">
              {entries.map((entry) => (
                <div className="tm-entry" key={entry.id}>
                  {entry.command !== undefined ? (
                    <div className="tm-command">
                      <Prompt /> <span>{entry.command}</span>
                    </div>
                  ) : null}
                  {entry.lines.map((item, index) => (
                    <TerminalLineView
                      item={item}
                      key={`${entry.id}-${index}`}
                    />
                  ))}
                </div>
              ))}

              <form className="tm-form" onSubmit={handleSubmit}>
                <Prompt />
                <input
                  aria-label="Terminal command"
                  autoCapitalize="none"
                  autoComplete="off"
                  autoCorrect="off"
                  disabled={!isActive}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={handleKeyDown}
                  ref={inputRef}
                  spellCheck={false}
                  type="text"
                  value={input}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

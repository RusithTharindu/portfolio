"use client";

import { Spotlight } from "@/src/components/atoms/Spotlight";
import { AboutCard } from "@/src/components/molecules/AboutCard";
import { ContactCard } from "@/src/components/molecules/ContactCard";
import { EducationCard } from "@/src/components/molecules/EducationCard";
import { HeroCard } from "@/src/components/molecules/HeroCard";
import { PortfolioFooter } from "@/src/components/molecules/PortfolioFooter";
import { PortfolioNav } from "@/src/components/molecules/PortfolioNav";
import { ProjectsCard } from "@/src/components/molecules/ProjectsCard";
import { StackCard } from "@/src/components/molecules/StackCard";
import { StatsCard } from "@/src/components/molecules/StatsCard";
import { StatusCard } from "@/src/components/molecules/StatusCard";
import { TerminalCard } from "@/src/components/molecules/TerminalCard";
import { TerminalMode } from "@/src/components/organisms/TerminalMode";
import { TimelineCard } from "@/src/components/molecules/TimelineCard";
import type { GitHubActivity } from "@/src/lib/github";
import { useEffect, useState } from "react";

type PortfolioExperienceProps = {
  activity: GitHubActivity;
};

export function PortfolioExperience({ activity }: PortfolioExperienceProps) {
  const [isTerminalMode, setIsTerminalMode] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 1025px)");

    function syncDesktopState() {
      setIsDesktop(desktopQuery.matches);

      if (!desktopQuery.matches) {
        setIsTerminalMode(false);
      }
    }

    syncDesktopState();
    desktopQuery.addEventListener("change", syncDesktopState);

    return () => desktopQuery.removeEventListener("change", syncDesktopState);
  }, []);

  useEffect(() => {
    document.body.classList.toggle(
      "terminal-mode-body",
      isDesktop && isTerminalMode,
    );

    return () => document.body.classList.remove("terminal-mode-body");
  }, [isDesktop, isTerminalMode]);

  const terminalEnabled = isDesktop;

  return (
    <>
      <Spotlight />
      <div className={isTerminalMode ? "shell terminal-active" : "shell"}>
        <PortfolioNav
          isTerminalMode={terminalEnabled && isTerminalMode}
          onTerminalToggle={
            terminalEnabled
              ? () => setIsTerminalMode((current) => !current)
              : undefined
          }
          showTerminalToggle={terminalEnabled}
        />
        <div
          className={
            terminalEnabled && isTerminalMode
              ? "portfolio-stage is-terminal"
              : "portfolio-stage"
          }
        >
          <main
            className="bento bento-face"
            aria-hidden={terminalEnabled && isTerminalMode}
          >
            <HeroCard />
            <StatusCard />
            <AboutCard />
            <StackCard />
            <StatsCard />
            <ProjectsCard />
            <TerminalCard />
            <TimelineCard />
            <EducationCard />
            <ContactCard />
          </main>
          {terminalEnabled ? (
            <TerminalMode
              isActive={isTerminalMode}
              onExit={() => setIsTerminalMode(false)}
            />
          ) : null}
        </div>
        <PortfolioFooter />
      </div>
    </>
  );
}

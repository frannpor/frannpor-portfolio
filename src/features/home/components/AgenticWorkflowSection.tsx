import { Bot, Workflow } from "@/shared/icons";
import type { CSSProperties } from "react";
import type { PortfolioContent } from "@/features/home/data/portfolio";
import styles from "@/features/home/home.module.css";

type AgenticWorkflowSectionProps = {
  workflow: PortfolioContent["agenticWorkflow"];
};

export function AgenticWorkflowSection({ workflow }: AgenticWorkflowSectionProps) {
  return (
    <section className={styles.agentSection} id="ai-agent" aria-label={workflow.eyebrow}>
      <div className={styles.agentIntro}>
        <div className={styles.kicker}>
          <Bot size={17} />
          <span>{workflow.eyebrow}</span>
        </div>
        <h2>{workflow.title}</h2>
        <p>{workflow.description}</p>
      </div>
      <div className={styles.workflowRail}>
        <Workflow className={styles.workflowIcon} size={22} />
        <svg className={styles.pipelineSvg} viewBox="0 0 600 80" aria-hidden="true">
          <path d="M24 40 C 126 8, 188 72, 292 40 S 472 8, 576 40" />
        </svg>
        {workflow.steps.map((step, index) => (
          <div key={step} style={{ "--step-index": index } as CSSProperties}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{step}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}

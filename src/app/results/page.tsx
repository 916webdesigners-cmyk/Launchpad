"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { GeneratedWorkflow, SkillFile } from "@/types";
import styles from "./page.module.css";

const PHASE_ICONS = ["🏗️", "🎨", "⚙️", "💳", "🚀", "🔧", "📊", "🧪"];

export default function ResultsPage() {
  const router = useRouter();
  const [workflow, setWorkflow] = useState<GeneratedWorkflow | null>(null);
  const [expandedPhase, setExpandedPhase] = useState<number | null>(0);
  const [previewFile, setPreviewFile] = useState<SkillFile | null>(null);

  useEffect(() => {
    const storedWorkflow = sessionStorage.getItem("launchpad_workflow");
    if (storedWorkflow) {
      try {
        setWorkflow(JSON.parse(storedWorkflow));
      } catch {
        router.push("/onboarding");
      }
    } else {
      router.push("/onboarding");
    }
  }, [router]);

  const handleDownload = (file: SkillFile) => {
    const blob = new Blob([file.fileContent], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.fileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadAll = () => {
    if (!workflow) return;
    workflow.skillFiles.forEach((file, i) => {
      setTimeout(() => handleDownload(file), i * 150);
    });
  };

  if (!workflow) {
    return (
      <>
        <Navbar />
        <main className={styles.main}>
          <div className={styles.loading}>
            <div className={styles.loadingSpinner} />
            <p>Loading your workflow...</p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />

      {/* Skill File Preview Modal */}
      {previewFile && (
        <div className={styles.previewOverlay} onClick={() => setPreviewFile(null)}>
          <div className={styles.previewModal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.previewHeader}>
              <div className={styles.previewHeaderLeft}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                <span className={styles.previewFileName}>{previewFile.fileName}</span>
              </div>
              <div className={styles.previewActions}>
                <button className={styles.previewDownloadBtn} onClick={() => handleDownload(previewFile)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Download
                </button>
                <button className={styles.previewCloseBtn} onClick={() => setPreviewFile(null)}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </div>
            <div className={styles.previewBody}>
              <pre className={styles.previewContent}>{previewFile.fileContent}</pre>
            </div>
          </div>
        </div>
      )}

      <main className={styles.main}>
        {/* Header */}
        <section className={styles.header}>
          <div className={styles.headerGlow} />
          <div className={styles.headerContent}>
            {workflow.warnings && workflow.warnings.length > 0 && (
              <div className={styles.warningBanner}>
                <span className={styles.warningIcon}>⚠️</span>
                <div>
                  {workflow.warnings.map((w, i) => {
                    const parsedHtml = w.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                    return (
                      <p key={i} className={styles.warningText} dangerouslySetInnerHTML={{ __html: parsedHtml }} />
                    );
                  })}
                </div>
              </div>
            )}

            <h1 className={styles.headerTitle}>
              Your LaunchPad Workflow is{" "}
              <span className="gradient-text">Ready</span>
            </h1>
            <p className={styles.headerSubtitle}>
              {workflow.projectSummary}
            </p>

            {/* Stats row */}
            <div className={styles.statsRow}>
              <div className={styles.statBadge}>
                <span className={styles.statNumber}>{workflow.phases.length}</span>
                <span className={styles.statLabel}>Phases</span>
              </div>
              <div className={styles.statBadge}>
                <span className={styles.statNumber}>{workflow.skillFiles.length}</span>
                <span className={styles.statLabel}>Skill Files</span>
              </div>
              <div className={styles.statBadge}>
                <span className={styles.statNumber}>{workflow.recommendedStack?.length || 0}</span>
                <span className={styles.statLabel}>Tools</span>
              </div>
            </div>

            {workflow.recommendedStack && workflow.recommendedStack.length > 0 && (
              <div className={styles.stackPills}>
                {workflow.recommendedStack.map((tool, i) => (
                  <span key={i} className={styles.stackPill}>{tool}</span>
                ))}
              </div>
            )}
          </div>
        </section>

        <div className={styles.resultsLayout}>
          {/* Left Column: Phases */}
          <div className={styles.leftColumn}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionIcon}>📋</span>
              <h2 className={styles.sectionTitle}>Your Workflow Phases</h2>
            </div>

            <div className={styles.phaseList}>
              {workflow.phases.map((phase, i) => (
                <div
                  key={i}
                  className={`${styles.phaseCard} ${expandedPhase === i ? styles.phaseCardExpanded : ""}`}
                >
                  <button
                    className={styles.phaseHeader}
                    onClick={() => setExpandedPhase(expandedPhase === i ? null : i)}
                  >
                    <div className={styles.phaseLeft}>
                      <span className={styles.phaseIcon}>
                        {PHASE_ICONS[i] || "📌"}
                      </span>
                      <div>
                        <p className={styles.phaseNumber}>Phase {phase.phaseNumber}</p>
                        <h3 className={styles.phaseName}>{phase.phaseName}</h3>
                      </div>
                    </div>
                    <div className={styles.phaseRight}>
                      <span className={styles.phaseTime}>{phase.estimatedTime}</span>
                      <svg
                        className={`${styles.phaseChevron} ${expandedPhase === i ? styles.phaseChevronOpen : ""}`}
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </div>
                  </button>

                  {expandedPhase === i && (
                    <div className={styles.phaseBody}>
                      <p className={styles.phaseDescription}>{phase.description}</p>

                      <div className={styles.phaseSteps}>
                        <p className={styles.phaseStepsLabel}>Steps</p>
                        {phase.steps.map((s, j) => (
                          <div key={j} className={styles.phaseStep}>
                            <span className={styles.phaseStepNum}>{j + 1}</span>
                            <span>{s}</span>
                          </div>
                        ))}
                      </div>

                      {phase.tools && phase.tools.length > 0 && (
                        <div className={styles.phaseTools}>
                          {phase.tools.map((t, j) => (
                            <span key={j} className={styles.phaseTool}>{t}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Skill Files + Stripe + Examples */}
          <div className={styles.rightColumn}>
            {/* Skill Files */}
            <div className={styles.sectionHeader}>
              <span className={styles.sectionIcon}>📁</span>
              <h2 className={styles.sectionTitle}>Your Skill Files</h2>
              <span className={styles.skillCount}>{workflow.skillFiles.length} files</span>
            </div>

            <div className={styles.skillFileList}>
              {workflow.skillFiles.map((file, i) => (
                <div key={i} className={styles.skillFileCard}>
                  <div className={styles.skillFileInfo}>
                    <div className={styles.skillFileIcon}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                      </svg>
                    </div>
                    <div>
                      <p className={styles.skillFileName}>{file.fileName}</p>
                      <p className={styles.skillFileDesc}>{file.description}</p>
                      <p className={styles.skillFileMeta}>Markdown · Ready to use</p>
                    </div>
                  </div>
                  <div className={styles.skillFileActions}>
                    <button
                      className={styles.previewBtn}
                      onClick={() => setPreviewFile(file)}
                      title="Preview"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </button>
                    <button
                      className={styles.downloadBtn}
                      onClick={() => handleDownload(file)}
                      title="Download"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button className={`btn-secondary ${styles.downloadAllBtn}`} onClick={handleDownloadAll}>
              Download All {workflow.skillFiles.length} Files
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </button>

            {/* Stripe Guide */}
            {workflow.stripeGuide && (
              <div className={styles.stripeSection}>
                <div className={styles.sectionHeader}>
                  <span className={styles.sectionIcon}>💳</span>
                  <h2 className={styles.sectionTitle}>Stripe Integration Guide</h2>
                </div>
                <div className={styles.stripeContent}>
                  <p>{workflow.stripeGuide}</p>
                </div>
              </div>
            )}

            {/* Example Workflows */}
            <div className={styles.examplesSection}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionIcon}>💡</span>
                <h2 className={styles.sectionTitle}>Example Workflows</h2>
              </div>
              <div className={styles.exampleCards}>
                <div className={styles.exampleCard}>
                  <span className={styles.exampleBadge}>E-commerce · Stripe · Stitch</span>
                  <h4 className={styles.exampleTitle}>Secure Payment Gateway</h4>
                  <p className={styles.exampleDesc}>
                    PCI-compliant workflow for global recurring billing.
                  </p>
                </div>
                <div className={styles.exampleCard}>
                  <span className={styles.exampleBadge}>SaaS · Firebase · Vercel</span>
                  <h4 className={styles.exampleTitle}>Neural Engine Pipeline</h4>
                  <p className={styles.exampleDesc}>
                    Data ingestion and model training automation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <section className={styles.bottomCta}>
          <h3 className={styles.bottomCtaTitle}>Want to refine your workflow?</h3>
          <p className={styles.bottomCtaSubtitle}>
            Adjust your parameters and regenerate instantly.
          </p>
          <div className={styles.bottomCtaButtons}>
            <button
              className="btn-ghost"
              onClick={() => router.push("/onboarding")}
            >
              ← Start Over
            </button>
            <button className="btn-primary" onClick={handleDownloadAll}>
              Save & Export
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

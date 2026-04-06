"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { QuestionnaireAnswers } from "@/types";
import styles from "./page.module.css";

const DESIGN_TOOLS = ["Figma", "Google Stitch", "Framer", "Webflow", "Wix", "Canva"];
const BUILD_TOOLS = ["Antigravity IDE", "VS Code", "Cursor", "Replit", "WebStorm"];
const HOSTING_TOOLS = ["Vercel", "Netlify", "Firebase", "GitHub Pages", "AWS", "Railway"];

const FEATURE_OPTIONS = [
  { id: "stripe", icon: "💳", label: "Stripe Payment Integration", desc: "Checkout, subscriptions, and billing." },
  { id: "auth", icon: "🔐", label: "User Authentication", desc: "Secure login, OAuth, and profiles." },
  { id: "booking", icon: "📅", label: "Booking System", desc: "Scheduling and appointment management." },
  { id: "contact", icon: "📧", label: "Contact Form", desc: "Lead capture and custom inquiries." },
  { id: "products", icon: "🛒", label: "Product Listings", desc: "Inventory display and catalog search." },
  { id: "admin", icon: "📊", label: "Admin Dashboard", desc: "Content management and site analytics." },
  { id: "domain", icon: "🌐", label: "Custom Domain", desc: "Connect your own brand address." },
  { id: "mobile", icon: "📱", label: "Mobile Optimization", desc: "Responsive layouts for all devices." },
  { id: "seo", icon: "🔍", label: "SEO Setup", desc: "Built-in search engine visibility tools." },
  { id: "ai", icon: "🤖", label: "AI Integration", desc: "Smart features and automation." },
];

const LOADING_MESSAGES = [
  "Analyzing your project vision…",
  "Mapping your tech stack…",
  "Building your workflow phases…",
  "Generating your skill files…",
  "Almost ready…",
];

const STEP_LABELS = ["Vision", "Stack", "Features", "Timeline", "Preferences"];

const initialAnswers: QuestionnaireAnswers = {
  projectDescription: "",
  websiteType: "",
  skillLevel: "",
  designTools: [],
  buildTools: [],
  hostingTools: [],
  otherStack: "",
  features: [],
  otherFeatures: "",
  timeline: "",
  teamSize: "",
  projectType: "Personal",
  budget: "",
  stripeIntegration: "No",
  backendNeeded: "No",
  aiAssisted: "No",
  additionalNotes: "",
};

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuestionnaireAnswers>(initialAnswers);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMsgIndex, setLoadingMsgIndex] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");

  const progress = ((step + 1) / 5) * 100;

  const toggleArrayItem = (
    field: "designTools" | "buildTools" | "hostingTools" | "features",
    item: string
  ) => {
    setAnswers((prev) => {
      const arr = prev[field] as string[];
      return {
        ...prev,
        [field]: arr.includes(item)
          ? arr.filter((x) => x !== item)
          : [...arr, item],
      };
    });
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    setLoadingMsgIndex(0);
    setErrorMsg("");

    const interval = setInterval(() => {
      setLoadingMsgIndex((prev) =>
        prev < LOADING_MESSAGES.length - 1 ? prev + 1 : prev
      );
    }, 2500);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answers),
      });

      const workflow = await response.json();

      if (response.ok) {
        sessionStorage.setItem("launchpad_workflow", JSON.stringify(workflow));
        sessionStorage.setItem("launchpad_answers", JSON.stringify(answers));
        router.push("/results");
      } else {
        setErrorMsg(workflow.error || "Something went wrong. Please try again.");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error generating workflow:", error);
      setErrorMsg("Network error. Please check your connection and try again.");
      setIsLoading(false);
    } finally {
      clearInterval(interval);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 0:
        return answers.projectDescription.trim().length > 10 && answers.websiteType && answers.skillLevel;
      case 1:
        return answers.designTools.length > 0 || answers.buildTools.length > 0;
      case 2:
        return answers.features.length > 0;
      case 3:
        return answers.timeline && answers.teamSize && answers.budget;
      case 4:
        return true;
      default:
        return false;
    }
  };

  return (
    <>
      <Navbar />

      {/* Loading Overlay */}
      {isLoading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.loadingContent}>
            <div className={styles.loadingSpinner} />
            <p className={styles.loadingText}>
              {LOADING_MESSAGES[loadingMsgIndex]}
            </p>
            <div className={styles.loadingBar}>
              <div
                className={styles.loadingBarFill}
                style={{
                  width: `${((loadingMsgIndex + 1) / LOADING_MESSAGES.length) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
      )}

      <main className={styles.main}>
        {/* Progress Header */}
        <div className={styles.progressHeader}>
          <div className={styles.stepLabels}>
            {STEP_LABELS.map((label, i) => (
              <button
                key={i}
                className={`${styles.stepLabel} ${i === step ? styles.stepLabelActive : ""} ${i < step ? styles.stepLabelDone : ""}`}
                onClick={() => i <= step && setStep(i)}
              >
                <span className={styles.stepNumber}>{i < step ? "✓" : i + 1}</span>
                <span className={styles.stepText}>{label}</span>
              </button>
            ))}
          </div>
          <div className="progress-bar-container">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
          </div>
          <p className={styles.progressLabel}>{Math.round(progress)}% Complete</p>
        </div>

        {/* Step Content */}
        <div className={styles.stepContainer}>
          {/* STEP 1: Vision */}
          {step === 0 && (
            <div className={styles.stepContent} key="step-0">
              <h1 className={styles.stepTitle}>
                Let&apos;s start with your website vision
              </h1>
              <p className={styles.stepSubtitle}>
                We&apos;ll use these details to pre-configure your environment and
                suggest templates.
              </p>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>The Core Concept</label>
                <p className={styles.formHint}>
                  Describe your website idea. What is it, who is it for, and what
                  should it do?
                </p>
                <textarea
                  className="textarea-field"
                  placeholder="e.g. A portfolio site for a freelance photographer that also lets clients book sessions and pay online..."
                  value={answers.projectDescription}
                  onChange={(e) =>
                    setAnswers({ ...answers, projectDescription: e.target.value })
                  }
                  rows={5}
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Website Type</label>
                  <select
                    className="select-field"
                    value={answers.websiteType}
                    onChange={(e) =>
                      setAnswers({ ...answers, websiteType: e.target.value })
                    }
                  >
                    <option value="">Select type...</option>
                    <option value="Portfolio">Portfolio</option>
                    <option value="E-commerce">E-commerce</option>
                    <option value="SaaS">SaaS</option>
                    <option value="Blog">Blog</option>
                    <option value="Business/Agency">Business/Agency</option>
                    <option value="Booking/Service">Booking/Service</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Your Skill Level</label>
                  <select
                    className="select-field"
                    value={answers.skillLevel}
                    onChange={(e) =>
                      setAnswers({ ...answers, skillLevel: e.target.value })
                    }
                  >
                    <option value="">Select level...</option>
                    <option value="Beginner">
                      Beginner (little to no experience)
                    </option>
                    <option value="Intermediate">
                      Intermediate (built a few sites)
                    </option>
                    <option value="Advanced">
                      Advanced (comfortable with code)
                    </option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Stack */}
          {step === 1 && (
            <div className={styles.stepContent} key="step-1">
              <h1 className={styles.stepTitle}>How do you want to build it?</h1>
              <p className={styles.stepSubtitle}>
                Select your preferred tools — or tell us what you&apos;re considering
              </p>

              <div className={styles.formGroup}>
                <div className={styles.toolCategoryHeader}>
                  <span className={styles.toolCategoryIcon}>🎨</span>
                  <label className={styles.formLabel}>Design Tools</label>
                </div>
                <div className={styles.pillGrid}>
                  {DESIGN_TOOLS.map((tool) => (
                    <button
                      key={tool}
                      className={`pill ${answers.designTools.includes(tool) ? "active" : ""}`}
                      onClick={() => toggleArrayItem("designTools", tool)}
                    >
                      {answers.designTools.includes(tool) && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                      {tool}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.formGroup}>
                <div className={styles.toolCategoryHeader}>
                  <span className={styles.toolCategoryIcon}>💻</span>
                  <label className={styles.formLabel}>Build/Dev Tools</label>
                </div>
                <div className={styles.pillGrid}>
                  {BUILD_TOOLS.map((tool) => (
                    <button
                      key={tool}
                      className={`pill ${answers.buildTools.includes(tool) ? "active" : ""}`}
                      onClick={() => toggleArrayItem("buildTools", tool)}
                    >
                      {answers.buildTools.includes(tool) && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                      {tool}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.formGroup}>
                <div className={styles.toolCategoryHeader}>
                  <span className={styles.toolCategoryIcon}>☁️</span>
                  <label className={styles.formLabel}>Hosting/Deployment</label>
                </div>
                <div className={styles.pillGrid}>
                  {HOSTING_TOOLS.map((tool) => (
                    <button
                      key={tool}
                      className={`pill ${answers.hostingTools.includes(tool) ? "active" : ""}`}
                      onClick={() => toggleArrayItem("hostingTools", tool)}
                    >
                      {answers.hostingTools.includes(tool) && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                      {tool}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  Anything else in your stack?
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g. TailwindCSS, Prisma, PostgreSQL..."
                  value={answers.otherStack}
                  onChange={(e) =>
                    setAnswers({ ...answers, otherStack: e.target.value })
                  }
                />
              </div>
            </div>
          )}

          {/* STEP 3: Features */}
          {step === 2 && (
            <div className={styles.stepContent} key="step-2">
              <h1 className={styles.stepTitle}>
                What does your website need to do?
              </h1>
              <p className={styles.stepSubtitle}>
                Select everything that applies — we&apos;ll build your workflow
                around these features to ensure a seamless technical setup.
              </p>

              <div className={styles.featureGrid}>
                {FEATURE_OPTIONS.map((feature) => (
                  <button
                    key={feature.id}
                    className={`${styles.featureCard} ${answers.features.includes(feature.id) ? styles.featureCardActive : ""}`}
                    onClick={() => toggleArrayItem("features", feature.id)}
                  >
                    <div className={styles.featureCardCheck}>
                      {answers.features.includes(feature.id) ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                      ) : null}
                    </div>
                    <span className={styles.featureCardIcon}>{feature.icon}</span>
                    <span className={styles.featureCardLabel}>{feature.label}</span>
                    <span className={styles.featureCardDesc}>{feature.desc}</span>
                  </button>
                ))}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  Any other features you need?
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g. Email newsletters, CMS, multi-language..."
                  value={answers.otherFeatures}
                  onChange={(e) =>
                    setAnswers({ ...answers, otherFeatures: e.target.value })
                  }
                />
              </div>
            </div>
          )}

          {/* STEP 4: Timeline */}
          {step === 3 && (
            <div className={styles.stepContent} key="step-3">
              <h1 className={styles.stepTitle}>
                What&apos;s your timeline and situation?
              </h1>
              <p className={styles.stepSubtitle}>
                Understanding your constraints helps us generate realistic phase
                estimates.
              </p>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>How soon do you need this live?</label>
                <select
                  className="select-field"
                  value={answers.timeline}
                  onChange={(e) =>
                    setAnswers({ ...answers, timeline: e.target.value })
                  }
                >
                  <option value="">Select timeline...</option>
                  <option value="ASAP">ASAP (under 2 weeks)</option>
                  <option value="1 month">1 month</option>
                  <option value="2-3 months">2–3 months</option>
                  <option value="No deadline">No hard deadline</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  Are you building this alone or with a team?
                </label>
                <select
                  className="select-field"
                  value={answers.teamSize}
                  onChange={(e) =>
                    setAnswers({ ...answers, teamSize: e.target.value })
                  }
                >
                  <option value="">Select team size...</option>
                  <option value="Solo">Solo</option>
                  <option value="Small team">Small team (2–3)</option>
                  <option value="Agency">Agency/larger team</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  What&apos;s your budget for tools and services?
                </label>
                <select
                  className="select-field"
                  value={answers.budget}
                  onChange={(e) =>
                    setAnswers({ ...answers, budget: e.target.value })
                  }
                >
                  <option value="">Select budget...</option>
                  <option value="Free only">Free only</option>
                  <option value="Under $50/mo">Under $50/mo</option>
                  <option value="$50-$200/mo">$50–$200/mo</option>
                  <option value="$200+/mo">$200+/mo</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Project Context</label>
                <div className={styles.toggleRow}>
                  <span className={styles.toggleLabel}>
                    {answers.projectType === "Client" ? "Client Project" : "Personal Project"}
                  </span>
                  <button
                    className={`toggle-switch ${answers.projectType === "Client" ? "active" : ""}`}
                    onClick={() =>
                      setAnswers({
                        ...answers,
                        projectType:
                          answers.projectType === "Client" ? "Personal" : "Client",
                      })
                    }
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Preferences */}
          {step === 4 && (
            <div className={styles.stepContent} key="step-4">
              <h1 className={styles.stepTitle}>
                Last few things to dial in your workflow
              </h1>
              <p className={styles.stepSubtitle}>
                Finalize your engine specifications. These choices will shape the
                underlying architecture of your generated environment.
              </p>

              <div className={styles.toggleGroup}>
                <div className="toggle-container">
                  <div>
                    <p className={styles.toggleTitle}>Stripe Integration</p>
                    <p className={styles.toggleDesc}>
                      Payment processing, subscriptions, and billing
                    </p>
                  </div>
                  <button
                    className={`toggle-switch ${answers.stripeIntegration === "Yes" ? "active" : ""}`}
                    onClick={() =>
                      setAnswers({
                        ...answers,
                        stripeIntegration:
                          answers.stripeIntegration === "Yes" ? "No" : "Yes",
                      })
                    }
                  />
                </div>

                <div className="toggle-container">
                  <div>
                    <p className={styles.toggleTitle}>Backend Functionality</p>
                    <p className={styles.toggleDesc}>
                      Database, authentication, and server-side APIs
                    </p>
                  </div>
                  <button
                    className={`toggle-switch ${answers.backendNeeded === "Yes" ? "active" : ""}`}
                    onClick={() =>
                      setAnswers({
                        ...answers,
                        backendNeeded:
                          answers.backendNeeded === "Yes" ? "No" : "Yes",
                      })
                    }
                  />
                </div>

                <div className="toggle-container">
                  <div>
                    <p className={styles.toggleTitle}>AI-Assisted Coding</p>
                    <p className={styles.toggleDesc}>
                      Smart suggestions and automation in your workflow
                    </p>
                  </div>
                  <button
                    className={`toggle-switch ${answers.aiAssisted === "Yes" ? "active" : ""}`}
                    onClick={() =>
                      setAnswers({
                        ...answers,
                        aiAssisted: answers.aiAssisted === "Yes" ? "No" : "Yes",
                      })
                    }
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Additional Notes</label>
                <textarea
                  className="textarea-field"
                  placeholder="Anything else we should factor in? Special requirements, constraints, or preferences?"
                  value={answers.additionalNotes}
                  onChange={(e) =>
                    setAnswers({ ...answers, additionalNotes: e.target.value })
                  }
                  rows={4}
                />
              </div>
            </div>
          )}

          {/* Error Banner */}
          {errorMsg && (
            <div className={styles.errorBanner}>
              <span>⚠️</span>
              <div>
                <p className={styles.errorText}>{errorMsg}</p>
                <button className={styles.errorDismiss} onClick={() => setErrorMsg("")}>Dismiss</button>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className={styles.stepNav}>
            {step > 0 && (
              <button className="btn-ghost" onClick={() => setStep(step - 1)}>
                ← Back
              </button>
            )}
            <div className={styles.stepNavSpacer} />
            {step < 4 ? (
              <button
                className="btn-primary"
                onClick={() => setStep(step + 1)}
                disabled={!canProceed()}
                style={{ opacity: canProceed() ? 1 : 0.5 }}
              >
                Continue
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            ) : (
              <button
                className={`btn-primary ${styles.generateBtn}`}
                onClick={handleGenerate}
              >
                Generate My Workflow
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

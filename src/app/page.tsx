import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import styles from "./page.module.css";

const TOOLS = [
  "Figma",
  "Google Stitch",
  "Webflow",
  "Framer",
  "VS Code",
  "Cursor",
  "Stripe",
  "Supabase",
  "Firebase",
  "Vercel",
  "GitHub",
  "Netlify",
];

const FEATURES = [
  {
    icon: "⚡",
    title: "Personalized Workflows",
    description:
      "Tailor your pipeline to match your exact tech stack. From React to Rust, we automate the boring bits so you can focus on code.",
  },
  {
    icon: "📁",
    title: "Downloadable Skill Files",
    description:
      "Export your entire build as clean Markdown and structured JSON. Pure, unopinionated files ready for any environment.",
  },
  {
    icon: "🔗",
    title: "End-to-End Coverage",
    description:
      "From the first wireframe to final production deploy. We maintain consistency across every asset and every stage.",
  },
];

export default function LandingPage() {
  return (
    <>
      <Navbar />

      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroGlow} />
          <div className={styles.heroContent}>
            <div className={styles.heroBadge}>
              <span className={styles.heroBadgeDot} />
              Now in Public Beta
            </div>
            <h1 className={styles.heroTitle}>
              Your Entire Website Build.{" "}
              <span className="gradient-text">One Intelligent Workflow.</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Automate the heavy lifting from wireframe to deployment. LaunchPad
              orchestrates your favorite tools into a seamless, high-performance
              engine.
            </p>
            <div className={styles.heroCtas}>
              <Link href="/onboarding" className={`btn-primary ${styles.heroBtn}`}>
                Start Building
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
              </Link>
              <a href="#how-it-works" className="btn-secondary">
                See How It Works
              </a>
            </div>
            <div className={styles.trustBadges}>
              <span>⚡ Personalized to your stack</span>
              <span className={styles.trustDivider}>·</span>
              <span>📁 Downloadable markdown files</span>
              <span className={styles.trustDivider}>·</span>
              <span>🔧 From design to Stripe integration</span>
            </div>
          </div>
        </section>

        {/* Tool Marquee */}
        <section className={styles.marqueeSection}>
          <div className={styles.marqueeTrack}>
            <div className={styles.marqueeContent}>
              {[...TOOLS, ...TOOLS].map((tool, i) => (
                <span key={i} className={styles.marqueePill}>
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="how-it-works" className={styles.featuresSection}>
          <div className="container">
            <div className={styles.featureHeader}>
              <h2 className={styles.featureSectionTitle}>
                Built For How You Actually Work
              </h2>
              <p className={styles.featureSectionSubtitle}>
                Stop fighting your tools. LaunchPad connects every stage of your
                development cycle into a unified, high-performance delivery
                machine.
              </p>
            </div>
            <div className={styles.featureGrid}>
              {FEATURES.map((feature, i) => (
                <div key={i} className={styles.featureCard}>
                  <span className={styles.featureIcon}>{feature.icon}</span>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <p className={styles.featureDescription}>
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaGlow} />
          <div className="container text-center">
            <h2 className={styles.ctaTitle}>
              Ready to launch your next project?
            </h2>
            <p className={styles.ctaSubtitle}>
              Join 1,000+ developers engineering the future of the web with
              LaunchPad.
            </p>
            <Link href="/onboarding" className={`btn-primary ${styles.ctaBtn}`}>
              Build My Workflow
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
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

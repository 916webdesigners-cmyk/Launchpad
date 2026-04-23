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
    title: "Skip The Boilerplate",
    description:
      "Connect your favorite stack. We automate the foundational code so you can focus on building unique features and creative experiences.",
  },
  {
    icon: "🎨",
    title: "Total Creative Control",
    description:
      "Unlike rigid site builders, you own the code. Get pure, unopinionated files ready for any environment and fully customizable. Build exactly what you envision.",
  },
  {
    icon: "🏗️",
    title: "System-Level Infrastructure",
    description:
      "Pre-configured for scale. Go beyond a simple starter pack with auth, billing, and team-ready architectures available from day one.",
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
              Skip the setup.{" "}
              <span className="gradient-text">Build what actually matters.</span>
            </h1>
            <p className={styles.heroSubtitle}>
              A repeatable infrastructure system for technical founders, agencies, and builders. Don't let rigid site builders box in your creativity. Own your code, push to production in days, and get to revenue faster.
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
              <span>🚀 Go from idea to MVP in days</span>
              <span className={styles.trustDivider}>·</span>
              <span>🎨 Total creative ownership</span>
              <span className={styles.trustDivider}>·</span>
              <span>💳 Revenue-focused integrations</span>
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
                Built For Builders, Not Website Creators
              </h2>
              <p className={styles.featureSectionSubtitle}>
                Stop fighting tools that limit what you can build. LaunchPad gives you the speed of a site builder combined with the absolute freedom of custom code. 
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

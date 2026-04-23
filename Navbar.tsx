"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const pathname = usePathname();
  const { currentUser, logout, loading } = useAuth();
  const isLanding = pathname === "/";

  return (
    <nav className={styles.navbar}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          <svg
            className={styles.logoIcon}
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M13 2L4.09 12.62a1 1 0 00.77 1.63H11v5.5a.5.5 0 00.9.3L20.91 9.38a1 1 0 00-.77-1.63H13V2.25a.5.5 0 00-.9-.3L13 2z"
              fill="url(#bolt-gradient)"
            />
            <defs>
              <linearGradient id="bolt-gradient" x1="4" y1="2" x2="20" y2="22">
                <stop stopColor="#7c3aed" />
                <stop offset="1" stopColor="#d2bbff" />
              </linearGradient>
            </defs>
          </svg>
          <span className={styles.logoText}>LaunchPad</span>
        </Link>

        {isLanding && (
          <div className={styles.navLinks}>
            <a href="#how-it-works" className="btn-ghost">
              How It Works
            </a>
            {!loading && !currentUser && (
              <Link href="/login" className="btn-ghost">
                Log In
              </Link>
            )}
            {!loading && currentUser && (
              <Link href="/workflows" className="btn-ghost">
                Workflows
              </Link>
            )}
            <Link href="/onboarding" className="btn-primary">
              Build My Workflow
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        )}

        {!isLanding && (
          <div className={styles.navLinks}>
            {!loading && currentUser && (
              <>
                <Link href="/workflows" className="btn-ghost">
                  Workflows
                </Link>
                <button onClick={logout} className="btn-ghost">
                  Log Out
                </button>
              </>
            )}
            {!loading && !currentUser && pathname !== "/login" && (
              <Link href="/login" className="btn-ghost">
                Log In
              </Link>
            )}
            {pathname !== "/" && (
              <Link href="/" className="btn-ghost">
                ← Back to Home
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

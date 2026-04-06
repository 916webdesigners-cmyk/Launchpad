import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.copyright}>
          © {new Date().getFullYear()} LaunchPad. Engineered in the Void.
        </p>
        <div className={styles.links}>
          <a href="#" className={styles.link}>Privacy</a>
          <a href="#" className={styles.link}>Terms</a>
          <a href="#" className={styles.link}>Docs</a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={styles.link}>
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}

import styles from "../styles/base.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">
        Powered by{" "}
        <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
      </a>
    </footer>
  );
}

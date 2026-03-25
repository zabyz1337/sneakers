import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.text}>React Sneakers © 2026</p>
      </div>
    </footer>
  );
}

export default Footer;

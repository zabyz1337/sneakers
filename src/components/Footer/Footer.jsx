import facebookIcon from "../../assets/facebook_f.svg";
import twitterIcon from "../../assets/twitter.svg";
import instagramIcon from "../../assets/instagram.svg";
import styles from "./Footer.module.css";

const socialLinks = [
  { href: "https://facebook.com", icon: facebookIcon, label: "Facebook" },
  { href: "https://twitter.com", icon: twitterIcon, label: "Twitter" },
  { href: "https://instagram.com", icon: instagramIcon, label: "Instagram" },
];

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.info}>
          <h3 className={styles.title}>Контакты</h3>
          <p className={styles.text}>8 800 000 00 00</p>
          <p className={styles.text}>email@example.com</p>
          <p className={styles.copy}>2026 Сникер-магазин. Все права защищены</p>
        </div>

        <div className={styles.actions}>
          <div className={styles.socials}>
            {socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className={styles.socialLink}
                aria-label={item.label}
              >
                <img src={item.icon} alt={item.label} className={styles.icon} />
              </a>
            ))}
          </div>

          <input
            type="email"
            placeholder="Введите свой email"
            className={styles.input}
          />
        </div>
      </div>
    </footer>
  );
}

export default Footer;

import facebookIcon from "../../assets/facebook.svg";
import xIcon from "../../assets/x.svg";
import snapchatIcon from "../../assets/snapchat.svg";
import styles from "./Contacts.module.css";

const socialIcons = [
  { icon: snapchatIcon, label: "Snapchat", href: "https://snapchat.com" },
  { icon: facebookIcon, label: "Facebook", href: "https://facebook.com" },
  { icon: xIcon, label: "X", href: "https://x.com" },
];

function Contacts() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Контакты</h1>
        <div className={styles.line} />

        <div className={styles.grid}>
          <section className={styles.infoBlock}>
            <ul className={styles.contactList}>
              <li>8 800 000 00 00</li>
              <li>email@example.com</li>
            </ul>

            <form className={styles.form}>
              <div className={styles.row}>
                <input type="email" placeholder="Ваш email" className={styles.input} />
                <input type="text" placeholder="Ваше имя" className={styles.input} />
              </div>
              <textarea placeholder="Введите сообщение" className={styles.textarea} />
              <button type="submit" className={styles.button}>
                Отправить
              </button>
            </form>
          </section>

          <aside className={styles.socialCard}>
            <h2 className={styles.socialTitle}>Найдите нас:</h2>
            <div className={styles.socials}>
              {socialIcons.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.socialLink}
                  aria-label={item.label}
                >
                  <img src={item.icon} alt={item.label} className={styles.socialIcon} />
                </a>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default Contacts;

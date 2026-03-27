import banner from "../../assets/Banner.png";
import styles from "./News.module.css";

function News() {
  return (
    <section className={styles.news}>
      <div className={styles.content}>
        <div className={styles.textBlock}>
          <span className={styles.badge}>Новая коллекция</span>
          <h1 className={styles.title}>Сникеры для города, зала и бега</h1>
          <p className={styles.subtitle}>
            Выбери пару на каждый день и добавь её в корзину одним кликом.
          </p>
        </div>

        <div className={styles.imageWrapper}>
          <img src={banner} alt="Сникеры" className={styles.image} />
        </div>
      </div>
    </section>
  );
}

export default News;

import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.logo}>👟</div>
          <div>
            <h2 className={styles.title}>REACT SNEAKERS</h2>
            <p className={styles.text}>Магазин лучших кроссовок</p>
          </div>
        </div>

        <nav className={styles.nav}>
          <NavLink to="/" className={styles.link}>
            Главная
          </NavLink>
          <NavLink to="/cart" className={styles.link}>
            Корзина
          </NavLink>
          <NavLink to="/contacts" className={styles.link}>
            Контакты
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;

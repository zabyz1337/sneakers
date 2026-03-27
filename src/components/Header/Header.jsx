import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";

function Header() {
  const getLinkClassName = ({ isActive }) =>
    `${styles.link} ${isActive ? styles.active : ""}`.trim();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <NavLink to="/" className={styles.brand}>
          Сникер • магазин
        </NavLink>

        <nav className={styles.nav}>
          <NavLink to="/" className={getLinkClassName} end>
            Главная
          </NavLink>
          <NavLink to="/cart" className={getLinkClassName}>
            Корзина
          </NavLink>
          <NavLink to="/contacts" className={getLinkClassName}>
            Контакты
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;

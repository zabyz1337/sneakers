import { useContext } from "react";
import News from "../News/News";
import ProductCard from "../ProductCard/ProductCard";
import ProductsContext from "../../context";
import styles from "./Main.module.css";

const newsItems = [
  {
    id: 1,
    title: "Бесплатная доставка",
    text: "При заказе от 200 € доставим покупку бесплатно по Германии.",
  },
  {
    id: 2,
    title: "Новые модели каждую неделю",
    text: "Пополняем каталог свежими коллекциями Nike, Adidas и New Balance.",
  },
  {
    id: 3,
    title: "Возврат без проблем",
    text: "Если размер не подошёл, можно вернуть товар в течение 14 дней.",
  },
];

function Main() {
  const { products, cartData, addToCart, loadingProducts, pendingIds } = useContext(ProductsContext);

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <News />

        <section className={styles.newsSection}>
          {newsItems.map((item) => (
            <article key={item.id} className={styles.newsCard}>
              <h2 className={styles.newsTitle}>{item.title}</h2>
              <p className={styles.newsText}>{item.text}</p>
            </article>
          ))}
        </section>

        <section className={styles.productsSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Популярные товары</h2>
            <p className={styles.sectionSubtitle}>Выбери пару и добавь в корзину.</p>
          </div>

          {loadingProducts ? (
            <p className={styles.message}>Загрузка товаров...</p>
          ) : (
            <div className={styles.grid}>
              {products.map((item) => {
                const productId = String(item.id);
                const isInCart = cartData.some(
                  (cartItem) => String(cartItem.productId || cartItem.id) === productId,
                );
                const isPending = pendingIds.includes(productId);

                return (
                  <ProductCard
                    key={item.id}
                    item={item}
                    addToCart={addToCart}
                    isInCart={isInCart}
                    isPending={isPending}
                  />
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default Main;

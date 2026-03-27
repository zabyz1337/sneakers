import basketIcon from "../../assets/basket.svg";
import { useContext } from "react";
import ProductsContext from "../../context";
import { formatPrice } from "../../utils/formatPrice";
import styles from "./Cart.module.css";

function Cart() {
  const {
    cartData,
    deleteFromCart,
    clearCart,
    totalPrice,
    loadingCart,
    apiStatus,
  } = useContext(ProductsContext);

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Корзина</h1>
          </div>

          {cartData.length > 0 && (
            <button
              type="button"
              className={styles.clearButton}
              onClick={clearCart}
            >
              Очистить корзину
            </button>
          )}
        </div>

        {loadingCart ? (
          <p className={styles.message}>Загрузка корзины...</p>
        ) : cartData.length === 0 ? (
          <div className={styles.empty}>
            <h2 className={styles.emptyTitle}>Корзина пока пустая</h2>
            <p className={styles.emptyText}>
              Добавь товары на главной странице, и они появятся здесь.
            </p>
          </div>
        ) : (
          <div className={styles.layout}>
            <section className={styles.list}>
              {cartData.map((item) => (
                <article key={item.id} className={styles.card}>
                  <div className={styles.productInfo}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className={styles.image}
                    />
                    <div>
                      <h2 className={styles.cardTitle}>{item.name}</h2>
                      <p className={styles.cardPrice}>
                        {formatPrice(item.price)}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    className={styles.removeButton}
                    onClick={() => deleteFromCart(item.id)}
                    aria-label={`Удалить ${item.name}`}
                  >
                    <img src={basketIcon} alt="delete" />
                  </button>
                </article>
              ))}
            </section>

            <aside className={styles.summary}>
              <h2 className={styles.summaryTitle}>Итого</h2>
              <div className={styles.summaryList}>
                {cartData.map((item) => (
                  <div key={item.id} className={styles.summaryRow}>
                    <span>{item.name}</span>
                    <strong>{formatPrice(item.price)}</strong>
                  </div>
                ))}
              </div>
              <div className={styles.summaryTotal}>
                <span>Сумма</span>
                <strong>{formatPrice(totalPrice)}</strong>
              </div>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}

export default Cart;

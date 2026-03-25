import styles from "./ProductCard.module.css";

function ProductCard({ item, addToCart }) {
  return (
    <div className={styles.card}>
      <img src={item.image} alt={item.name} className={styles.image} />
      <h3 className={styles.name}>{item.name}</h3>
      <div className={styles.bottom}>
        <div>
          <p className={styles.priceLabel}>Цена:</p>
          <p className={styles.price}>{item.price} руб.</p>
        </div>
        <button className={styles.button} onClick={() => addToCart(item)}>
          +
        </button>
      </div>
    </div>
  );
}

export default ProductCard;

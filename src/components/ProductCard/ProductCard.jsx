import { formatPrice } from "../../utils/formatPrice";
import styles from "./ProductCard.module.css";

function ProductCard({ item, addToCart, isInCart, isPending }) {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrap}>
        <img src={item.image} alt={item.name} className={styles.image} />
      </div>

      <h3 className={styles.name}>{item.name}</h3>

      <div className={styles.bottom}>
        <div>
          <p className={styles.priceLabel}>цена</p>
          <p className={styles.price}>{formatPrice(item.price)}</p>
        </div>

        <button
          type="button"
          className={styles.addButton}
          onClick={() => addToCart(item)}
          disabled={isPending}
        >
          {isPending ? "..." : isInCart ? "✓" : "+"}
        </button>
      </div>
    </article>
  );
}

export default ProductCard;

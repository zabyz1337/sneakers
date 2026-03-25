import { useContext } from "react";
import ProductsContext from "../../context";
import ProductCard from "../ProductCard/ProductCard";
import styles from "./Main.module.css";

function Main() {
  const { products, addToCart } = useContext(ProductsContext);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.top}>
          <h1 className={styles.title}>Все кроссовки</h1>
        </div>

        <div className={styles.grid}>
          {products.map((item) => (
            <ProductCard key={item.id} item={item} addToCart={addToCart} />
          ))}
        </div>
      </div>
    </main>
  );
}

export default Main;

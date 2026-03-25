import { useEffect, useState } from "react";
import ProductsContext from "../index";
import axios from "axios";

const BASE_URL = "https://69c39e45b780a9ba03e75a2d.mockapi.io";

function ProductProvider({ children }) {
  const [cartData, setCartData] = useState([]);
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/productsData`);
      setProducts(response.data);
    } catch (error) {
      console.log("Ошибка при получении товаров:", error);
    }
  };

  const fetchCartData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/cartData`);
      setCartData(response.data);
    } catch (error) {
      console.log("Ошибка при получении корзины:", error);
    }
  };

  const addToCart = async (product) => {
    try {
      const response = await axios.post(`${BASE_URL}/cartData`, product);
      setCartData((prev) => [...prev, response.data]);
    } catch (error) {
      console.log("Ошибка при добавлении в корзину:", error);
    }
  };

  const deleteFromCart = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/cartData/${id}`);
      setCartData((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.log("Ошибка при удалении из корзины:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCartData();
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        products,
        cartData,
        addToCart,
        deleteFromCart,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export default ProductProvider;

import { useEffect, useMemo, useState } from "react";
import ProductsContext from "../index";
import {
  cartEndpoints,
  fallbackProducts,
  normalizeProduct,
  productEndpoints,
  tryDelete,
  tryGet,
  tryPost,
} from "../../api/mockApi";

const LOCAL_CART_KEY = "sneaker-store-cart";

function readLocalCart() {
  try {
    const savedCart = localStorage.getItem(LOCAL_CART_KEY);
    if (!savedCart) {
      return [];
    }

    const parsedCart = JSON.parse(savedCart);
    return Array.isArray(parsedCart) ? parsedCart : [];
  } catch (error) {
    return [];
  }
}

function saveLocalCart(cartItems) {
  try {
    localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(cartItems));
  } catch (error) {
    console.error("Не удалось сохранить корзину в localStorage", error);
  }
}

function ProductProvider({ children }) {
  const [cartData, setCartData] = useState([]);
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingCart, setLoadingCart] = useState(true);
  const [pendingIds, setPendingIds] = useState([]);
  const [apiStatus, setApiStatus] = useState({ products: "idle", cart: "idle" });

  useEffect(() => {
    fetchProducts();
    fetchCartData();
  }, []);

  useEffect(() => {
    saveLocalCart(cartData);
  }, [cartData]);

  const fetchProducts = async () => {
    setLoadingProducts(true);

    try {
      const response = await tryGet(productEndpoints);
      const normalizedProducts = Array.isArray(response.data)
        ? response.data.map(normalizeProduct).filter((item) => item.id)
        : [];

      setProducts(normalizedProducts);
      setApiStatus((prev) => ({ ...prev, products: "connected" }));
    } catch (error) {
      setProducts(fallbackProducts.map(normalizeProduct));
      setApiStatus((prev) => ({ ...prev, products: "fallback" }));
    } finally {
      setLoadingProducts(false);
    }
  };

  const fetchCartData = async () => {
    setLoadingCart(true);

    try {
      const response = await tryGet(cartEndpoints);
      const normalizedCart = Array.isArray(response.data)
        ? response.data.map((item) => ({
            ...normalizeProduct(item),
            id: String(item.id),
            productId: String(item.productId || item.id),
          }))
        : [];

      setCartData(normalizedCart);
      setApiStatus((prev) => ({ ...prev, cart: "connected" }));
    } catch (error) {
      setCartData(readLocalCart());
      setApiStatus((prev) => ({ ...prev, cart: "fallback" }));
    } finally {
      setLoadingCart(false);
    }
  };

  const addPendingId = (productId) => {
    setPendingIds((prev) => [...new Set([...prev, String(productId)])]);
  };

  const removePendingId = (productId) => {
    setPendingIds((prev) => prev.filter((id) => id !== String(productId)));
  };

  const addToCart = async (product) => {
    const normalizedProduct = normalizeProduct(product);

    const existingItem = cartData.find(
      (item) => String(item.productId || item.id) === String(normalizedProduct.id),
    );

    if (existingItem) {
      return;
    }

    addPendingId(normalizedProduct.id);

    const tempItem = {
      id: `temp-${Date.now()}`,
      productId: normalizedProduct.id,
      image: normalizedProduct.image,
      name: normalizedProduct.name,
      price: normalizedProduct.price,
    };

    setCartData((prev) => [...prev, tempItem]);

    const payload = {
      productId: normalizedProduct.id,
      image: normalizedProduct.image,
      name: normalizedProduct.name,
      price: normalizedProduct.price,
    };

    try {
      const response = await tryPost(cartEndpoints, payload);
      const savedItem = {
        ...normalizeProduct(response.data),
        id: String(response.data.id),
        productId: String(response.data.productId || normalizedProduct.id),
      };

      setCartData((prev) =>
        prev.map((item) => (item.id === tempItem.id ? savedItem : item)),
      );
      setApiStatus((prev) => ({ ...prev, cart: "connected" }));
    } catch (error) {
      setCartData((prev) =>
        prev.map((item) =>
          item.id === tempItem.id
            ? { ...tempItem, id: `local-${Date.now()}` }
            : item,
        ),
      );
      setApiStatus((prev) => ({ ...prev, cart: "fallback" }));
    } finally {
      removePendingId(normalizedProduct.id);
    }
  };

  const deleteFromCart = async (id) => {
    const currentItem = cartData.find((item) => item.id === id);

    if (!currentItem) {
      return;
    }

    setCartData((prev) => prev.filter((item) => item.id !== id));
    addPendingId(currentItem.productId || currentItem.id);

    if (String(id).startsWith("local-") || String(id).startsWith("temp-")) {
      removePendingId(currentItem.productId || currentItem.id);
      return;
    }

    try {
      await tryDelete(cartEndpoints, id);
      setApiStatus((prev) => ({ ...prev, cart: "connected" }));
    } catch (error) {
      setCartData((prev) => [...prev, currentItem]);
      setApiStatus((prev) => ({ ...prev, cart: "fallback" }));
    } finally {
      removePendingId(currentItem.productId || currentItem.id);
    }
  };

  const clearCart = async () => {
    const currentCart = [...cartData];

    if (currentCart.length === 0) {
      return;
    }

    setCartData([]);

    const deletableItems = currentCart.filter(
      (item) =>
        !String(item.id).startsWith("local-") && !String(item.id).startsWith("temp-"),
    );

    if (deletableItems.length === 0) {
      setApiStatus((prev) => ({ ...prev, cart: "fallback" }));
      return;
    }

    const results = await Promise.allSettled(
      deletableItems.map((item) => tryDelete(cartEndpoints, item.id)),
    );

    const hasRejected = results.some((result) => result.status === "rejected");

    if (hasRejected) {
      setCartData(currentCart);
      setApiStatus((prev) => ({ ...prev, cart: "fallback" }));
      return;
    }

    setApiStatus((prev) => ({ ...prev, cart: "connected" }));
  };

  const totalPrice = useMemo(
    () => cartData.reduce((sum, item) => sum + Number(item.price || 0), 0),
    [cartData],
  );

  return (
    <ProductsContext.Provider
      value={{
        products,
        cartData,
        addToCart,
        deleteFromCart,
        clearCart,
        totalPrice,
        loadingProducts,
        loadingCart,
        apiStatus,
        pendingIds,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export default ProductProvider;

import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";
import axios from "axios";


export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const url = "http://localhost:4000";

  // Cart state
  const [cartItems, setCartItems] = useState({});

  // Authentication state
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");

  // Add item to cart với số lượng tùy chọn, sync backend
const addToCart = async (itemId, quantity = 1) => {
  // Cập nhật UI ngay
  setCartItems(prev => ({
    ...prev,
    [itemId]: prev[itemId] ? prev[itemId] + quantity : quantity
  }));

  // Gửi số lượng muốn tăng lên backend
  if (!token) return;

  try {
    const res = await axios.post(
      `${url}/api/cart/add`,
      { itemId, quantity }, // ← quantity đúng số lượng muốn thêm
      { headers: { token } }
    );

    if (res.data.success) {
      console.log("Saved to backend:", res.data.cartData);
      // Không overwrite state nếu UI đã đúng
    } else {
      console.log("Backend failed:", res.data);
    }
  } catch (err) {
    console.log("Add to cart error:", err);
  }
};

  // Remove item from cart
  const removeFromCart = (itemId) => {
    if (cartItems[itemId] > 1) {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    } else {
      const newCart = { ...cartItems };
      delete newCart[itemId];
      setCartItems(newCart);
    }
  };

  // Get total cart items
  const getTotalCartAmount = () => {
    let total = 0;
    for (const key in cartItems) {
      total += cartItems[key];
    }
    return total;
  };

  // Persist login info in localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
    }
  }, []);

  useEffect(() => {
    if (user && token) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  }, [user, token]);

  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    setCartItems,
    getTotalCartAmount,
    food_list,
    user,
    setUser,
    token,
    setToken,
    url,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;

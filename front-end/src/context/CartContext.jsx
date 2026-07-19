import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user, token } = useAuth();
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('desi_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Keep a ref of token and user to use in the functions
  const tokenRef = useRef(token);
  const userRef = useRef(user);

  useEffect(() => {
    tokenRef.current = token;
    userRef.current = user;
  }, [token, user]);

  // Synchronize cart from DB ONLY on user login/logout to prevent recursive update loops
  useEffect(() => {
    if (user && user.cart) {
      fetch('/api/products')
        .then(res => {
          if (!res.ok) throw new Error("Failed to fetch products");
          return res.json();
        })
        .then(allProducts => {
          const syncedCart = user.cart.map(dbItem => {
            const product = allProducts.find(p => p.id === dbItem.id);
            if (product) {
              return { ...product, quantity: dbItem.quantity };
            }
            return null;
          }).filter(Boolean);
          setCartItems(syncedCart);
        })
        .catch(err => {
          console.error("Cart sync from DB failed:", err);
        });
    } else if (!user) {
      // Restore guest cart from local storage
      const saved = localStorage.getItem('desi_cart');
      setCartItems(saved ? JSON.parse(saved) : []);
    }
  }, [user]);

  // Direct sync function to DB
  const syncCartToDb = (cart) => {
    const activeToken = tokenRef.current;
    const activeUser = userRef.current;
    if (activeToken && activeUser) {
      const cartPayload = cart.map(item => ({ id: item.id, quantity: item.quantity }));
      fetch('/api/users/cart', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${activeToken}`
        },
        body: JSON.stringify({ cart: cartPayload })
      }).catch(err => console.error("Cart sync to DB failed:", err));
    }
  };

  const addToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      let newCart;
      if (existing) {
        newCart = prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        newCart = [...prev, { ...product, quantity }];
      }
      
      // Save locally
      localStorage.setItem('desi_cart', JSON.stringify(newCart));
      
      // Sync to backend DB if logged in
      syncCartToDb(newCart);
      
      return newCart;
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => {
      const newCart = prev.filter(item => item.id !== productId);
      localStorage.setItem('desi_cart', JSON.stringify(newCart));
      syncCartToDb(newCart);
      return newCart;
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prev => {
      const newCart = prev.map(item => 
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
      localStorage.setItem('desi_cart', JSON.stringify(newCart));
      syncCartToDb(newCart);
      return newCart;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.setItem('desi_cart', JSON.stringify([]));
    syncCartToDb([]);
  };

  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartTotal,
      cartCount
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

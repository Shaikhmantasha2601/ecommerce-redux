import { createSlice } from '@reduxjs/toolkit';

const readSavedCart = () => {
  try {
    const saved = localStorage.getItem('luma-cart');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: readSavedCart() },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existing = state.items.find((item) => item.id === product.id);
      if (existing) existing.quantity += 1;
      else state.items.push({ ...product, quantity: 1 });
      try { localStorage.setItem('luma-cart', JSON.stringify(state.items)); } catch {}
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      try { localStorage.setItem('luma-cart', JSON.stringify(state.items)); } catch {}
    },
    increaseQuantity: (state, action) => {
      const item = state.items.find((entry) => entry.id === action.payload);
      if (item) item.quantity += 1;
      try { localStorage.setItem('luma-cart', JSON.stringify(state.items)); } catch {}
    },
    decreaseQuantity: (state, action) => {
      const item = state.items.find((entry) => entry.id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
      try { localStorage.setItem('luma-cart', JSON.stringify(state.items)); } catch {}
    },
    clearCart: (state) => {
      state.items = [];
      try { localStorage.removeItem('luma-cart'); } catch {}
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions;
export const selectCartItems = (state) => state.cart.items;
export const selectCartCount = (state) => state.cart.items.reduce((total, item) => total + item.quantity, 0);
export const selectCartSubtotal = (state) => state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
export default cartSlice.reducer;
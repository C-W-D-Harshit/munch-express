import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item._id === newItem._id);

      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.items.push(newItem);
      }

      state.totalQuantity += newItem.quantity;
      state.totalPrice += newItem.price * newItem.quantity;
    },
    incrementQuantity: (state, action) => {
      const itemId = action.payload;
      const item = state.items.find((item) => item._id === itemId);

      if (item) {
        item.quantity += 1;
        state.totalQuantity += 1;
        state.totalPrice += item.price;
      }
    },
    decrementQuantity: (state, action) => {
      const itemId = action.payload;
      const item = state.items.find((item) => item._id === itemId);

      if (item) {
        item.quantity -= 1;
        state.totalQuantity -= 1;
        state.totalPrice -= item.price;

        if (item.quantity === 0) {
          state.items = state.items.filter((item) => item._id !== itemId);
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
    setCartItems: (state, action) => {
      state.items = action.payload;
    },
    updateCartItem: (state, action) => {
      const { _id, cartCount } = action.payload;
      const item = state.items.find((item) => item._id === _id);

      if (item) {
        item.cartCount = cartCount;
      }
    },
  },
});

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
  setCartItems,
  updateCartItem,
} = cartSlice.actions;

export default cartSlice.reducer;

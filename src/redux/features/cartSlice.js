import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

function calculateTotalPrice(items) {
  return items.reduce(
    (total, item) => total + (item.finalPrice ? item.finalPrice : item.price),
    0
  );
}

function calculateTotalQuantity(items) {
  return items.reduce((total, item) => total + item.quantity, 0);
}

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
      state.totalPrice += newItem.finalPrice
        ? newItem.finalPrice
        : newItem.price * newItem.quantity;
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    incrementQuantity: (state, action) => {
      const itemId = action.payload;
      const item = state.items.find((item) => item._id === itemId);

      if (item) {
        item.quantity += 1;
        state.totalQuantity += 1;
        state.totalPrice += item.finalPrice ? item.finalPrice : item.price;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.items));
      return state; // Return the updated state or the original state if item is not found
    },
    decrementQuantity: (state, action) => {
      const itemId = action.payload;
      const item = state.items.find((item) => item._id === itemId);

      if (item) {
        item.quantity -= 1;

        state.totalQuantity -= 1;
        state.totalPrice -= item.finalPrice ? item.finalPrice : item.price;

        if (item.quantity === 0) {
          state.items = state.items.filter((item) => item._id !== itemId);
        }
      }
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    setCartItems: (state, action) => {
      state.items = action.payload;
      if (state.items) {
        state.totalPrice = calculateTotalPrice(state.items);
        state.totalQuantity = calculateTotalQuantity(state.items);
      }

      // Save the cart items to local storage
      localStorage.setItem("cartItems", JSON.stringify(state.items));
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

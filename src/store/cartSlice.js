import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const item = {
        id: action.payload.id,
        title: action.payload.title,
        description: action.payload.description,
        price: action.payload.price,
        thumbnail: action.payload.thumbnail,
        discountPercentage:action.payload.discountPercentage,
        quantity: 1, 
      };
      state.push(item);
    },
    removeFromCart: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    updateCartItemQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const itemToUpdate = state.find((item) => item.id === id);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
      }
    },
  },
});

export const { addToCart, removeFromCart, updateCartItemQuantity } = cartSlice.actions;
export default cartSlice;

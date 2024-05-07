import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState:[],
  reducers: {
    addToWishlist: (state, action) => {
      const item = {
        id: action.payload.id,
        title: action.payload.title,
        description: action.payload.description,
        price: action.payload.price,
        thumbnail: action.payload.thumbnail,
        discountPercentage: action.payload.discountPercentage,
      };
      state.push(item);
    },
    removeFromWishlist: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});
export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice;

import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import wishlistReducer from "./wishlistSlice";
const store = configureStore({
  reducer: {
    cart: cartReducer.reducer,
    wishlist:wishlistReducer.reducer
  }
});


export default store;
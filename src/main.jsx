import ReactDOM from "react-dom/client";
import "./index.css";
import {
  RouterProvider,
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./Layout";
import Home from "./components/Home/Home";
import Cart from "./components/Cart/Cart";
import Contact from "./components/Contact/Contact";
import Product from "./components/Product/Product";
import Wishlistt from "./components/Wishlistt/Wishlistt.jsx";
import { Provider } from "react-redux";

// import { store } from "./app/store.js";
import store from "./store/store.js";



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="cart" element={<Cart />} />
      <Route path="contact" element={<Contact />} />
      <Route path="wishlist" element={<Wishlistt/>} />
      <Route path="product/:productid" element={<Product />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>

);

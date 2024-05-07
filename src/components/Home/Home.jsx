import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { addToCart } from "../../store/cartSlice.js";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  const addItemToCart = (product) => {
    dispatch(addToCart(product));
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold text-center text-black my-8">
        Products
      </h1>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg overflow-hidden shadow-md transition duration-500 ease-in-out transform hover:scale-105"
          >
            <img
              className="w-full h-64 object-cover"
              src={product.thumbnail}
              alt={product.title}
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800">
                {product.title}
              </h2>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="flex justify-between items-center">
                <p className="text-gray-700 font-bold line-through">
                  ${product.price}
                </p>
                <p className="text-gray-700 font-bold">
                  $
                  {(
                    product.price -
                    (product.discountPercentage / 100) * product.price
                  ).toFixed(1)}
                </p>
                <div className="flex">
                  <button
                    type="button"
                    className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 focus:outline-none mr-2 ml-1"
                    onClick={() => addItemToCart(product)}
                  >
                    Add to Cart
                  </button>
                  <Link to={`/product/${product.id}`}>
                    <button
                      type="button"
                      className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 focus:outline-none mr-2"
                      onClick={() => addItemToCart(product)}
                    >
                      Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductPage;

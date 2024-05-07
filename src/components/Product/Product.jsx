import { Link, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice.js";
import { addToWishlist } from "../../store/wishlistSlice.js";

function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

function Product() {
  const { productid } = useParams();
  const [product, setProduct] = useState({});
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const dispatch = useDispatch();

  const addItemHandler = (
    id,
    title,
    description,
    price,
    thumbnail,
    discountPercentage
  ) => {
    dispatch(
      addToCart({
        id,
        title,
        description,
        price,
        thumbnail,
        discountPercentage,
      })
    );
  };
  const wishlistHandler = (
    id,
    title,
    description,
    price,
    thumbnail,
    discountPercentage
  ) => {
    dispatch(
      addToWishlist({
        id,
        title,
        description,
        price,
        thumbnail,
        discountPercentage,
      })
    );
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://dummyjson.com/products/${productid}`
        );
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [productid]);

  useInterval(() => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  }, 3000);

  const handlePrevClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <>
      <div className="sp mx-auto max-w-7xl px-2 py-10 lg:px-0">
        <div className="overflow-hidden">
          <div className="mb-9 pt-4 md:px-6 md:pt-7 lg:mb-2 lg:p-8 2xl:p-10 2xl:pt-10">
            <div className="items-start justify-between lg:flex lg:space-x-8">
              <div className="mb-6 items-center justify-center overflow-hidden md:mb-8 lg:mb-0 xl:flex">
                <div className="w-full xl:flex xl:flex-row-reverse">
                  <div className="relative mb-2.5 w-full shrink-0 overflow-hidden rounded-md border md:mb-3 xl:w-[350px] md:w-[350px] 2xl:w-[450px]">
                    <div className="relative flex items-center justify-center">
                      {product.images && product.images.length > 0 && (
                        <>
                          <img
                            alt="Product gallery"
                            src={product.images[currentImageIndex]}
                            width={350}
                            height={350}
                            className="rounded-lg object-cover md:h-[250px] md:w-full lg:h-full"
                          />
                          <div className="absolute top-2/4 z-10 flex w-full items-center justify-between">
                            <button
                              onClick={handlePrevClick}
                              className="text-black focus:outline-none"
                            >
                              <ChevronLeft />
                            </button>
                            <button
                              onClick={handleNextClick}
                              className="text-black focus:outline-none"
                            >
                              <ChevronRight />
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex shrink-0 flex-col lg:w-[430px] xl:w-[470px] 2xl:w-[480px]">
                <div className="pb-5">
                  <Link to="/" className="text-blue-500 hover:underline">
                    Back to Home
                  </Link>
                  <h2 className="text-lg font-semibold md:text-xl xl:text-2xl">
                    {product.title}
                  </h2>
                  <p className="mt-4 text-gray-600">{product.description}</p>
                  <p className="mt-4 text-gray-600">Rating: {product.rating}</p>
                  <p className="mt-4 text-gray-600">Stock: {product.stock}</p>
                  <p className="mt-4 font-semibold line-through">
                    MRP: ${product.price}
                  </p>
                  <p className="mt-4 font-semibold">
                    Sale Price:$
                    {(
                      product.price -
                      (product.discountPercentage / 100) * product.price
                    ).toFixed(2)}
                  </p>
                </div>
                <div className="pb-2"></div>
                <div className="pb-2"></div>
                <div className="space-y-2.5">
                  <button
                    className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    onClick={() =>
                      addItemHandler(
                        product.id,
                        product.title,
                        product.description,
                        product.price,
                        product.thumbnail,
                        product.discountPercentage
                      )
                    }
                  >
                    Add To Cart
                  </button>
                  <button className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
                    Buy Now
                  </button>
                  <button
                    className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    onClick={() =>
                      wishlistHandler(
                        product.id,
                        product.title,
                        product.description,
                        product.price,
                        product.thumbnail,
                        product.discountPercentage
                      )
                    }
                  >
                    Add to Favorites
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;

import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../../store/wishlistSlice";
import { addToCart } from "../../store/cartSlice";

function Wishlistt() {
  const items = useSelector((state) => state.wishlist) || [];
  const dispatch = useDispatch();

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    dispatch(removeFromWishlist(item.id));
  };

  return (
    <div className="max-w-xl mx-auto mt-8">
      <div className="text-3xl underline font-serif text-center mb-4">
        Wishlist
      </div>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {items.length === 0 ? (
          <p className="text-center text-gray-600">Your wishlist is empty</p>
        ) : (
          <ul>
            {items.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between border-b border-gray-300 py-4"
              >
                <div className="flex items-center">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="h-16 w-16 mr-4"
                  />
                  <div>
                    <p className="text-lg font-medium">{item.title}</p>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <p className="text-lg font-medium mr-4 line-through">
                    ${item.price}
                  </p>

                  <p className="text-lg font-medium mr-4">
                    $
                    {(
                      item.price -
                      (item.discountPercentage / 100) * item.price
                    ).toFixed(2)}
                  </p>
                  <button
                    type="button"
                    className="text-red-500 hover:text-red-700 focus:outline-none mr-4"
                    onClick={() => dispatch(removeFromWishlist(item.id))}
                  >
                    Remove
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="bg-black text-white py-2 px-4 rounded focus:outline-none"
                    onClick={() => handleAddToCart(item)}
                  >
                    Add to Cart
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex justify-end"></div>
    </div>
  );
}

export default Wishlistt;

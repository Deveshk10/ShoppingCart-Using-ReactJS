import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateCartItemQuantity } from "../../store/cartSlice";

function Cart() {
  const items = useSelector((state) => state.cart) || [];
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState({});

  const handleQuantityChange = (id, change) => {
    const updatedQuantity = { ...quantity };
    updatedQuantity[id] = (updatedQuantity[id] || 1) + change;
    setQuantity(updatedQuantity);
    dispatch(updateCartItemQuantity({ id, quantity: updatedQuantity[id] }));
  };

  const calculateTotalPrice = () => {
    let totalMRP = 0;
    items.forEach((item) => {
      const itemQuantity = quantity[item.id] || 1;
      totalMRP +=
        (item.price - (item.discountPercentage / 100) * item.price).toFixed(2) *
        itemQuantity;
    });
    return totalMRP;
  };

  return (
    <div className="max-w-xl mx-auto mt-8">
      <div className="text-3xl underline font-serif text-center mb-4">
        Shopping Cart
      </div>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {items.length === 0 ? (
          <p className="text-center text-gray-600">Your cart is empty</p>
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
                  <div className="flex items-center mr-4">
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(item.id, -1)}
                      disabled={(quantity[item.id] || 1) === 1}
                      className="bg-gray-200 text-gray-600 py-1 px-2 rounded-l focus:outline-none hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="px-2">{quantity[item.id] || 1}</span>
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(item.id, 1)}
                      className="bg-gray-200 text-gray-600 py-1 px-2 rounded-r focus:outline-none hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-lg font-medium mr-4">
                    $
                    {(
                      (
                        item.price -
                        (item.discountPercentage / 100) * item.price
                      ).toFixed(2) * (quantity[item.id] || 1)
                    ).toFixed(2)}
                  </p>

                  <button
                    type="button"
                    className="text-red-500 hover:text-red-700 focus:outline-none"
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <p className="text-end text-lg font-medium mr-4">
          Total: ${calculateTotalPrice().toFixed(2)}
        </p>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 focus:outline-none"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;

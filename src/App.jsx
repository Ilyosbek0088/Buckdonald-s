import { useState } from "react";
import Card from "./components/Card/card";
import Products from "./data/mockData";
import { FaHamburger, FaShoppingCart } from "react-icons/fa";


function App() {
  const [cart, setCart] = useState({});

  // Function to handle adding items
  const addToCart = (item) => {
    setCart((prevCart) => ({
      ...prevCart,
      [item.name]: prevCart[item.name]
        ? { ...prevCart[item.name], quantity: prevCart[item.name].quantity + 1 }
        : { ...item, quantity: 1 },
    }));
  };

  // Function to decrease quantity
  const removeFromCart = (item) => {
    setCart((prevCart) => {
      if (!prevCart[item.name]) return prevCart;

      const updatedCart = { ...prevCart };
      if (updatedCart[item.name].quantity > 1) {
        updatedCart[item.name].quantity -= 1;
      } else {
        delete updatedCart[item.name]; // Remove item if quantity is 0
      }

      return updatedCart;
    });
  };

  // Calculate total price
  const totalPrice = Object.values(cart)
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div className="max-w-5xl mx-auto p-6 pb-24">
      {/* Title */}
      <div className="flex items-center justify-center space-x-2 text-4xl font-bold text-red-500 mb-6">
        <FaHamburger />
        <span>Fast Foods</span>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Products.map((item, index) => (
          <Card
            key={index}
            {...item}
            quantity={cart[item.name]?.quantity || 0}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
          />
        ))}
      </div>

      {/* Footer Section */}
      <div className="fixed bottom-0 left-0 w-full backdrop-blur-lg bg-[#0000001b] border shadow-md p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">Total Price: ${totalPrice}</h2>
        <button className="bg-green-500 text-white px-6 py-2 rounded-lg flex items-center">
          <FaShoppingCart className="mr-2" /> View Order
        </button>
      </div>
    </div>
  );
}

export default App;

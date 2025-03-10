import { useState } from "react";
import { FaPlus, FaMinus, FaShoppingCart } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Card = ({ name, price, image, quantity, addToCart, removeFromCart }) => {
  const [expanded, setExpanded] = useState(false);

  // Handle Add button click
  const handleAddClick = () => {
    addToCart({ name, price });
    setExpanded(true);
  };

  // Auto-collapse if quantity becomes 0
  if (quantity === 0 && expanded) {
    setTimeout(() => setExpanded(false), 300);
  }

  return (
    <div className="bg-white shadow-lg rounded-xl p-5 flex flex-col items-center h-64 relative transition-all hover:shadow-2xl">
      {/* Quantity badge */}
      {quantity > 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full shadow-md"
        >
          {quantity}
        </motion.div>
      )}

      {/* Food Image */}
      <img src={image} alt={name} className="w-24 h-24 object-cover rounded-lg" />

      {/* Food Name & Price */}
      <h2 className="text-lg font-semibold mt-3">{name}</h2>
      <p className="text-xl font-bold text-black mt-1">${price}</p>

      {/* Spacer to align buttons at bottom */}
      <div className="flex-grow"></div>

      {/* Animated Buttons */}
      <motion.div
        initial={{ width: "100%" }}
        animate={{ width: expanded ? "130px" : "100%" }}
        transition={{ duration: 0.3 }}
        className="flex justify-center items-center p-2"
      >
        <AnimatePresence mode="wait">
          {expanded ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="flex items-center space-x-3"
            >
              {/* Decrease Quantity */}
              <motion.button
                whileTap={{ scale: 0.85 }}
                whileHover={{ scale: 1.1 }}
                className="bg-red-500 text-white p-3 rounded-full shadow-md"
                onClick={() => removeFromCart({ name })}
              >
                <FaMinus />
              </motion.button>

              {/* Increase Quantity */}
              <motion.button
                whileTap={{ scale: 0.85 }}
                whileHover={{ scale: 1.1 }}
                className="bg-yellow-500 text-black p-3 rounded-full shadow-md"
                onClick={() => addToCart({ name, price })}
              >
                <FaPlus />
              </motion.button>
            </motion.div>
          ) : (
            <motion.button
              key="add"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              className="mt-auto bg-yellow-500 text-black px-6 py-3 rounded-full flex items-center w-full justify-center shadow-md"
              onClick={handleAddClick}
            >
              <FaShoppingCart className="mr-2" /> Add
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Card;

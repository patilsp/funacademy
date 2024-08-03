import { motion } from "framer-motion";

const Star = ({ x, y, onClick }) => {
  return (
    <motion.div
      className="size-10 rounded-full bg-yellow-400"
      style={{ position: "absolute", top: y, left: x }}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.8 }}
      onClick={onClick}
    />
  );
};

export default Star;

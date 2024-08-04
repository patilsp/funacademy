// components/Animal.js
import { motion } from 'framer-motion';

const animalVariants = {
  hover: { scale: 1.2, rotate: 10 },
  tap: { scale: 0.8 }
};

const Animal = ({ color, name, onClick }) => (
  <motion.div
    className={`animal ${color}`}
    whileHover="hover"
    whileTap="tap"
    variants={animalVariants}
    onClick={() => onClick(name)}
  >
    <img src={`/images/github.png`} alt={name} />
  </motion.div>
);

export default Animal;

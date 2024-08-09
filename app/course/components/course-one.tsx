import { motion } from 'framer-motion';
import Image from 'next/image';

const CourseOne = () => {
  return (
    <div className="min-h-screen p-4">
      <h1 className="mb-6 text-center text-4xl font-bold">Welcome to Fun Learning!</h1>
      
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <motion.div
          className="rounded-lg bg-blue-200 p-4 shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Image src="/images/alphabet.jpg" alt="Alphabet" width={500} height={300} className="w-full rounded-lg"/>
          <h2 className="mt-2 text-2xl font-semibold">Alphabet Adventure</h2>
          <p>Learn the alphabet with interactive games and fun characters!</p>
        </motion.div>

        <motion.div
          className="rounded-lg bg-green-200 p-4 shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Image src="/images/numbers.jpg" alt="Numbers" width={500} height={300} className="w-full rounded-lg"/>
          <h2 className="mt-2 text-2xl font-semibold">Number Fun</h2>
          <p>Explore numbers with engaging activities and games.</p>
        </motion.div>

        {/* Add more course blocks as needed */}
      </div>
    </div>
  );
};

export default CourseOne;

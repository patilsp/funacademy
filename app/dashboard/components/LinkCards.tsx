import { motion } from 'framer-motion';
import Link from 'next/link';

const cardData = [
  {
    id: 1,
    title: 'Math Games',
    description: 'Fun and interactive math games for kids.',
    href: '/letter',
    bgColor: 'bg-blue-100',
  },
  {
    id: 2,
    title: 'Science Experiments',
    description: 'Engaging science experiments and activities.',
    href: '/science-experiments',
    bgColor: 'bg-green-100',
  },
  {
    id: 3,
    title: 'Reading Corner',
    description: 'Stories and reading activities for children.',
    href: '/reading-corner',
    bgColor: 'bg-yellow-100',
  },
  {
    id: 4,
    title: 'Art & Crafts',
    description: 'Creative art and craft projects for kids.',
    href: '/art-crafts',
    bgColor: 'bg-pink-100',
  },
  {
    id: 5,
    title: 'Letters',
    description: 'Creative art and craft projects for kids.',
    href: '/letter',
    bgColor: 'bg-green-100',
  },
];

export default function LinkCards() {
  return (
    <div className="w-full p-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-4">
        {cardData.map((card) => (
          <motion.div
            key={card.id}
            className={`relative size-full overflow-hidden rounded-lg shadow-lg ${card.bgColor} p-6 transition-transform hover:scale-105`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link href={card.href} passHref>
              <div className="block">
                <h2 className="mb-2 text-xl font-semibold text-gray-800">{card.title}</h2>
                <p className="text-gray-600">{card.description}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

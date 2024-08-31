"use client";
import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";

export function StoryCard() {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(
    null
  );
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0  grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[500px]  h-full md:h-fit md:max-h-[90%]  flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <Image
                  priority
                  width={200}
                  height={200}
                  src={active.src}
                  alt={active.title}
                  className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                />
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-bold text-neutral-700 dark:text-neutral-200"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400"
                    >
                      {active.description}
                    </motion.p>
                  </div>

                  <motion.a
                    layoutId={`button-${active.title}-${id}`}
                    href={active.ctaLink}
                    target="_blank"
                    className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white"
                  >
                    {active.ctaText}
                  </motion.a>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="max-w-2xl mx-auto w-full gap-4">
        {cards.map((card, index) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={`card-${card.title}-${id}`}
            onClick={() => setActive(card)}
            className="p-4 flex flex-col md:flex-row justify-between items-center hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
          >
            <div className="flex gap-4 flex-col md:flex-row ">
              <motion.div layoutId={`image-${card.title}-${id}`}>
                <Image
                  width={100}
                  height={100}
                  src={card.src}
                  alt={card.title}
                  className="h-40 w-40 md:h-14 md:w-14 rounded-lg object-cover object-top"
                />
              </motion.div>
              <div className="">
                <motion.h3
                  layoutId={`title-${card.title}-${id}`}
                  className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left"
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${card.description}-${id}`}
                  className="text-neutral-600 dark:text-neutral-400 text-center md:text-left"
                >
                  {card.description}
                </motion.p>
              </div>
            </div>
            <motion.button
              layoutId={`button-${card.title}-${id}`}
              className="px-4 py-2 text-sm rounded-full font-bold bg-gray-100 hover:bg-green-500 hover:text-white text-black mt-4 md:mt-0"
            >
              {card.ctaText}
            </motion.button>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

const cards = [
  {
    description: "The Banyan Tree",
    title: "The Heart of the Village",
    src: "https://assets.aceternity.com/demos/toh-phir-aao.jpeg",
    ctaText: "Learn More",
    ctaLink: "https://example.com/banyan-tree-story",
    content: () => {
      return (
        <p>
          In many Indian villages, the banyan tree stands tall and proud in the center, providing shade and a place for villagers to gather. <br /> <br /> Under its wide canopy, children play, elders discuss important matters, and festivals are celebrated. The banyan tree is more than just a tree; it is a symbol of unity and community, bringing together people from all walks of life.
        </p>
      );
    },
  },
  {
    description: "The Village Well",
    title: "Water, the Gift of Life",
    src: "https://assets.aceternity.com/demos/toh-phir-aao.jpeg",
    ctaText: "Learn More",
    ctaLink: "https://example.com/village-well-story",
    content: () => {
      return (
        <p>
          The village well is a lifeline for the villagers, providing fresh water for drinking, cooking, and bathing. <br /> <br /> Every morning, women and children gather at the well, filling their pots and chatting about their day. The well is not just a source of water but a place of social interaction, where news is shared, and bonds are strengthened.
        </p>
      );
    },
  },
  {
    description: "The Village Fair",
    title: "A Day of Joy and Celebration",
    src: "https://example.com/images/village-fair.jpg",
    ctaText: "Learn More",
    ctaLink: "https://example.com/village-fair-story",
    content: () => {
      return (
        <p>
          Once a year, the village fair brings excitement and joy to everyone. Stalls selling sweets, toys, and clothes line the village square. <br /> <br /> Children enjoy rides on the merry-go-round, while elders listen to folk music and watch traditional dances. The fair is a time of celebration, where everyone comes together to enjoy the vibrant atmosphere.
        </p>
      );
    },
  },
  {
    description: "The Bullock Cart",
    title: "The Traditional Mode of Transport",
    src: "https://example.com/images/bullock-cart.jpg",
    ctaText: "Learn More",
    ctaLink: "https://example.com/bullock-cart-story",
    content: () => {
      return (
        <p>
          In the village, the bullock cart is a common sight, used for transporting goods and people. <br /> <br /> The gentle clinking of the bells around the bullocks' necks and the creaking of the wooden wheels create a soothing rhythm as the cart moves slowly along the dusty roads. The bullock cart is a symbol of the simple and hardworking life in the village.
        </p>
      );
    },
  },
  {
    description: "The Village School",
    title: "Learning Under the Mango Tree",
    src: "https://example.com/images/village-school.jpg",
    ctaText: "Learn More",
    ctaLink: "https://example.com/village-school-story",
    content: () => {
      return (
        <p>
          The village school is a small building, often with just one or two classrooms. Sometimes, classes are held under the shade of a big mango tree. <br /> <br /> Children from the village gather here to learn basic reading, writing, and arithmetic. The school is not just a place for education but also a space where children dream of a brighter future.
        </p>
      );
    },
  },
  {
    description: "The Harvest Festival",
    title: "Pongal: A Celebration of Abundance",
    src: "https://example.com/images/pongal.jpg",
    ctaText: "Learn More",
    ctaLink: "https://example.com/pongal-story",
    content: () => {
      return (
        <p>
          Pongal is a harvest festival celebrated with great enthusiasm in Indian villages. Farmers thank the sun, the earth, and the cattle for a bountiful harvest. <br /> <br /> Families prepare sweet rice, decorate their homes with rangoli, and enjoy traditional games. Pongal is a time to give thanks for nature’s blessings and to celebrate the hard work of the farmers.
        </p>
      );
    },
  },
  {
    description: "The Village Market",
    title: "A Hub of Activity",
    src: "https://example.com/images/village-market.jpg",
    ctaText: "Learn More",
    ctaLink: "https://example.com/village-market-story",
    content: () => {
      return (
        <p>
          The village market is held once a week and is the busiest place in the village. Farmers bring fresh vegetables, fruits, and grains to sell. <br /> <br /> People from neighboring villages also come to buy and sell goods. The market is filled with the sounds of bargaining, laughter, and the clinking of coins, making it a lively and vibrant place.
        </p>
      );
    },
  },
  {
    description: "The Festival of Lights",
    title: "Diwali in the Village",
    src: "https://example.com/images/diwali.jpg",
    ctaText: "Learn More",
    ctaLink: "https://example.com/diwali-story",
    content: () => {
      return (
        <p>
          Diwali, the festival of lights, is celebrated with great joy in the village. Homes are decorated with oil lamps and colorful rangolis, and sweets are shared with neighbors. <br /> <br /> The night sky is lit up with fireworks, and the sound of laughter fills the air. Diwali is a time to celebrate the victory of light over darkness and to strengthen bonds within the community.
        </p>
      );
    },
  },
  {
    description: "The Village Elder",
    title: "Wisdom and Respect",
    src: "https://example.com/images/village-elder.jpg",
    ctaText: "Learn More",
    ctaLink: "https://example.com/village-elder-story",
    content: () => {
      return (
        <p>
          The village elder is a respected figure who has lived in the village all his life. He is known for his wisdom and fair judgment. <br /> <br /> Villagers come to him for advice and to resolve disputes. His stories of the past, often told to children under the banyan tree, teach valuable lessons about life, respect, and community.
        </p>
      );
    },
  },
  {
    description: "The Monsoon Season",
    title: "Rain, a Blessing for the Fields",
    src: "https://example.com/images/monsoon.jpg",
    ctaText: "Learn More",
    ctaLink: "https://example.com/monsoon-story",
    content: () => {
      return (
        <p>
          The monsoon season is eagerly awaited in the village, as it brings much-needed rain for the crops. <br /> <br /> Children play in the puddles, and farmers rejoice as their fields turn green with new life. The monsoon is a reminder of the close connection between the village and nature, where every drop of rain is considered a blessing.
        </p>
      );
    },
  },
  {
    description: "The Village Potter",
    title: "Shaping Clay, Shaping Lives",
    src: "https://example.com/images/village-potter.jpg",
    ctaText: "Learn More",
    ctaLink: "https://example.com/village-potter-story",
    content: () => {
      return (
        <p>
          The village potter is an artist who shapes clay into beautiful pots, lamps, and toys. <br /> <br /> With skillful hands, the potter creates items that are used daily in the village, from storing water to cooking food. The potter’s wheel spins continuously, symbolizing the cycle of life in the village, where every creation has a purpose.
        </p>
      );
    },
  },
  {
    description: "The Rice Fields",
    title: "Green Fields, Golden Harvest",
    src: "https://example.com/images/rice-fields.jpg",
    ctaText: "Learn More",
    ctaLink: "https://example.com/rice-fields-story",
    content: () => {
      return (
        <p>
          The rice fields are the heart of many Indian villages, where farmers work hard to grow the staple food of the country. <br /> <br /> During the planting season, the fields are lush and green, and as the rice ripens, they turn golden. The sight of villagers working together in the fields is a symbol of cooperation and dedication.
        </p>
      );
    },
  },
  {
    description: "The Village Temple",
    title: "A Place of Faith and Worship",
    src: "https://example.com/images/village-temple.jpg",
    ctaText: "Learn More",
    ctaLink: "https://example.com/village-temple-story",
    content: () => {
      return (
        <p>
          The village temple is a sacred place where villagers gather to pray and seek blessings. <br /> <br /> Every morning, the sound of bells and chants fills the air as people offer flowers and incense to the deities. The temple is not just a place of worship, but also a center of cultural activities and festivals, bringing the community together.
        </p>
      );
    },
  },
  {
    description: "The Village Blacksmith",
    title: "Forging Tools, Forging the Future",
    src: "https://example.com/images/village-blacksmith.jpg",
    ctaText: "Learn More",
    ctaLink: "https://example.com/village-blacksmith-story",
    content: () => {
      return (
        <p>
          The village blacksmith is a skilled craftsman who shapes metal into tools, knives, and farming equipment. <br /> <br /> The sound of hammering on the anvil can be heard throughout the day, as the blacksmith works tirelessly to create essential items for the villagers. His work is crucial for the village's agricultural activities, making him a respected figure in the community.
        </p>
      );
    },
  },
  {
    description: "The Village Postman",
    title: "Bringing Letters, Bringing Smiles",
    src: "https://example.com/images/village-postman.jpg",
    ctaText: "Learn More",
    ctaLink: "https://example.com/village-postman-story",
    content: () => {
      return (
        <p>
          The village postman is a familiar face who brings news from afar, delivering letters and parcels to every home. <br /> <br /> Riding his bicycle along the dusty paths, the postman carries not just mail, but also the hopes and dreams of the villagers. His arrival is eagerly awaited, especially by those who have family members living in distant cities.
        </p>
      );
    },
  },
  {
    description: "The Village Carpenter",
    title: "Building Homes, Building Dreams",
    src: "https://example.com/images/village-carpenter.jpg",
    ctaText: "Learn More",
    ctaLink: "https://example.com/village-carpenter-story",
    content: () => {
      return (
        <p>
          The village carpenter is a master of woodcraft, creating everything from furniture to doors and windows. <br /> <br /> Using simple tools, he transforms raw wood into beautiful and functional pieces that are used in every home. The carpenter’s work is a blend of skill and creativity, contributing to the comfort and beauty of village life.
        </p>
      );
    },
  },
  {
    description: "The Village Festival",
    title: "Celebrating Culture and Traditions",
    src: "https://example.com/images/village-festival.jpg",
    ctaText: "Learn More",
    ctaLink: "https://example.com/village-festival-story",
    content: () => {
      return (
        <p>
          Festivals in the village are a time of joy and celebration, where age-old traditions come alive. <br /> <br /> Whether it’s Holi, Diwali, or Baisakhi, the entire village comes together to celebrate with music, dance, and feasting. These festivals are a reflection of the rich cultural heritage of the village, passed down through generations.
        </p>
      );
    },
  },
  {
    description: "The Village Granary",
    title: "Storing the Harvest",
    src: "https://example.com/images/village-granary.jpg",
    ctaText: "Learn More",
    ctaLink: "https://example.com/village-granary-story",
    content: () => {
      return (
        <p>
          The village granary is where the harvested grains are stored, ensuring that there is food for everyone throughout the year. <br /> <br /> After the harvest, villagers gather to fill the granary with rice, wheat, and other crops. The granary is a symbol of abundance and security, representing the fruits of the villagers’ hard work and the importance of careful planning for the future.
        </p>
      );
    },
  },
  {
    description: "The Village Weaver",
    title: "Spinning Threads, Weaving Stories",
    src: "https://example.com/images/village-weaver.jpg",
    ctaText: "Learn More",
    ctaLink: "https://example.com/village-weaver-story",
    content: () => {
      return (
        <p>
          The village weaver is an artist who creates beautiful fabrics using a handloom. <br /> <br /> Each piece of cloth tells a story, woven with threads of different colors and patterns. The weaver’s work is highly valued, as it provides clothing for the villagers and plays an important role in preserving traditional craftsmanship.
        </p>
      );
    },
  },
  {
    description: "The Village Folk Dance",
    title: "Dancing to the Rhythm of Life",
    src: "https://example.com/images/village-folk-dance.jpg",
    ctaText: "Learn More",
    ctaLink: "https://example.com/village-folk-dance-story",
    content: () => {
      return (
        <p>
          Folk dances in the village are a vibrant expression of culture and community spirit. <br /> <br /> During festivals and special occasions, men and women come together to perform traditional dances, accompanied by folk songs and drums. These dances are more than just entertainment; they are a way of connecting with the roots and celebrating the village’s heritage.
        </p>
      );
    },
  },
];

"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from 'next/link';
import { ArrowLeft , ArrowRight} from 'lucide-react';

const animals = [
  {
    name: "Lion",
    description: "The king of the jungle, known for its majestic mane.",
    src: "/images/animals/tiger.jpg",
  },
  {
    name: "Elephant",
    description: "The largest land animal, known for its trunk and tusks.",
    src: "/images/animals/elephant.jpg",
  },
  {
    name: "Zebra",
    description: "The tallest animal, known for its long neck and legs.",
    src: "/images/animals/zebra.jpg",
  },
  // Add more animals as needed
];

export default function AnimalPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleBack = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : animals.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < animals.length - 1 ? prevIndex + 1 : 0));
  };

  const currentAnimal = animals[currentIndex];

  return (
    <div className="mx-auto max-w-2xl p-4">
       <div className="mb-4 flex w-full items-center justify-between gap-2">
        <Link href="/category" className="flex gap-2"> 
          <ArrowLeft className="size-8 rounded-full border bg-slate-100 p-2 hover:shadow"/> 
          <h1 className="mt-1 text-xl font-bold text-orange-500">Animals</h1>
        </Link>
      </div>


      <div>
        {/* <div id="header"><h1>Emoji Animal Kingdom</h1></div> */}
       
          <div id="kingdom">
            <div id='🐵' className='mammal' title='Monkey'><div className="icon">🐵</div><div className="description">Monkey</div></div>
            <div id='🐒' className='mammal' title='Monkey'><div className="icon">🐒</div><div className="description">Monkey</div></div>
            <div id='🦍' className='mammal' title='Gorilla'><div className="icon">🦍</div><div className="description">Gorilla</div></div>
            <div id='🦧️' className='mammal' title='Orangutan'><div className="icon">🦧️</div><div className="description">Orangutan</div></div>
            <div id='🐶' className='mammal' title='Dog'><div className="icon">🐶</div><div className="description">Dog</div></div>
            <div id='🐕' className='mammal' title='Dog'><div className="icon">🐕</div><div className="description">Dog</div></div>
            <div id='🐩' className='mammal' title='Poodle'><div className="icon">🐩</div><div className="description">Poodle</div></div>
            <div id='🐺' className='mammal' title='Wolf'><div className="icon">🐺</div><div className="description">Wolf</div></div>
            <div id='🦊' className='mammal' title='Fox'><div className="icon">🦊</div><div className="description">Fox</div></div>
            <div id='🦝' className='mammal' title='Raccoon'><div className="icon">🦝</div><div className="description">Raccoon</div></div>
            <div id='🐱' className='mammal' title='Cat'><div className="icon">🐱</div><div className="description">Cat</div></div>
            <div id='🐈' className='mammal' title='Cat'><div className="icon">🐈</div><div className="description">Cat</div></div>
            <div id='🦁' className='mammal' title='Lion'><div className="icon">🦁</div><div className="description">Lion</div></div>
            <div id='🐯' className='mammal' title='Tiger'><div className="icon">🐯</div><div className="description">Tiger</div></div>
            <div id='🐅' className='mammal' title='Tiger'><div className="icon">🐅</div><div className="description">Tiger</div></div>
            <div id='🐆' className='mammal' title='Leopard'><div className="icon">🐆</div><div className="description">Leopard</div></div>
            <div id='🐴' className='mammal' title='Horse'><div className="icon">🐴</div><div className="description">Horse</div></div>
            <div id='🐎' className='mammal' title='Horse'><div className="icon">🐎</div><div className="description">Horse</div></div>
            <div id='🦄' className='mammal' title='Unicorn'><div className="icon">🦄</div><div className="description">Unicorn</div></div>
            <div id='🦓' className='mammal' title='Zebra'><div className="icon">🦓</div><div className="description">Zebra</div></div>
            <div id='🦌' className='mammal' title='Deer'><div className="icon">🦌</div><div className="description">Deer</div></div>
            <div id='🐮' className='mammal' title='Cow'><div className="icon">🐮</div><div className="description">Cow</div></div>
            <div id='🐂' className='mammal' title='Ox'><div className="icon">🐂</div><div className="description">Ox</div></div>
            <div id='🐃' className='mammal' title='Water Buffalo'><div className="icon">🐃</div><div className="description">Water Buffalo</div></div>
            <div id='🐄' className='mammal' title='Cow'><div className="icon">🐄</div><div className="description">Cow</div></div>
            <div id='🐷' className='mammal' title='Pig'><div className="icon">🐷</div><div className="description">Pig</div></div>
            <div id='🐖' className='mammal' title='Pig'><div className="icon">🐖</div><div className="description">Pig</div></div>
            <div id='🐗' className='mammal' title='Boar'><div className="icon">🐗</div><div className="description">Boar</div></div>
            <div id='🐏' className='mammal' title='Ram'><div className="icon">🐏</div><div className="description">Ram</div></div>
            <div id='🐑' className='mammal' title='Ewe'><div className="icon">🐑</div><div className="description">Ewe</div></div>
            <div id='🐐' className='mammal' title='Goat'><div className="icon">🐐</div><div className="description">Goat</div></div>
            <div id='🐪' className='mammal' title='Camel'><div className="icon">🐪</div><div className="description">Camel</div></div>
            <div id='🐫' className='mammal' title='Two Humped Camel'><div className="icon">🐫</div><div className="description">Two-Humped Camel</div></div>
            <div id='🦙' className='mammal' title='Llama'><div className="icon">🦙</div><div className="description">Llama</div></div>
            <div id='🦒' className='mammal' title='Giraffe'><div className="icon">🦒</div><div className="description">Giraffe</div></div>
            <div id='🐘' className='mammal' title='Elephant'><div className="icon">🐘</div><div className="description">Elephant</div></div>
            <div id='🦏' className='mammal' title='Rhinoceros'><div className="icon">🦏</div><div className="description">Rhinoceros</div></div>
            <div id='🦛' className='mammal' title='Hippopotamus'><div className="icon">🦛</div><div className="description">Hippopotamus</div></div>
            <div id='🐭' className='mammal' title='Mouse'><div className="icon">🐭</div><div className="description">Mouse</div></div>
            <div id='🐁' className='mammal' title='Mouse'><div className="icon">🐁</div><div className="description">Mouse</div></div>
            <div id='🐀' className='mammal' title='Rat'><div className="icon">🐀</div><div className="description">Rat</div></div>
            <div id='🐹' className='mammal' title='Hamster'><div className="icon">🐹</div><div className="description">Hamster</div></div>
            <div id='🐰' className='mammal' title='Rabbit'><div className="icon">🐰</div><div className="description">Rabbit</div></div>
            <div id='🐇' className='mammal' title='Rabbit'><div className="icon">🐇</div><div className="description">Rabbit</div></div>
            <div id='🐿️' className='mammal' title='Chipmunk'><div className="icon">🐿️</div><div className="description">Chipmunk</div></div>
            <div id='🦔' className='mammal' title='Hedgehog'><div className="icon">🦔</div><div className="description">Hedgehog</div></div>
            <div id='🐻' className='mammal' title='Bear'><div className="icon">🐻</div><div className="description">Bear</div></div>
            <div id='🐨' className='mammal' title='Koala'><div className="icon">🐨</div><div className="description">Koala</div></div>
            <div id='🐼' className='mammal' title='Panda'><div className="icon">🐼</div><div className="description">Panda</div></div>
            <div id='🧸️' className='mammal' title='Teddy Bear'><div className="icon">🧸️</div><div className="description">Teddy Bear</div></div>
            <div id='🦘' className='mammal' title='Kangaroo'><div className="icon">🦘</div><div className="description">Kangaroo</div></div>
            <div id='🦡' className='mammal' title='Badger'><div className="icon">🦡</div><div className="description">Badger</div></div>
            <div id='🦥️' className='mammal' title='Sloth'><div className="icon">🦥️</div><div className="description">Sloth</div></div>
            <div id='🦦️' className='mammal' title='Otter'><div className="icon">🦦️</div><div className="description">Otter</div></div>
            <div id='🐳' className='mammal' title='Spouting Whale'><div className="icon">🐳</div><div className="description">Spouting Whale</div></div>
            <div id='🐋' className='mammal' title='Whale'><div className="icon">🐋</div><div className="description">Whale</div></div>
            <div id='🐬' className='mammal' title='Dolphin'><div className="icon">🐬</div><div className="description">Dolphin</div></div>
            <div id='🐟' className='fish' title='Freshwater Fish'><div className="icon">🐟</div><div className="description">Freshwater Fish</div></div>
            <div id='🐠' className='fish' title='Tropical Fish'><div className="icon">🐠</div><div className="description">Tropical Fish</div></div>
            <div id='🐡' className='fish' title='Blowfish'><div className="icon">🐡</div><div className="description">Blowfish</div></div>
            <div id='🦈' className='fish' title='Shark'><div className="icon">🦈</div><div className="description">Shark</div></div>
            <div id='🦐' className='crustacean' title='Shrimp'><div className="icon">🦐</div><div className="description">Shrimp</div></div>
            <div id='🦀' className='crustacean' title='Crab'><div className="icon">🦀</div><div className="description">Crab</div></div>
            <div id='🦞' className='crustacean' title='Lobster'><div className="icon">🦞</div><div className="description">Lobster</div></div>
            <div id='🦑' className='mollusk' title='Squid'><div className="icon">🦑</div><div className="description">Squid</div></div> 
            <div id='🐙' className='mollusk' title='Octopus'><div className="icon">🐙</div><div className="description">Octopus</div></div>
            <div id='🐚' className='mollusk' title='Spiral Shell'><div className="icon">🐚</div><div className="description">Spiral Shell</div></div>
            <div id='🐌' className='mollusk' title='Snail'><div className="icon">🐌</div><div className="description">Snail</div></div>
            <div id='🐸' className='amphibian' title='Frog'><div className="icon">🐸</div><div className="description">Frog</div></div>
            <div id='🐊' className='reptile' title='Crocodile'><div className="icon">🐊</div><div className="description">Crocodile</div></div>
            <div id='🐢' className='reptile' title='Turtle'><div className="icon">🐢</div><div className="description">Turtle</div></div>
            <div id='🦎' className='reptile' title='Lizard'><div className="icon">🦎</div><div className="description">Lizard</div></div>
            <div id='🐍' className='reptile' title='Snake'><div className="icon">🐍</div><div className="description">Snake</div></div>
            <div id='🐲' className='reptile' title='Dragon'><div className="icon">🐲</div><div className="description">Dragon</div></div>
            <div id='🐉' className='reptile' title='Dragon'><div className="icon">🐉</div><div className="description">Dragon</div></div>
            <div id='🦕' className='dinosaur' title='Sauropod'><div className="icon">🦕</div><div className="description">Sauropod</div></div>
            <div id='🦖' className='dinosaur' title='T-Rex'><div className="icon">🦖</div><div className="description">T-Rex</div></div>
            <div id='🦃' className='bird' title='Turkey'><div className="icon">🦃</div><div className="description">Turkey</div></div>
            <div id='🐔' className='bird' title='Chicken'><div className="icon">🐔</div><div className="description">Chicken</div></div>
            <div id='🐓' className='bird' title='Rooster'><div className="icon">🐓</div><div className="description">Rooster</div></div>
            <div id='🐣' className='bird' title='Hatching Chick'><div className="icon">🐣</div><div className="description">Hatching Chick</div></div>
            <div id='🐤' className='bird' title='Baby Chick'><div className="icon">🐤</div><div className="description">Baby Chick</div></div>
            <div id='🐥' className='bird' title='Baby Chick'><div className="icon">🐥</div><div className="description">Baby Chick</div></div>
            <div id='🐦' className='bird' title='Cardinal'><div className="icon">🐦</div><div className="description">Cardinal</div></div>
            <div id='🐧' className='bird' title='Penguin'><div className="icon">🐧</div><div className="description">Penguin</div></div>
            <div id='🕊️' className='bird' title='Dove'><div className="icon">🕊️</div><div className="description">Dove</div></div>
            <div id='🦅' className='bird' title='Eagle'><div className="icon">🦅</div><div className="description">Eagle</div></div>
            <div id='🦆' className='bird' title='Duck'><div className="icon">🦆</div><div className="description">Duck</div></div>
            <div id='🦢' className='bird' title='Swan'><div className="icon">🦢</div><div className="description">Swan</div></div>
            <div id='🦉' className='bird' title='Owl'><div className="icon">🦉</div><div className="description">Owl</div></div>
            <div id='🦚' className='bird' title='Peacock'><div className="icon">🦚</div><div className="description">Peacock</div></div>
            <div id='🦜' className='bird' title='Parrot'><div className="icon">🦜</div><div className="description">Parrot</div></div>
            <div id='🦩️' className='bird' title='Flamingo'><div className="icon">🦩️</div><div className="description">Flamingo</div></div>
            <div id='🦇' className='mammal' title='Bat'><div className="icon">🦇</div><div className="description">Bat</div></div>
            <div id='🦋' className='insect' title='Butterfly'><div className="icon">🦋</div><div className="description">Butterfly</div></div>
            <div id='🐛' className='insect' title='Caterpillar'><div className="icon">🐛</div><div className="description">Caterpillar</div></div>
            <div id='🐜' className='insect' title='Ant'><div className="icon">🐜</div><div className="description">Ant</div></div>
            <div id='🐝' className='insect' title='Honey Bee'><div className="icon">🐝</div><div className="description">Honey bee</div></div>
            <div id='🐞' className='insect' title='Lady Beetle'><div className="icon">🐞</div><div className="description">Lady Beetle</div></div>
            <div id='🦗' className='insect' title='Cricket'><div className="icon">🦗</div><div className="description">Cricket</div></div>
            <div id='🦟' className='insect' title='Mosquito'><div className="icon">🦟</div><div className="description">Mosquito</div></div>
            <div id='🕷️' className='arachnid' title='Spider'><div className="icon">🕷️</div><div className="description">Spider</div></div>
            <div id='🦂' className='arachnid' title='Scorpion'><div className="icon">🦂</div><div className="description">Scorpion</div></div>
            <div id='🦠' className='protozoa' title='Microbe'><div className="icon">🦠</div><div className="description">Microbe</div></div>
          </div>




        </div>


      {/* <motion.div
        className="rounded bg-white p-6 shadow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Image
          src={currentAnimal.src}
          alt={currentAnimal.name}
          width={700}
          height={700}
          className="h-60 w-full rounded-xl object-contain"
        />
        <h2 className="my-10 text-center text-4xl font-bold">{currentAnimal.name}</h2>
        <p className="mt-2 text-gray-600">{currentAnimal.description}</p>
      </motion.div> */}

      <div className="mt-6 flex w-full justify-center">
        {/* <button
          onClick={handleBack}
          className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Next
        </button> */}


            {/* <div className="flex items-center justify-between">
                <button  onClick={handleBack} className="button-3d">
                    <div className="button-top"><ArrowLeft /> Back </div>
                    <div className="button-bottom"></div>
                    <div className="button-base"></div>
                </button>
                <button onClick={handleNext} className="button-3d">
                    <div className="button-top">Next <ArrowRight /></div>
                    <div className="button-bottom"></div>
                    <div className="button-base"></div>
                </button>
            </div> */}

      </div>
    </div>
  );
}

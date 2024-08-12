import Link from 'next/link';
import Image from 'next/image';

export default function MathQuiz() {
  const levels = Array.from({ length: 10 }, (_, i) => i + 1);
  const images = Array.from({ length: 10 }, (_, i) => `/images/quiz/${i + 1}.svg`);

  return (
    <div className="mb-16 mt-2 flex min-h-screen flex-col p-4 md:p-6">
      <h1 className="mb-8 text-center text-4xl font-bold text-orange-500">Math Quiz</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
        {levels.map((level, index) => (
          <Link key={level} href={`/math-quiz/level/${level}`}>
            <div className="relative flex flex-col items-center justify-center rounded-lg bg-white shadow transition-transform hover:scale-105 hover:shadow-xl dark:bg-slate-900 dark:text-white">
              <div className="flex h-48 w-full items-center justify-center overflow-hidden rounded-t-lg">
                <Image
                  src={images[index]}
                  className="size-full object-cover"
                  width={175}
                  height={175}
                  alt={`Level ${level} image`}
                />
              </div>
              <div className="p-4 text-center">
                <h2 className="text-xl font-semibold text-blue-700">Level {level}</h2>
                <p className="mt-2 text-gray-600">Lets start</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

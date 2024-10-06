import Image from "next/image";

const Loading = () => {
  return (
    <div className='flex h-screen w-full items-center justify-center'>
      <Image
        src='/icons/loader.svg'
        width={50}
        height={50}
        alt='loader'
        className='object-contain text-[#F97316] fill-[#F97316]'
      />
    </div>
  );
};

export default Loading;

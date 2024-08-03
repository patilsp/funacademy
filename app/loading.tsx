import Image from "next/image";

const Loading = () => {
  return (
    <div className='flex h-screen w-full items-center justify-center'>
      <Image
        src='/icons/loader.svg'
        width={100}
        height={100}
        alt='loader'
        className='object-contain'
      />
    </div>
  );
};

export default Loading;

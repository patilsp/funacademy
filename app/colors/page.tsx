import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';

const colors = [
    { name: 'Red', hex: '#FF0000' },
    { name: 'Green', hex: '#00FF00' },
    { name: 'Blue', hex: '#0000FF' },
    { name: 'Yellow', hex: '#FFFF00' },
    { name: 'Orange', hex: '#FFA500' },
    { name: 'Purple', hex: '#800080' },
    { name: 'Pink', hex: '#FFC0CB' },
    { name: 'Brown', hex: '#A52A2A' },
    { name: 'Black', hex: '#000000' },
    { name: 'White', hex: '#FFFFFF' },
    // Add more colors as needed
  ];
  

const ColorsDisplay = () => {
  return (
    <div className="my-10">
        <div className="p-2">
            <Link href="/category" className="flex gap-2"> 
            <ArrowLeft className="size-8 rounded-full border bg-slate-100 p-2 hover:shadow"/> 
            <h1 className="mt-1 text-xl font-bold text-orange-500">Colors</h1>
            </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 lg:grid-cols-4">
            {colors.map((color) => (
                <div
                key={color.name}
                className="my-4 flex flex-col items-center justify-center rounded p-4 shadow-lg"
                style={{ backgroundColor: color.hex }}
                >
                <span className="text-lg font-bold text-white">{color.name}</span>
                </div>
            ))}
        </div>
    </div>
  );
};

export default ColorsDisplay;

'use client';

import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";

export default function ProductPage() {  
  const [allProducts, setAllProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/product");
      const data = await response.json();
      
      const transformedProducts = data.map((product, index) => ({
        ...product,
        id: product._id.toString(),
        id: `prod-${index + 1}`, // Changed id prefix to 'prod-' for products
      }));

      setAllProducts(transformedProducts);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="h-full flex-1 flex-col space-y-8 p-4 md:p-8">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-bold md:text-2xl">Welcome back!</h2>
          <p className="text-sm text-muted-foreground md:text-base">
            Here&apos;s a list of your products for this month!
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link href='create-product' className='inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50'>
            <PlusCircledIcon className="mr-2 size-4" />
            Add Product
          </Link>           
        </div>
      </div>
      <div className="mt-6">
        <DataTable data={allProducts} columns={columns} />
      </div>
    </div>
  );
}

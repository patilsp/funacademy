"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from "@/registry/new-york/ui/button";
import { Input } from "@/registry/new-york/ui/input";
import { Label } from "@/registry/new-york/ui/label";
import { Textarea } from "@/registry/new-york/ui/textarea";

const ProductForm = ({ type, product, setProduct, submitting, handleSubmit }) => {
  return (
    <section className="flex w-full justify-center p-1 md:px-4">
      <div className="container flex flex-col items-center justify-center gap-6 p-1 lg:flex-row lg:p-8">
        {/* Image Section */}
        <div className="hidden w-full overflow-hidden md:block lg:w-1/2">
          <Image
            src="/images/alert-2.png"
            alt="Product"
            width={500}
            height={500}
            className="object-cover p-10"
          />
        </div>

        {/* Form Section */}
        <div className="glassmorphism w-full rounded-lg border shadow-lg dark:bg-slate-900 dark:text-white lg:w-1/2">
          <div className="p-4">
            <h1 className='head_text text-center'>
              <span className='green_gradient text-xl font-bold'>{type} Product</span>
            </h1>
            <p className='py-1 text-center text-sm text-slate-600 dark:text-gray-200'>
              Create and Update product here
            </p>
          </div>
          <motion.form
            onSubmit={handleSubmit}
            className='mt-2 flex w-full flex-col gap-4 p-4'
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* Form Fields */}
              <div className="grid gap-2">
                <Label htmlFor="name">Product Name</Label>
                <Input
                  value={product.name}
                  onChange={(e) => setProduct({ ...product, name: e.target.value })}
                  placeholder='Enter product Name'
                  required
                  className='border-white'
                />
              </div>
             
              <div className="grid gap-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  value={product.price}
                  onChange={(e) => setProduct({ ...product, price: e.target.value })}
                  placeholder='Enter price'                  
                  type='number'
                  step='0.01'
                  className='border-white'
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="model">Model</Label>
                <Input
                  value={product.model}
                  onChange={(e) => setProduct({ ...product, model: e.target.value })}
                  placeholder='Enter product model'
                  required
                  className='border-white'
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="capacity">Capacity</Label>
                <Input
                  value={product.capacity}
                  onChange={(e) => setProduct({ ...product, capacity: e.target.value })}
                  placeholder='Enter product capacity'                  
                  className='border-white'
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="technology">Technology</Label>
                <Input
                  value={product.technology}
                  onChange={(e) => setProduct({ ...product, technology: e.target.value })}
                  placeholder='Enter product technology'                  
                  className='border-white'
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="warranty">Warranty</Label>
                <Input
                  value={product.warranty}
                  onChange={(e) => setProduct({ ...product, warranty: e.target.value })}
                  placeholder='Enter product warranty'                  
                  className='border-white'
                />
              </div>
             
            </div>
            <div className="grid w-full gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  value={product.description}
                  onChange={(e) => setProduct({ ...product, description: e.target.value })}
                  placeholder='Enter product description'                  
                  className='form_textarea border-white'
                />
              </div>
            <div className='mt-6 flex justify-center gap-4'>
              <Link href='/products' className='flex items-center rounded bg-red-400 p-1 px-4 text-sm text-primary-foreground shadow hover:bg-red-600'>
                Cancel
              </Link>

              <Button
                type='submit'
                disabled={submitting}
                className='rounded bg-primary px-5 py-2 text-sm text-white dark:text-black'
              >
                {submitting ? `${type}ing...` : type}
              </Button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ProductForm;

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ProductForm from "@/components/ProductForm";
import { useAuth, useUser } from "@clerk/nextjs";
import { Button } from "@/registry/new-york/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/registry/new-york/ui/form";
import { Input } from "@/registry/new-york/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/new-york/ui/select";
import { Textarea } from "@/registry/new-york/ui/textarea";

const CreateProduct = () => {
  const router = useRouter();
  const { isLoaded, userId, getToken } = useAuth();
  const { isSignedIn, user } = useUser();

  const [submitting, setIsSubmitting] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    model: "",
    capacity: "",
    technology: "",
    warranty: "",
  });

  const createProduct = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/product/new", {
        method: "POST",
        body: JSON.stringify({
          name: product.name,
          description: product.description,
          price: product.price,
          model: product.model,
          capacity: product.capacity,
          technology: product.technology,
          warranty: product.warranty,
        }),
      });

      if (response.ok) {
        router.push("/products");
        toast.success("Product has been added successfully! 🔥");
      } else {
        toast.error("Failed to add product.");
      }
    } catch (error) {
      toast.error("An error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ProductForm
      type="Create"
      product={product}
      setProduct={setProduct}
      submitting={submitting}
      handleSubmit={createProduct}
    />
  );
};

export default CreateProduct;

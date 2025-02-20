"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AddProductForm() {
  const [formData, setFormData] = useState({
    productId: "",
    productName: "",
    productPrice: "",
    productStock: "",
    delivered_date: "",
    next_delivery_date: "",
    productDefaultOrder: "",
    productSold: "",
    productStatus: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageFile(e.target.files ? e.target.files[0] : null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    if (imageFile) data.append("image", imageFile);

    try {
      const response = await fetch("https://smart-inventory-management-system-5n6f.onrender.com/product/add_product", {
        method: "POST",
        body: data,
      });
      const result = await response.json();
      setMessage(result.message);
    } catch (error) {
      setMessage("Failed to add product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <Label>Product ID</Label>
      <Input type="number" name="productId" value={formData.productId} onChange={handleChange} required />
      
      <Label>Image</Label>
      <Input type="file" accept="image/*" onChange={handleFileChange} required />
      
      <Label>Product Name</Label>
      <Input type="text" name="productName" value={formData.productName} onChange={handleChange} required />
      
      <Label>Product Price</Label>
      <Input type="number" name="productPrice" value={formData.productPrice} onChange={handleChange} required />
      
      <Label>Product Stock</Label>
      <Input type="number" name="productStock" value={formData.productStock} onChange={handleChange} required />
      
      <Label>Delivered Date</Label>
      <Input type="date" name="delivered_date" value={formData.delivered_date} onChange={handleChange} />
      
      <Label>Next Delivery Date</Label>
      <Input type="date" name="next_delivery_date" value={formData.next_delivery_date} onChange={handleChange} />
      
      <Label>Default Order</Label>
      <Input type="number" name="productDefaultOrder" value={formData.productDefaultOrder} onChange={handleChange} />
      
      <Label>Sold</Label>
      <Input type="number" name="productSold" value={formData.productSold} onChange={handleChange} />
      
      <Label>Product Status</Label>
      <Input type="text" name="productStatus" value={formData.productStatus} onChange={handleChange} required />
      
      {message && <p className="text-center text-red-500">{message}</p>}
      
      <Button type="submit" disabled={loading}>{loading ? "Submitting..." : "Add Product"}</Button>
    </form>
  );
}

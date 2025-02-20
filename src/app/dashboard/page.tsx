"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

interface Product {
    image_url: string;
    productName: string;
    productPrice: number;
    productSold: number;
    productStatus: string;
    productStock: number;
}

export default function Dashboard() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch("https://smart-inventory-management-system-5n6f.onrender.com/product/getall")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }
                return response.json();
            })
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <h1 className="text-3xl md:text-5xl text-center flex justify-center mb-6">Welcome To Dashboard</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"> 
                {products.map((product, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <img src={product.image_url} alt={product.productName} className="rounded-lg w-[300px] h-[300px]" />
                            <CardTitle>{product.productName}</CardTitle>
                            <CardDescription>Price: ${product.productPrice}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Sold: {product.productSold}</p>
                            <p>Stock: {product.productStock}</p>
                            <p>Status: {product.productStatus}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
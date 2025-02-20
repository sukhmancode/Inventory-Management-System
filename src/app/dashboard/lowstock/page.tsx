"use client";
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

interface LowStockProduct {
    image_url: string;
    productName: string;
    productStock: number;
    supplierName: string;
}

export default function LowStockAlert() {
    const [lowStockProducts, setLowStockProducts] = useState<LowStockProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLowStock = async () => {
            try {
                const response = await fetch('https://smart-inventory-management-system-5n6f.onrender.com/product/lowstock/2001');
                if (!response.ok) {
                    throw new Error('Failed to fetch low stock products');
                }
                const data = await response.json();
                setLowStockProducts(data);
            } catch (err) {
                setError('Error loading low stock products');
                console.error('Fetch error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchLowStock();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-24">
                <div className="animate-spin h-8 w-8 border-4 border-red-500 rounded-full border-t-transparent"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-500 text-center p-4">
                {error}
            </div>
        );
    }

    if (lowStockProducts.length === 0) {
        return (
            <div className="text-center p-4 text-gray-500">
                No low stock products at the moment
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 mb-6">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <h2 className="text-xl font-semibold">Low Stock Alert</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {lowStockProducts.map((product, index) => (
                    <Card 
                        key={index} 
                        className="border-red-200 bg-red-50"
                    >
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg font-semibold">
                                {product.productName}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="grid md:grid-cols-2 gap-4">
                            <div className="relative aspect-square rounded-md overflow-hidden">
                                <img 
                                    src={product.image_url} 
                                    alt={product.productName}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Stock Level:</span>
                                    <span className="font-bold text-red-600">
                                        {product.productStock} units
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Supplier:</span>
                                    <span className="font-medium">
                                        {product.supplierName}
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
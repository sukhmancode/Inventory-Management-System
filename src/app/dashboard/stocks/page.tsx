"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ProductInfo {
    productId: number;
    productName: string;
    productStock: number;
    supplierName: string;
}

interface ProductDetail {
    delivered_date: string;
    image_url: string;
    next_delivery_date: string;
    productDefaultOrder: number;
    productId: number;
    productName: string;
    productPrice: number;
    productSold: number;
    productStatus: string;
    productStock: number;
}

export default function InventoryCard() {
    const [products, setProducts] = useState<ProductInfo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<ProductDetail | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [detailLoading, setDetailLoading] = useState(false);

    useEffect(() => {
        fetch("https://smart-inventory-management-system-5n6f.onrender.com/inventory/2001")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch inventory");
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

    const fetchProductDetail = async (productId: number) => {
        setDetailLoading(true);
        try {
            const response = await fetch(`https://smart-inventory-management-system-5n6f.onrender.com/product/detail/${productId}`);
            if (!response.ok) {
                throw new Error("Failed to fetch product details");
            }
            const data = await response.json();
            setSelectedProduct(data);
            setIsDialogOpen(true);
        } catch (error) {
            console.error("Error fetching product details:", error);
        } finally {
            setDetailLoading(false);
        }
    };

    if (loading) {
        return <div className="flex justify-center p-4">
            <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
        </div>;
    }

    if (error) {
        return <p className="text-red-500 p-4">Error: {error}</p>;
    }

    return (
        <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"> 
                {products.map((product) => (
                    <Card key={product.productId} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <CardTitle>{product.productName}</CardTitle>
                            <CardDescription>Supplier: {product.supplierName}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm">Stock: {product.productStock}</p>
                            <Button 
                                onClick={() => fetchProductDetail(product.productId)}
                                disabled={detailLoading}
                            >
                                View More
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Product Details</DialogTitle>
                    </DialogHeader>
                    {selectedProduct && (
                        <div className="grid gap-4">
                            <div className="aspect-video relative overflow-hidden rounded-lg">
                                <img 
                                    src={selectedProduct.image_url} 
                                    alt={selectedProduct.productName}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                                <div className="font-medium">Product Name:</div>
                                <div>{selectedProduct.productName}</div>
                                
                                <div className="font-medium">Price:</div>
                                <div>₹{selectedProduct.productPrice}</div>
                                
                                <div className="font-medium">Stock:</div>
                                <div>{selectedProduct.productStock}</div>
                                
                                <div className="font-medium">Status:</div>
                                <div>{selectedProduct.productStatus}</div>
                                
                                <div className="font-medium">Units Sold:</div>
                                <div>{selectedProduct.productSold}</div>
                                
                                <div className="font-medium">Default Order:</div>
                                <div>{selectedProduct.productDefaultOrder}</div>
                                
                                <div className="font-medium">Last Delivered:</div>
                                <div>{new Date(selectedProduct.delivered_date).toLocaleDateString()}</div>
                                
                                <div className="font-medium">Next Delivery:</div>
                                <div>{new Date(selectedProduct.next_delivery_date).toLocaleDateString()}</div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}
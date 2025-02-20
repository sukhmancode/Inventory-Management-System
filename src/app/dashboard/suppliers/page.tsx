"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface SupplierInfo {
    supplierName: string;
    supplierEmail: string;
    supplierContact: string;
}

export default function SupplierInfoCard() {
    const [suppliers, setSuppliers] = useState<SupplierInfo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch("https://smart-inventory-management-system-5n6f.onrender.com/supplier/info")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch supplier info");
                }
                return response.json();
            })
            .then((data) => {
                setSuppliers(data);
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> 
        
            {suppliers.map((supplier, index) => (
                <Card key={index}>
                    <CardHeader>
                        <CardTitle>{supplier.supplierName}</CardTitle>
                        <CardDescription>{supplier.supplierEmail}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Contact: {supplier.supplierContact}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

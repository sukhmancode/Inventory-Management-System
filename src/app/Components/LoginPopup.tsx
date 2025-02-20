"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogTrigger } from "@radix-ui/react-dialog";

export function LoginPopup() {
    const router = useRouter();
    const [storeId, setStoreId] = useState("");
    const [storePassword, setStorePassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [open, setOpen] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const response = await fetch("https://smart-inventory-management-system-5n6f.onrender.com/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    storeId: Number(storeId), // Convert to number as per API requirement
                    storePassword: storePassword 
                }),
            });

            // Get the raw text first
            const responseText = await response.text();
            console.log('Raw Response:', responseText);

            // Try to parse it as JSON
            let data;
            try {
                data = JSON.parse(responseText);
                console.log('Parsed Response:', data);
            } catch (parseError) {
                console.error('JSON Parse Error:', parseError);
                setError("Invalid response format from server");
                setLoading(false);
                return;
            }

            if (response.ok) {
                // Check if we have a token in the response
                if (data.Token) {
                    console.log('Token received:', data.Token);
                    
                    // Store the token
                    localStorage.setItem('authToken', data.Token);
                    
                    // Store user ID
                    localStorage.setItem('storeId', storeId);
                    
                    setSuccess("Login successful!");
                    setOpen(false);
                    
                    // Navigate to dashboard
                    router.push("/dashboard");
                } else {
                    console.error('No token in response:', data);
                    setError("Login successful but no token received");
                }
            } else {
                // Handle specific error messages from the server
                const errorMessage = data.message || data.error || "Login failed";
                console.error('Login Error:', errorMessage);
                setError(errorMessage);
            }
        } catch (err) {
            console.error("Network or parsing error:", err);
            setError("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Function to validate stored token
    const checkStoredToken = () => {
        const token = localStorage.getItem('authToken');
        if (token) {
            console.log('Stored token:', token);
            // You can add token validation logic here
            // For example, check if it's a valid JWT format
            try {
                const parts = token.split('.');
                if (parts.length === 3) {
                    const payload = JSON.parse(atob(parts[1]));
                    console.log('Token payload:', payload);
                    // Check expiration
                    if (payload.exp && payload.exp * 1000 > Date.now()) {
                        console.log('Token is valid and not expired');
                    } else {
                        console.log('Token is expired');
                        localStorage.removeItem('authToken');
                    }
                }
            } catch (e) {
                console.error('Token validation error:', e);
            }
        }
    };

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button onClick={checkStoredToken}>Login</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[360px]">
                    <DialogHeader className="flex flex-col items-center">
                        <DialogTitle>Login</DialogTitle>
                        <div className="inline-block text-transparent bg-clip-text 
                            bg-gradient-to-r from-neutral-900 to-neutral-700/80 
                            dark:from-white dark:to-white/80 font-bold text-2xl">
                            TEAM T3
                        </div>
                    </DialogHeader>
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                        <Label htmlFor="storeId">Store ID</Label>
                        <Input 
                            id="storeId"
                            type="number" 
                            name="storeId" 
                            value={storeId} 
                            onChange={(e) => setStoreId(e.target.value)} 
                            required
                        />
                        <Label htmlFor="storePassword">Store Password</Label>
                        <Input 
                            id="storePassword"
                            type="password" 
                            name="storePassword" 
                            value={storePassword} 
                            onChange={(e) => setStorePassword(e.target.value)} 
                            required
                        />
                        {error && <p className="text-red-500">{error}</p>}
                        {success && <p className="text-green-500">{success}</p>}
                        <Button type="submit" disabled={loading}>
                            {loading ? (
                                <svg className="mr-3 size-5 animate-spin" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                                </svg>
                            ) : (
                                "Submit"
                            )}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
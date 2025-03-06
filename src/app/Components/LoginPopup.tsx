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
                    storeId: Number(storeId), 
                    storePassword: storePassword 
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess("Login successful!");
                setOpen(false);
                router.push("/dashboard");
            } else {
                setError(data.message || "Login failed");
            }
        } catch (err) {
            setError("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button>Login</Button>
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
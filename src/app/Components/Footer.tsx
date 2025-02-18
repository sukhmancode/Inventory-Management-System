"use client";
import { Facebook, Instagram, Twitter } from "lucide-react";

export const Footer = () => {
  return(
    <section className="flex justify-center items-center bg-black mt-10 p-5">
        <div className="container flex-col p-5 flex gap-5 justify-center items-center">
        <div className="inline-block text-transparent bg-clip-text 
                    bg-gradient-to-r from-white to-neutral-200 
                    dark:from-white dark:to-white/80 font-bold text-2xl">
                TEAM T3
            </div>

        <div className="flex gap-4 text-white">
            &copy;2025 All rights reserved
      </div>
        </div>
    </section>
  );
};

import { Button } from "@/components/ui/button";

export function Navbar() {
    return (
        <div className="p-2 flex justify-between items-center" >
            <div className="inline-block text-transparent bg-clip-text 
                    bg-gradient-to-r from-neutral-900 to-neutral-700/80 
                    dark:from-white dark:to-white/80 font-bold text-2xl">
                TEAM T3
            </div>

            <div>
                <Button className="bg-gradient-to-b from bg-neutral-900 to bg-neutral-700/100">Try for free</Button>
            </div>
        </div>
    )
}
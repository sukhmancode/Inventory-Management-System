import { LoginPopup } from "./LoginPopup";
import { SignUpPopup } from "./SignUpPopup";

export function Navbar() {
    return (
        <div className="p-2 flex justify-between items-center" >
            <div className="inline-block text-transparent bg-clip-text 
                    bg-gradient-to-r from-neutral-900 to-neutral-700/80 
                    dark:from-white dark:to-white/80 font-bold text-2xl">
                TEAM T3
            </div>

            <div className="flex gap-3">
                <SignUpPopup/>
                <LoginPopup/>
            </div>
        </div>
    )
}
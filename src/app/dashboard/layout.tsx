import Link from "next/link";
import { ReactNode } from "react";
import { DashboardLinks } from "../Components/DashboardLinks";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Loader, Menu, PersonStandingIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default async function DashboardLayout({children}: {children : ReactNode}) {
    return (
        <>
          <div className="min-h-screen w-full grid md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <div className="hidden md:block border-r bg-muted/40">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                        <Link href={"/"} className="flex gap-2">
                        <div className="inline-block text-transparent bg-clip-text 
                            bg-gradient-to-r from-white to-black 
                            dark:from-white dark:to-white/80 font-bold text-2xl">
                        TEAM T3
                        </div>
                        </Link>
                    </div>
                    <div className="flex-1">
                        <nav className="grid items-start px-2 lg:px-4">
                            <DashboardLinks/>
                        </nav>
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button className="md:hidden shrink-0" size={"icon"} variant={"outline"}>
                                <Menu className="size-5"/>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side={"left"} className="flex flex-col">
                            <nav className="grid gap-2 mt-10">
                                <DashboardLinks />
                            </nav>
                        </SheetContent>
                    </Sheet>

                    <div className="ml-auto flex items-center gap-x-4">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button className=" rounded-full">
                                    <PersonStandingIcon />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link href={'/dashboard/settings'}>Settings</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>
                <main className="flex flex-col flex-1 gap-4 p-4 lg:gap-6 lg:p-6">
                    {children}
                </main>
            </div>
          </div>  
        </>
    )
}
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import Image from "next/image"


import React from 'react'
import { Navitems } from "./Navitems"

const MobileNav = () => {
    return (
        <nav className=" md:hidden">
            <Sheet>
                <SheetTrigger className=" align-middle">
                    <Image
                        className=" cursor-pointer"
                        src="/assets/icons/menu.svg"
                        alt="menu"
                        width={24}
                        height={24}
                    />
                </SheetTrigger>
                <SheetContent className=" flex flex-col gap-6 bg-white md:hidden">
                    <div className=" pb-4 border-b">
                        <Image
                        src="/assets/images/logo.svg"
                        alt="LOGO"
                        width={128}
                        height={38}
                    />
                    </div>
                    <Navitems/>
                </SheetContent>
            </Sheet>
        </nav>
    )
}

export default MobileNav
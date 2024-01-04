import Link from "next/link"
import { Button } from "../ui/button"
import Image from "next/image"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { Navitems } from "./Navitems"
import MobileNav from "./MobileNav"

const Header = () => {
    return (
        <header className=" w-screen border-b">
            <div className="wrapper flex justify-between items-center">
                <Link href='/'>
                <Image
                        src="/assets/images/logo.svg"
                        alt="LOGO"
                        width={128}
                        height={38}
                    />
                </Link>
                <SignedIn>
                    <nav className="md:flex-between hidden">
                        <Navitems/>
                    </nav>
                </SignedIn>
                <div className=" flex justify-end w-32 gap-3">
                    <SignedIn>
                        <UserButton afterSignOutUrl="/" />
                        <MobileNav/>
                    </SignedIn>
                    <SignedOut>
                        <Button asChild className=" rounded-full" size='lg'>
                            <Link href='/sign-in'>
                                Login
                            </Link>
                        </Button>
                    </SignedOut>
                </div>
            </div>
        </header>
    )
}

export default Header
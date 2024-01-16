import Link from "next/link"
import Image from "next/image"

const Footer = () => {
  return (
    <footer className="w-screen center border-t">
      <div className=" w-screen items-center flex justify-between py-5 px-8 flex-col gap-6 sm:flex-row text-center capitalize">
        <Link href='/'>
          <Image
            src="/assets/images/logo.svg"
            alt="LOGO"
            width={128}
            height={38}
          />
        </Link>
        <p>2024 Evently. All right reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
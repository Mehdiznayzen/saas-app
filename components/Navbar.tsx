
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import NavItems from "./NavItems";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link href="/">
        <div className="flex items-center gap-2.5 cursor-pointer">
          <Image
            src="/images/logo.svg"
            alt="logo"
            width={46}
            height={44}
          />
        </div>
      </Link>

      <div className="flex items-center gap-8">
        <Suspense
          fallback={
            <div className="flex items-center gap-4">
              <span>Home</span>
              <span>Companions</span>
              <span>My Journey</span>
            </div>
          }
        >
          <NavItems />
        </Suspense>
      </div>
    </nav>
  );
};

export default Navbar;

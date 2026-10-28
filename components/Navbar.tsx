
"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import NavItems from "./NavItems";
import {
  Show,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";

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

        <Show 
          when="signed-out"
        >
          <div 
            className="flex items-center gap-2 cursor-pointer n"
          >
            <SignInButton>
              <button className="btn-signin">Sign In</button>
            </SignInButton>
          </div>
        </Show>

        <Show when="signed-in">
          <UserButton />
        </Show>
      </div>
    </nav>
  );
};

export default Navbar;

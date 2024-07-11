import { Link } from "next-view-transitions";
import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function Back({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className="scale-95 md:scale-100 max-h-[36px] text-md text-light p-2 hover:py-6 hover:max-h-[42px] md:hover:px-6 md:hover:py-2 md:hover:max-h-[36px] hover:mr-3 hover:bg-accent hover:border-transparent hover:text-bg active:px-4 flex items-center justify-center border-2 border-light rounded-full transition-all duration-300"
    >
      <IoMdArrowRoundBack />
    </Link>
  );
}

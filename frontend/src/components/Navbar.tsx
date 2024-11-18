import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="mb-4 text-white text-4xl flex items-center bg-lime-900">
      <Link href="/transactions">fintrack</Link>
    </nav>
  );
};

export default Navbar;

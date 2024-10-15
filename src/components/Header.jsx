"use client";
import React from "react";
import { MenuIcon, XCircleIcon } from "lucide-react";
import { UserButton, useUser, SignInButton } from "@clerk/clerk-react";
import LogoImage from "./LogoImage";
import { Button } from "./ui/button";
import Footer from "./Footer";
import { Link } from "react-router-dom";

const menuItems = [
  { name: "Home", href: "/home" },
  { name: "About", href: "#" },
  { name: "Contact", href: "#" },
];

function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { isSignedIn } = useUser();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="relative w-full ">
      {/* Notch-Like Header */}
      <div className="container mx-auto flex items-center justify-between px-6 py-4 bg-transparent shadow-lg rounded-b-[2rem] clip-path-bottom-notch bg-white">
        <div className="inline-flex items-center space-x-3">
          <LogoImage />
        </div>

        {/* Centered Desktop Menu */}
        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center">
          <ul className="flex space-x-8">
            {menuItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="text-base font-medium text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* UserButton and List New */}
        <div className="hidden lg:flex lg:items-center lg:space-x-4">
          <Link to={"/profile"}>
            <Button
              type="button"
              className="rounded-md px-4 py-2 text-base font-semibold text-white shadow-md transition-all"
            >
              List New!
            </Button>
          </Link>
          {isSignedIn ? (
            <UserButton className="hover:ring-4 hover:ring-blue-500 hover:scale-105 transition-all rounded-full" />
          ) : (
            <SignInButton>
              <Button
                type="button"
                className="rounded-md px-4 py-2 text-base font-semibold text-white shadow-md transition-all"
              >
                Sign In
              </Button>
            </SignInButton>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <MenuIcon
            onClick={toggleMenu}
            className="h-8 w-8 cursor-pointer text-gray-900"
          />
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute inset-x-0 top-0 z-50 lg:hidden">
          <div className="divide-y divide-gray-200 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="px-6 py-5">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center space-x-3">
                  <LogoImage />
                </div>
                <button
                  type="button"
                  onClick={toggleMenu}
                  className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 focus:outline-none"
                >
                  <XCircleIcon className="h-8 w-8" aria-hidden="true" />
                </button>
              </div>
            </div>
            <div className="px-6 py-6 space-y-4">
              <nav className="grid gap-y-4">
                {menuItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-base font-semibold text-gray-900 hover:bg-gray-100 rounded-md px-3 py-2 transition-colors"
                  >
                    {item.name}
                  </a>
                ))}
              </nav>
              <Link to={"/profile"}>
                <Button
                  type="button"
                  className="mt-4 w-full rounded-md bg-blue-600 px-4 py-2 text-base font-semibold text-white shadow-md hover:bg-blue-500 transition-all"
                >
                  List New!
                </Button>
              </Link>
              <div className="mt-4 flex justify-center">
                {isSignedIn ? (
                  <UserButton className="hover:ring-4 hover:ring-blue-500 hover:scale-105 transition-all rounded-full" />
                ) : (
                  <SignInButton>
                    <Button
                      type="button"
                      className="rounded-md px-4 py-2 text-base font-semibold text-white shadow-md transition-all"
                    >
                      Sign In
                    </Button>
                  </SignInButton>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;

"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

interface NavbarProps {
  height: number;
}

export default function Navbar({ height }: NavbarProps) {
  const { isAuthenticated, logout } = useAuth();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  console.log(useAuth());

  const links = [
    { href: "/", label: "Home", auth: "any" },
    { href: "/signup", label: "Signup", auth: "unauth" },
    { href: "/signin", label: "Signin", auth: "unauth" },
    { href: "/dashboard", label: "Dashboard", auth: "auth" },
    { href: "/signout", label: "Signout", auth: "auth" },
  ];

  const filteredLinks = links.filter((link) => {
    if (link.auth === "auth") return isAuthenticated;
    if (link.auth === "unauth") return !isAuthenticated;
    return true;
  });

  return (
    <nav
      className="backdrop-blur-sm border-b bg-black/20 w-full z-50"
      style={{ height: `${height}rem` }}
    >
      <div className="mx-auto px-4 flex justify-between items-center h-full">

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <FontAwesomeIcon icon={faBars} className="text-white text-2xl" />
          </button>
        </div>

        {/* Logo */}
        <div className="text-white font-semibold text-lg">Server Dashboard</div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-4">
          {filteredLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                {link.label === "Signout" ? (
                  <button
                    onClick={logout}
                    className="text-white hover:text-blue-400 transition-colors"
                  >
                    Signout
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className={`text-white hover:text-blue-400 transition-colors ${
                      isActive ? "border-b-2 border-blue-400 pb-1" : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="md:hidden bg-black/80 flex flex-col space-y-2 p-4">
          {filteredLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                {link.label === "Signout" ? (
                  <button
                    onClick={() => {
                      logout();
                      setMenuOpen(false);
                    }}
                    className="text-white hover:text-blue-400 transition-colors w-full text-left"
                  >
                    Signout
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`text-white hover:text-blue-400 transition-colors block ${
                      isActive ? "border-b-2 border-blue-400 pb-1" : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </nav>
  );
}

"use client";

import { useState } from "react";
import { Menu, X, Search, Pencil, User, PenSquare } from "lucide-react";
import { ThemeToggle } from "../ui/theme-toggle";
import Link from "next/link";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Ambient Background */}
      <div aria-hidden className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-0 h-[70rem] w-[32rem] -translate-y-[20rem] -rotate-45 rounded-full bg-[radial-gradient(68%_68%_at_55%_30%,hsl(var(--foreground)/0.03)_0,hsl(var(--foreground)/0.015)_50%,transparent_80%)]" />
        <div className="absolute top-0 right-0 h-[70rem] w-[18rem] -translate-y-1/2 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsl(var(--foreground)/0.025)_0,transparent_80%)]" />
      </div>

      {/* Navbar */}
      <nav
        className="
          fixed top-0 left-0 right-0 z-50
          bg-background/35
          backdrop-blur-xl backdrop-saturate-150
          supports-[backdrop-filter]:bg-background/30
          border-b border-white/10
          shadow-[0_8px_30px_rgba(0,0,0,0.12)]
        "
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 rounded-xl px-2 py-1 transition hover:bg-white/10"
            >
              <PenSquare className="h-6 w-6" />
              <span className="text-lg font-semibold tracking-tight">
                un<span className="font-light">Blog</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {["Explore", "Featured", "Topics"].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="
                    rounded-xl px-4 py-2 text-sm font-medium
                    text-muted-foreground
                    hover:text-foreground
                    hover:bg-white/10
                    transition-all
                  "
                >
                  {item}
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="hidden md:flex items-center gap-3">
              <button
                className="
                  rounded-xl p-2
                  text-muted-foreground
                  hover:text-foreground
                  hover:bg-white/10
                  transition-all
                "
              >
                <Search className="h-5 w-5" />
              </button>

              <Link
                href="/write"
                className="
                  flex items-center gap-2 rounded-xl
                  px-4 py-2 text-sm font-medium
                  bg-primary/20 text-primary
                  backdrop-blur-md
                  border border-primary/20
                  hover:bg-primary/30
                  transition-all
                "
              >
                <Pencil className="h-4 w-4" />
                Write
              </Link>

              <button
                className="
                  rounded-full p-2
                  bg-white/10
                  backdrop-blur-md
                  border border-white/10
                  hover:bg-white/20
                  transition-all
                "
              >
                <User className="h-5 w-5" />
              </button>

              <ThemeToggle />
            </div>

            {/* Mobile Controls */}
            <div className="flex md:hidden items-center gap-2">
              <ThemeToggle />
              <button
                onClick={() => setIsMobileMenuOpen((v) => !v)}
                className="
                  rounded-xl p-2
                  text-muted-foreground
                  hover:text-foreground
                  hover:bg-white/10
                  transition-all
                "
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            className="
              md:hidden
              border-t border-white/10
              bg-background/40
              backdrop-blur-xl backdrop-saturate-150
            "
          >
            <div className="space-y-1 px-4 py-4">
              {["Explore", "Featured", "Topics"].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="
                    block rounded-xl px-4 py-3 text-base font-medium
                    text-muted-foreground
                    hover:text-foreground
                    hover:bg-white/10
                    transition-all
                  "
                >
                  {item}
                </Link>
              ))}

              <div className="pt-2 space-y-2">
                <Link
                  href="/write"
                  className="
                    flex items-center justify-center gap-2
                    rounded-xl px-4 py-3 text-base font-medium
                    bg-primary/20 text-primary
                    border border-primary/20
                    hover:bg-primary/30
                    transition-all
                  "
                >
                  <Pencil className="h-4 w-4" />
                  Write
                </Link>

                <Link
                  href="/profile"
                  className="
                    flex items-center justify-center gap-2
                    rounded-xl px-4 py-3 text-base font-medium
                    text-muted-foreground
                    hover:text-foreground
                    hover:bg-white/10
                    transition-all
                  "
                >
                  <User className="h-4 w-4" />
                  Profile
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Image from "next/image";

import { navigationItems } from "@/data/navigation";
import { BlurFade } from "./magicui/blur-fade";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 mx-auto w-full px-6 transition-all duration-300 md:px-10 xl:px-16 ${
        isScrolled ? "backdrop-blur bg-black/40 py-2" : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-0 md:px-0 xl:px-6">
        <NavigationMenu className="hidden lg:flex w-full items-center justify-between">
          <NavigationMenuList className="flex space-x-12">
            {navigationItems.slice(0, 2).map((item) => (
              <NavigationMenuItem key={item.name}>
                <NavigationMenuLink
                  asChild
                  className="p-0 text-base hover:bg-transparent"
                >
                  <Link
                    href={item.href}
                    className={`font-italianno font-medium text-white/80 transition-all duration-300 hover:text-white ${
                      isScrolled ? "text-[24px]" : "text-[32px]"
                    }`}
                  >
                    {item.name}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <BlurFade delay={0.25}>
          <Link href="/" className="flex items-center space-x-2">
            <h1
              className={cn(
                "font-normal font-italianno transition-all duration-300",
                isScrolled ? "text-[48px]" : "text-[32px] md:text-[64px]"
              )}
            >
              ArcaneHeritage
            </h1>
          </Link>
        </BlurFade>

        <NavigationMenu className="hidden lg:flex w-full items-center justify-between">
          <NavigationMenuList className="flex space-x-12">
            {navigationItems.slice(2, 4).map((item) => (
              <NavigationMenuItem key={item.name}>
                <NavigationMenuLink
                  asChild
                  className="p-0 text-base hover:bg-transparent"
                >
                  <Link
                    href={item.href}
                    className={`font-italianno font-medium text-white/80 transition-all duration-300 hover:text-white ${
                      isScrolled ? "text-[24px]" : "text-[32px]"
                    }`}
                  >
                    {item.name}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="px-0 lg:hidden"
              aria-label="Toggle menu"
            >
              <Image
                src="/assets/icons/menu-01.svg"
                width={24}
                height={24}
                alt="hamburger"
              />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="top"
            className="w-full gap-0 bg-black/70 h-screen backdrop-blur-lg pb-8"
          >
            <SheetHeader className="">
              <SheetTitle className="text-xl font-semibold text-white">
                <Link href="/" className="flex items-center space-x-2">
                  <BlurFade delay={0.25}>
                    <Link href="/" className="flex items-center space-x-2">
                      <h1
                        className={cn(
                          "font-normal font-italianno transition-all duration-300 text-[32px]"
                        )}
                      >
                        ArcaneHeritage
                      </h1>
                    </Link>
                  </BlurFade>
                </Link>
              </SheetTitle>
            </SheetHeader>

            <div className="flex flex-col space-y-4 px-6 py-5">
              <nav className="mb-0 flex flex-col gap-8">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-base font-medium text-white transition-colors md:text-sm"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

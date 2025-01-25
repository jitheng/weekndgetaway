"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Menu, Moon, Sun, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const { setTheme } = useTheme();

  const routes = [
    {
      href: "/destinations",
      label: "Destinations",
    },
    {
      href: "/map",
      label: "Map",
    },
    {
      href: "/trip-planner",
      label: "Trip Planner",
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-14 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Compass className="h-6 w-6" />
          <span className="font-bold">Weekend Getaway</span>
        </Link>
        <div className="flex items-center space-x-6 text-sm font-medium">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === route.href ? "text-foreground" : "text-foreground/60"
              )}
            >
              {route.label}
            </Link>
          ))}
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="ghost" size="icon">
            <User className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">User menu</span>
          </Button>
        </div>
      </nav>
    </header>
  );
}
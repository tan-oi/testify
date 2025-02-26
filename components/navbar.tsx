import Link from "next/link";
// import { Menu } from "lucide-react";

// import { Button } from "@/components/ui/button";
import { ModeToggle } from "./mode-toggle";
// import { ThemeToggle } from "@/components/theme-toggle"
// import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

const navigation = [
  { name: "Home", href: "#" },
  { name: "About", href: "#" },
  { name: "Services", href: "#" },
  { name: "Contact", href: "#" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="relative bg-gradient-to-b from-background/80 to-background/40 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 max-w-4xl mx-auto">
        <div className="container flex h-16  px-4 items-center">
          <div className="flex flex-1 items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 hover:cursor-pointer group">
              <span className="inline-block text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary/80 to-primary group-hover:bg-white">
                Testify
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary relative after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-gradient-to-r after:from-primary/0 after:via-primary/40 after:to-primary/0 after:origin-center after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
                >
                  {item.name}
                </Link>
              ))}
              <ModeToggle />
            </nav>

         
            <div className="flex items-center space-x-4">
              <div className="hidden md:block">{/**/}
              </div>
        
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

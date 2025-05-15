import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { auth, signOut } from "@/auth";
import { LogOut } from "lucide-react";

export async function Navbar() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-50 w-full border-b">
      <div className="container flex h-16 items-center justify-between px-4 mx-auto">
        <Link href="/" className="flex items-center hover:cursor-pointer">
          <span className="inline-block text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary/80 to-primary group-hover:bg-white">Testify</span>
        </Link>

        <div className="flex items-center space-x-4">
          <ModeToggle />

          {session?.user && session?.user?.id && (
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <Button type="submit">
                <LogOut size="w-4" />
              </Button>
            </form>
          )}
        </div>
      </div>
    </header>
  );
}

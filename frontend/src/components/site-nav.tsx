import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import {
  useState,
  useEffect,
} from "react";

import {
  loginWithGoogle,
  logout,
} from "@/lib/auth";

export function SiteNav() {
 const [user, setUser] =
  useState<any>(null);
useEffect(() => {

    const storedUser =
      localStorage.getItem(
        "user"
      );

    if (storedUser) {

      setUser(
        JSON.parse(
          storedUser
        )
      );

    }

  }, []);

  return (

    <header className="sticky top-0 z-40 w-full border-b border-border/40 backdrop-blur-xl bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        <Link
          to="/"
          className="flex items-center gap-2"
        >
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent glow">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>

          <span className="font-display text-lg font-semibold tracking-tight">
            CreditFlow
            <span className="text-primary">
              {" "}
              AI
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a
            href="#features"
            className="hover:text-foreground transition"
          >
            Features
          </a>

          <a
            href="#how"
            className="hover:text-foreground transition"
          >
            How it works
          </a>

          <Link
            to="/calculator"
            className="hover:text-foreground transition"
          >
            Calculator
          </Link>

          <Link
            to="/dashboard"
            className="hover:text-foreground transition"
          >
            Dashboard
          </Link>
        </nav>

        <div className="flex items-center gap-3">

          {!user ? (

            <Button
              size="sm"
              onClick={async () => {
                try {

                  const loggedUser =
                    await loginWithGoogle();

                  setUser(
                    loggedUser
                  );

                } catch (error) {

                  console.error(
                    error
                  );

                }
              }}
            >
              Continue with Google
            </Button>

          ) : (

            <>
           <img
  src={
    user?.firebase?.photoURL ||
    user?.photoURL ||
    "https://ui-avatars.com/api/?name=User"
  }
  alt="Profile"
  className="h-9 w-9 rounded-full border object-cover"
  referrerPolicy="no-referrer"
/>

             <span className="hidden text-sm md:block">
  {user?.firebase?.displayName ||
   user?.displayName}
</span>

              <Button
                size="sm"
                variant="outline"
                onClick={async () => {

                  await logout();

                  setUser(null);

                }}
              >
                Logout
              </Button>

              <Button
                asChild
                size="sm"
                className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90"
              >
                <Link to="/dashboard">
                  Dashboard
                </Link>
              </Button>
            </>

          )}

        </div>

      </div>
    </header>
  );
}

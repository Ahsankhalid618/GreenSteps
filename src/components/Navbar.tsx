"use client";

import { Logo } from "@/components/Logo";
import Link from "next/link";
import { useUser } from "@/components/UserProvider";
import { signout } from "@/tools/account";

type NavbarProps = {
  selectedRoute?: string;
};

export const Navbar = ({ selectedRoute }: NavbarProps) => {
  const { user, loading, clearUser } = useUser();

  return (
    <nav
      className={
        "dark:border-dark-border bg-neutral-900-80 dark:bg-dark-surface-elevated sticky top-7 z-10 flex w-[90%] flex-row items-center justify-between rounded-2xl border border-neutral-800 p-4 backdrop-blur-xl md:w-[51rem]"
      }
    >
      <Link href={"/"}>
        <Logo />
      </Link>
      <div
        className={
          "dark:text-dark-text-primary flex gap-4 text-white sm:gap-10"
        }
      >
        <span
          className={
            selectedRoute === "rules" ? "font-semibold" : "font-normal"
          }
        >
          <Link href={"/rules"}>Rules</Link>
        </span>

        {!loading && (
          <span
            className={
              selectedRoute === "sign-in" ? "font-semibold" : "font-normal"
            }
          >
            <Link
              href={user ? "/" : "/sign-in"}
              onClick={async (event) => {
                if (user) {
                  event.preventDefault();
                  signout().then(clearUser);
                }
              }}
            >
              {user ? "Sign out" : "Sign in"}
            </Link>
          </span>
        )}
      </div>
    </nav>
  );
};

"use client";

import React from "react";
import { FocusAndTimeTrackerLogo } from "./focusAndTimeTrackerLogo";
import Link from "next/link";
import { ModeToggle } from "./modeToggle";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { clearCredentials, getUser } from "@/redux/features/auth/authSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, Settings, LogOut, LogIn } from "lucide-react";

export default function Navbar() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector(getUser);

  const handleSignOut = () => {
    dispatch(clearCredentials());
    router.push("/sign-in");
  };

  return (
    <header className="container mx-auto px-4 py-4 flex justify-between items-center ">
      <FocusAndTimeTrackerLogo />
      <div className="flex items-center space-x-4">
        <ModeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer text-purple-500">
              <AvatarImage src={user?.avatar_url || "/default-avatar.png"} />
              <AvatarFallback>{user?.name?.slice(0, 1) || "NA"}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-48 mt-2 border shadow-none backdrop-blur-[15px] bg-white/5"
          >
            {user?.email ? (
              <>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("/profile")}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/settings")}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/dashboard")}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </>
            ) : (
              <DropdownMenuItem asChild>
                <Link href="/sign-in" className="w-full">
                  <LogIn className="mr-2 h-4 w-4" />
                  <span>Sign in</span>
                </Link>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import logo from "@/assets/Time_Tracker_logo.png";
import Link from "next/link";

interface LogoProps {
  className?: string;
}

export function FocusAndTimeTrackerLogo({ className }: LogoProps) {
  return (
    <Link href={"/"}>
      <div className={cn("flex items-center space-x-2", className)}>
        <Image
          className="size-8"
          src={logo}
          width={1000}
          height={1000}
          alt="FocusTrack Logo"
        />
        <span className="font-bold text-xl">FocusTrack</span>
      </div>
    </Link>
  );
}

import { cn } from "@/lib/utils";
import Image from "next/image";
import logo from "@/assets/Time_Tracker_logo.png";

interface LogoProps {
  className?: string;
}

export function FocusAndTimeTrackerLogo({ className }: LogoProps) {
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      {/* <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
        <path d="M12 6v6l-4 2" />
        <path d="M12 2v4" />
        <path d="M12 18v4" />
      </svg> */}
      <Image
        className="size-8"
        src={logo}
        width={1000}
        height={1000}
        alt="FocusTrack Logo"
      />
      <span className="font-bold text-xl">FocusTrack</span>
    </div>
  );
}

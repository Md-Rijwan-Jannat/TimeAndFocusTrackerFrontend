import { FocusAndTimeTrackerLogo } from "@/components/modules/shared/focusAndTimeTrackerLogo";
import { ModeToggle } from "@/components/modules/shared/modeToggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="container mx-auto px-4 py-4 flex justify-between items-center">
        <FocusAndTimeTrackerLogo />
        <div className="flex items-center space-x-4">
          <Button asChild variant="ghost">
            <Link href="/sign-in">Sign In</Link>
          </Button>
          <ModeToggle />
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}

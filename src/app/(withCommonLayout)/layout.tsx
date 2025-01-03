import { FocusAndTimeTrackerLogo } from "@/components/modules/shared/focusAndTimeTrackerLogo";
import { ModeToggle } from "@/components/modules/shared/modeToggle";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="container mx-auto px-4 py-4 flex justify-between items-center">
        <FocusAndTimeTrackerLogo />
        <ModeToggle />
      </header>
      <main>{children}</main>
    </div>
  );
}

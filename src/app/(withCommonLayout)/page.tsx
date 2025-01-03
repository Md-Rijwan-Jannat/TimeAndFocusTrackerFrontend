import { FocusAnalytics } from "@/components/modules/home/focusAnalytics";
import { Gamification } from "@/components/modules/home/gamification";
import { PomodoroTimer } from "@/components/modules/home/pomodoroTimer";
import Image from "next/image";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">
        FocusTrack Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-8">
          <PomodoroTimer />
          <Gamification />
        </div>
        <FocusAnalytics />
      </div>
    </div>
  );
}

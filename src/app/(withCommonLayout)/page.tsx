import { PomodoroTimer } from "@/components/modules/home/pomodoroTimer";
import { Gamification } from "@/components/modules/home/gamification";
import { Streaks } from "@/components/modules/home/streacks";

export default function Home() {
  return (
    <div className="container mx-auto p-6 space-b-10">
      {/* Main Content Layout */}
      <div className="grid gap-6 lg:gap-8 grid-cols-1">
        {/* Left Column */}
        <PomodoroTimer />

        {/* Right Column */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <Streaks />
          <Gamification />
        </div>
      </div>
    </div>
  );
}

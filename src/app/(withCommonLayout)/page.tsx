import { PomodoroTimer } from "@/components/modules/home/pomodoroTimer";
import { Gamification } from "@/components/modules/home/gamification";
import { Streaks } from "@/components/modules/home/streacks";

export default function Home() {
  return (
    <div className="container mx-auto p-6 lg:p-8 space-y-10 rounded-lg shadow-lg">
      <h1 className="text-4xl font-extrabold mb-6 text-center">
        Start your day with focus
      </h1>

      {/* Main Content Layout */}
      <div className="grid gap-6 lg:gap-8 grid-cols-1">
        {/* Left Column */}
        <div className="p-6 rounded-lg shadow-md flex flex-col items-center space-y-4">
          <PomodoroTimer />
        </div>

        {/* Right Column */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <div className="p-6 rounded-lg shadow-md">
            <Streaks />
          </div>
          <div className="p-6 rounded-lg shadow-md">
            <Gamification />
          </div>
        </div>
      </div>
    </div>
  );
}

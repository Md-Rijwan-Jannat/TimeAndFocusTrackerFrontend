import { DailyFocusChart } from "@/components/modules/home/dailyFocusChart";
import { FocusAnalytics } from "@/components/modules/home/focusAnalytics";
import { Gamification } from "@/components/modules/home/gamification";
import { PomodoroTimer } from "@/components/modules/home/pomodoroTimer";
import { Streaks } from "@/components/modules/home/streacks";
import { WeeklyFocusChart } from "@/components/modules/home/weeklyFocusChart";

export default function Home() {
  return (
    <div className="container p-4 mx-auto">
      <h1 className="text-3xl font-bold mb-8">Focus Dashboard</h1>
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-8">
          <PomodoroTimer />
          <Streaks />
          <Gamification />
        </div>
        <div className="space-y-8">
          <DailyFocusChart />
          <WeeklyFocusChart />
        </div>
      </div>
    </div>
  );
}

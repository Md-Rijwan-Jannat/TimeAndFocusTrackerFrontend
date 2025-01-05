import { DailyFocusChart } from "@/components/modules/dashboard/dailyFocusChart";
import { MonthlyFocusHeatmap } from "@/components/modules/dashboard/monthlyFocusHeatmap";
import { WeeklyFocusChart } from "@/components/modules/dashboard/weeklyFocusChart";
import React from "react";

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-4 space-y-12">
      {/* Header Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primaryColor mb-4">
          Focus Dashboard
        </h1>
        <p className="text-secondaryColor text-lg">
          Track and analyze your focus patterns with insightful charts.
        </p>
      </div>

      {/* Daily and Weekly Focus Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <DailyFocusChart />

        <WeeklyFocusChart />
      </div>

      {/* Monthly Focus Heatmap Section */}
      <MonthlyFocusHeatmap />
    </div>
  );
}

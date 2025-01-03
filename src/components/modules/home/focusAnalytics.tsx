"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const data = [
  { day: "Mon", focusTime: 120 },
  { day: "Tue", focusTime: 150 },
  { day: "Wed", focusTime: 180 },
  { day: "Thu", focusTime: 200 },
  { day: "Fri", focusTime: 160 },
  { day: "Sat", focusTime: 140 },
  { day: "Sun", focusTime: 100 },
];

export function FocusAnalytics() {
  const totalFocusTime = data.reduce((acc, day) => acc + day.focusTime, 0);
  const averageFocusTime = Math.round(totalFocusTime / data.length);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Focus Analytics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="text-sm font-medium">Total Focus Time This Week</div>
          <div className="text-2xl font-bold">{totalFocusTime} minutes</div>
        </div>
        <div className="space-y-2">
          <div className="text-sm font-medium">Average Daily Focus Time</div>
          <div className="text-2xl font-bold">{averageFocusTime} minutes</div>
        </div>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="day" />
              <YAxis />
              <Bar dataKey="focusTime" fill="#000000" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

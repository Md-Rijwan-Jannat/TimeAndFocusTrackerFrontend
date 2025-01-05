"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    name: "Week 1",
    total: 12,
  },
  {
    name: "Week 2",
    total: 15,
  },
  {
    name: "Week 3",
    total: 18,
  },
  {
    name: "Week 4",
    total: 22,
  },
];

export function WeeklyFocusChart() {
  const totalFocusTime = data.reduce((acc, day) => acc + day.total, 0);
  const averageFocusTime = Math.round(totalFocusTime / data.length);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 justify-between">
          Weekly Focus Hours
          <div className="flex items-center gap-2">
            <div className="text-sm font-medium">Average</div>
            <div className="text-sm font-semibold">
              {averageFocusTime} minutes
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data}>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}h`}
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="total"
              stroke="#8040BF"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

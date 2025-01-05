"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const data = [
  {
    name: "Mon",
    total: 4,
  },
  {
    name: "Tue",
    total: 3,
  },
  {
    name: "Wed",
    total: 2,
  },
  {
    name: "Thu",
    total: 5,
  },
  {
    name: "Fri",
    total: 4,
  },
  {
    name: "Sat",
    total: 3,
  },
  {
    name: "Sun",
    total: 3,
  },
];

export function DailyFocusChart() {
  const totalFocusTime = data.reduce((acc, day) => acc + day.total, 0);
  const averageFocusTime = Math.round(totalFocusTime / data.length);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 justify-between">
          Daily Focus Sessions
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
          <BarChart data={data}>
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
              tickFormatter={(value) => `${value}`}
            />
            <Bar dataKey="total" fill="#8040BF" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

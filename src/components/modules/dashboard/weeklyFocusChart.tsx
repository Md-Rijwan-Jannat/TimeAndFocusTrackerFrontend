"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetWeeklyMetricsQuery } from "@/redux/features/analytics/analyticsApi";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface WeeklyData {
  name: string;
  total: number;
}

interface WeeklyFocusMetricsData {
  data: {
    weeklyData: WeeklyData[];
  };
}

export function WeeklyFocusChart() {
  const { data: weeklyFocusMetricsData, isLoading } =
    useGetWeeklyMetricsQuery(undefined);
  console.log(weeklyFocusMetricsData);
  const data = weeklyFocusMetricsData?.data?.weeklyData;

  const totalFocusTime = weeklyFocusMetricsData?.data?.totalFocusTime;
  const sessionsCompleted = weeklyFocusMetricsData?.data?.sessionsCompleted;
  const averageFocusTime = Math.round(totalFocusTime / data?.length);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-start gap-2 justify-between">
          <p className="mt-2">Weekly Focus Sessions</p>
          <div className="flex flex-col items-start gap-2">
            <div className="flex items-center gap-2 bg-purple-500/5 rounded-md p-2 text-purple-500">
              <div className="text-sm font-medium">Average Focus Time</div>
              <div className="text-sm font-semibold">
                {averageFocusTime} minutes
              </div>
            </div>
            <div className="flex items-center gap-2 bg-green-500/5 rounded-md p-2 text-green-600">
              <div className="text-sm font-medium">Completed sessions</div>
              <div className="text-sm font-semibold">{sessionsCompleted}</div>
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

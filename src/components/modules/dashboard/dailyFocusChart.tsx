"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetDailyMetricsQuery } from "@/redux/features/analytics/analyticsApi";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface DayData {
  name: string;
  total: number;
}

interface DailyFocusMetricsData {
  data: {
    dayData: DayData[];
  };
}

export function DailyFocusChart() {
  const { data: dailyFocusMetricsData, isLoading } =
    useGetDailyMetricsQuery(undefined);

  console.log(dailyFocusMetricsData);
  const data = dailyFocusMetricsData?.data?.dayData;
  const totalFocusTime = dailyFocusMetricsData?.data?.totalFocusTime;
  const sessionsCompleted = dailyFocusMetricsData?.data?.sessionsCompleted;
  const averageFocusTime = Math.round(totalFocusTime / data?.length);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-start gap-2 justify-between">
          <p className="mt-2">Daily Focus Sessions</p>
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

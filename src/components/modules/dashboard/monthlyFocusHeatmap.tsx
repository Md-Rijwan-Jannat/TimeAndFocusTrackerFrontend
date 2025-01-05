"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetMonthlyMetricsQuery } from "@/redux/features/analytics/analyticsApi";
import {
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ScatterChart,
  Scatter,
  ZAxis,
  Rectangle,
} from "recharts";

export function MonthlyFocusHeatmap() {
  const { data: monthlyFocusMetricsData, isLoading } =
    useGetMonthlyMetricsQuery(undefined);
  console.log(monthlyFocusMetricsData);
  const data = monthlyFocusMetricsData?.data?.data;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Focus Heatmap</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <XAxis
              type="category"
              dataKey="day"
              interval={0}
              tick={{ fontSize: 12 }}
              tickLine={{ transform: "translate(0, -6)" }}
              tickFormatter={(value) =>
                ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][value]
              }
            />
            <YAxis
              type="category"
              dataKey="week"
              reversed
              interval={0}
              tick={{ fontSize: 12 }}
              tickLine={{ transform: "translate(0, -6)" }}
              tickFormatter={(value) => `Week ${value + 1}`}
            />
            <ZAxis type="number" dataKey="value" range={[0, 1]} />
            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-background p-2 shadow rounded">
                      <p>{`${data.dayName}, ${data.weekName}`}</p>
                      <p className="font-bold">{`Focus: ${data.value} min`}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Scatter
              data={data}
              shape={(props: any) => {
                const { cx, cy, value } = props;
                const opacity = value * 0.2 + 0.2; // Adjust opacity based on value
                return (
                  <Rectangle
                    x={cx - 17.5}
                    y={cy - 17.5}
                    width={35}
                    height={35}
                    fill={`rgba(128, 64, 191, ${opacity})`} // Adjust color with transparency
                    radius={[5, 5, 5, 5]} // Rounded corners
                  />
                );
              }}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

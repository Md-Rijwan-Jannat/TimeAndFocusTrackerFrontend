import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function Streaks() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Focus Streaks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Current Streak</span>
              <span className="text-sm font-medium">5 days</span>
            </div>
            <Progress value={50} />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Longest Streak</span>
              <span className="text-sm font-medium">14 days</span>
            </div>
            <Progress value={100} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

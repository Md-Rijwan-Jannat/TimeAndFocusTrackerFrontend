import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AccountStats() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Account Statistics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span>Total Focus Time:</span>
            <span className="font-semibold">120 hours</span>
          </div>
          <div className="flex justify-between">
            <span>Completed Sessions:</span>
            <span className="font-semibold">240</span>
          </div>
          <div className="flex justify-between">
            <span>Average Daily Focus:</span>
            <span className="font-semibold">2.5 hours</span>
          </div>
          <div className="flex justify-between">
            <span>Longest Streak:</span>
            <span className="font-semibold">14 days</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-1">
            <li>Early Bird (5 AM sessions)</li>
            <li>Night Owl (10 PM sessions)</li>
            <li>Focus Master (10 hours in a day)</li>
            <li>Consistency King (30-day streak)</li>
            <li>Productivity Pro (100 completed sessions)</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

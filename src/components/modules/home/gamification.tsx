import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Trophy, Award, Zap } from "lucide-react";

export function Gamification() {
  const currentStreak = 5;
  const longestStreak = 10;
  const badges = [
    { name: "Focus Novice", icon: Trophy, achieved: true },
    { name: "Consistency King", icon: Award, achieved: true },
    { name: "Productivity Master", icon: Zap, achieved: false },
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Achievements</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="text-sm font-medium">Current Streak</div>
          <Progress
            value={(currentStreak / longestStreak) * 100}
            className="w-full"
          />
          <div className="text-sm text-muted-foreground">
            {currentStreak} days (Longest: {longestStreak} days)
          </div>
        </div>
        <div className="space-y-2">
          <div className="text-sm font-medium">Badges</div>
          <div className="flex flex-wrap gap-2">
            {badges.map((badge) => (
              <Badge
                key={badge.name}
                variant={badge.achieved ? "default" : "outline"}
              >
                <badge.icon className="w-4 h-4 mr-1" />
                {badge.name}
              </Badge>
            ))}
          </div>
        </div>
        <div className="text-sm text-muted-foreground italic">
          Great job! You're on a 5-day streak!
        </div>
      </CardContent>
    </Card>
  );
}

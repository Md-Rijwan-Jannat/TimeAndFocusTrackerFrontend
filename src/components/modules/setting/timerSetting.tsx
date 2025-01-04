"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function TimerSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Timer Settings</CardTitle>
        <CardDescription>
          Customize your Pomodoro timer durations.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4">
          <Label htmlFor="focus-duration" className="w-40">
            Focus Duration (minutes)
          </Label>
          <Input
            id="focus-duration"
            type="number"
            defaultValue={25}
            className="w-20"
          />
        </div>
        <div className="flex items-center space-x-4">
          <Label htmlFor="break-duration" className="w-40">
            Break Duration (minutes)
          </Label>
          <Input
            id="break-duration"
            type="number"
            defaultValue={5}
            className="w-20"
          />
        </div>
        <div className="flex items-center space-x-4">
          <Label htmlFor="long-break-duration" className="w-40">
            Long Break Duration (minutes)
          </Label>
          <Input
            id="long-break-duration"
            type="number"
            defaultValue={15}
            className="w-20"
          />
        </div>
      </CardContent>
    </Card>
  );
}

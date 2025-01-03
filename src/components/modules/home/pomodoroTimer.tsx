"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Play, Pause, RotateCcw } from "lucide-react";

const FOCUS_TIME = 25 * 60;
const BREAK_TIME = 5 * 60;

export function PomodoroTimer() {
  const [time, setTime] = useState(FOCUS_TIME);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [sessions, setSessions] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      if (isBreak) {
        setTime(FOCUS_TIME);
        setIsBreak(false);
        setSessions((prevSessions) => prevSessions + 1);
      } else {
        setTime(BREAK_TIME);
        setIsBreak(true);
      }
      setIsActive(false);
      if (typeof window !== "undefined") {
        new Audio("/notification.mp3").play();
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, time, isBreak]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setTime(FOCUS_TIME);
    setIsActive(false);
    setIsBreak(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const progress = isBreak
    ? ((BREAK_TIME - time) / BREAK_TIME) * 100
    : ((FOCUS_TIME - time) / FOCUS_TIME) * 100;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Pomodoro Timer</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-6xl font-bold text-center">{formatTime(time)}</div>
        <Progress value={progress} className="w-full" />
        <div className="text-center text-lg font-semibold">
          {isBreak ? "Break Time" : "Focus Time"}
        </div>
        <div className="flex justify-center space-x-4">
          <Button onClick={toggleTimer} variant="outline" size="icon">
            {isActive ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </Button>
          <Button onClick={resetTimer} variant="outline" size="icon">
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
        <div className="text-center">
          Sessions completed: <span className="font-bold">{sessions}</span>
        </div>
      </CardContent>
    </Card>
  );
}

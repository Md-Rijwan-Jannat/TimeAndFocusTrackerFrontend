"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw, Coffee, Zap } from "lucide-react";
import {
  useCreateFocusSessionMutation,
  useGetActiveSessionQuery,
  useUpdateFocusSessionMutation,
  useUpdateFocusSessionStatusMutation,
  usePauseFocusSessionMutation,
  useStartFocusSessionMutation,
  useGetPausedSessionQuery,
} from "@/redux/features/focusSession/focusSessionApi";
import { useToast } from "@/components/hooks/use-toast";
import DigitalWatch from "./digitalWatch";

const INITIAL_FOCUS_TIME = 25;
const INITIAL_BREAK_TIME = 5;

export function PomodoroTimer() {
  const [showTimer, setShowTimer] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [showPauseDialog, setShowPauseDialog] = useState(false);
  const [customFocusTime, setCustomFocusTime] = useState(INITIAL_FOCUS_TIME);
  const [customBreakTime, setCustomBreakTime] = useState(INITIAL_BREAK_TIME);

  const { toast } = useToast();

  const { data: activeSessionData, isLoading: isLoadingActiveSession } =
    useGetActiveSessionQuery(undefined);
  const { data: pausedSessionData, isLoading: isLoadingPausedSession } =
    useGetPausedSessionQuery(undefined);
  const [createFocusSession] = useCreateFocusSessionMutation();
  const [updateFocusSession] = useUpdateFocusSessionMutation();
  const [updateFocusSessionStatus] = useUpdateFocusSessionStatusMutation();
  const [pauseFocusSession] = usePauseFocusSessionMutation();
  const [startFocusSession] = useStartFocusSessionMutation();

  const activeSession = activeSessionData?.data;
  const pausedSession = pausedSessionData?.data;
  const currentSession = activeSession || pausedSession;

  const isActive = currentSession?.status === "Active";

  const elapsedTime = currentSession
    ? Math.floor(
        (Date.now() - new Date(currentSession.startedAt).getTime()) / 1000
      ) - currentSession.totalPausedTime
    : 0;

  const time = currentSession
    ? (isBreak
        ? currentSession.breakDuration * 60
        : currentSession.focusDuration * 60) - elapsedTime
    : customFocusTime * 60;

  useEffect(() => {
    if (currentSession) {
      setShowTimer(true);
      setCustomFocusTime(currentSession.focusDuration);
      setCustomBreakTime(currentSession.breakDuration);
    }
  }, [currentSession]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        // Update UI only
      }, 1000);
    } else if (time <= 0) {
      handleSessionEnd();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, time, isBreak]);

  const handleSessionEnd = async () => {
    if (currentSession) {
      await updateFocusSessionStatus({
        id: currentSession.id,
        status: "Completed",
      });
      if (isBreak) {
        setIsBreak(false);
        await createFocusSession({
          focusDuration: customFocusTime,
          breakDuration: customBreakTime,
        });
      } else {
        setIsBreak(true);
        await createFocusSession({
          focusDuration: customFocusTime,
          breakDuration: customBreakTime,
        });
      }
      if (typeof window !== "undefined") {
        new Audio("/notification.mp3").play();
      }
      toast({
        title: isBreak ? "Break time over!" : "Focus session completed!",
        description: isBreak
          ? "Time to focus again!"
          : "Take a short break now.",
      });
    }
  };

  const toggleTimer = async () => {
    if (isActive) {
      setShowPauseDialog(true);
    } else {
      if (currentSession?.status === "Paused") {
        await updateFocusSessionStatus({
          id: currentSession.id,
          status: "Active",
        });
        await startFocusSession(currentSession.id);
      } else if (currentSession?.status === "Active") {
        await startFocusSession(currentSession.id);
      } else {
        const newSession = await createFocusSession({
          focusDuration: customFocusTime,
          breakDuration: customBreakTime,
        });
        await startFocusSession(newSession.data.id);
        setShowTimer(true);
      }
    }
  };

  const handlePause = async () => {
    if (currentSession) {
      await pauseFocusSession(currentSession.userId);
      await updateFocusSessionStatus({
        id: currentSession.id,
        status: "Paused",
      });
    }
    setShowPauseDialog(false);
  };

  const handleReset = () => {
    setShowResetDialog(true);
  };

  const confirmReset = async () => {
    if (currentSession) {
      await updateFocusSessionStatus({
        id: currentSession.id,
        status: "Cancelled",
      });
    }
    setIsBreak(false);
    setShowTimer(false);
    setShowResetDialog(false);
  };

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return hours > 0
      ? `${hours}:${minutes.toString().padStart(2, "0")}:${remainingSeconds
          .toString()
          .padStart(2, "0")}`
      : `${minutes.toString().padStart(2, "0")}:${remainingSeconds
          .toString()
          .padStart(2, "0")}`;
  };

  const percentage = isBreak
    ? ((currentSession?.breakDuration * 60 - time) /
        (currentSession?.breakDuration * 60)) *
      100
    : ((currentSession?.focusDuration * 60 - time) /
        (currentSession?.focusDuration * 60)) *
      100;

  const getMotivationalMessage = () => {
    if (isBreak) {
      return "Relax and recharge. You've earned it!";
    } else if (percentage < 25) {
      return "Great start! Stay focused and conquer your goals.";
    } else if (percentage < 50) {
      return "You're making progress! Keep up the great work.";
    } else if (percentage < 75) {
      return "Over halfway there! Your dedication is impressive.";
    } else {
      return "Almost done! Push through and finish strong.";
    }
  };

  if (isLoadingActiveSession || isLoadingPausedSession) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg overflow-hidden rounded-xl">
      <CardHeader className="p-6">
        <CardTitle className="text-3xl font-bold text-center flex justify-between items-center">
          {showTimer
            ? isBreak
              ? "Recharge Time"
              : "Focus Session"
            : "Pomodoro Focus Timer"}
          <DigitalWatch />
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key="motivationalMessage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full mx-auto mb-6"
          >
            <div className="text-sm text-center bg-green-500/5 rounded-md p-2 text-green-600 w-full">
              {getMotivationalMessage()}
            </div>
          </motion.div>
          <motion.div
            key="timer"
            className="space-y-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-64 h-64 mx-auto relative">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#e0e0e0"
                  strokeWidth="5"
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke={isBreak ? "#10B981" : "#8040BF"}
                  strokeWidth="5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: percentage / 100 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  style={{
                    rotate: -90,
                    transformOrigin: "center",
                  }}
                />
              </svg>
              <div className="flex items-center justify-center inset-0">
                <span className="text-xl font-medium">{formatTime(time)}</span>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-4">
              <Button
                variant="default"
                onClick={toggleTimer}
                className="px-6 py-3"
              >
                {isActive ? (
                  <Pause className="mr-2" />
                ) : isBreak ? (
                  <Play className="mr-2" />
                ) : (
                  <Play className="mr-2" />
                )}
                {isActive ? "Pause" : "Start"}
              </Button>
              <Button
                variant="secondary"
                onClick={handleReset}
                className="px-6 py-3"
              >
                <RotateCcw className="mr-2" />
                Reset
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}

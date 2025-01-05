"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUser } from "@/redux/features/auth/authSlice";
import { useGetAllUserRewardsQuery } from "@/redux/features/rewards/rewardsApi";
import { useAppSelector } from "@/redux/hook";

export function AccountStats() {
  const user = useAppSelector(getUser);
  const { data, isLoading, isError } = useGetAllUserRewardsQuery(user?.id || 0);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading rewards data.</div>;
  }

  const rewards = data?.data || [];

  console.log(data, "data==>");

  return (
    <div className="space-y-4">
      {/* Account Statistics */}
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

      {/* Achievements Section */}
      <Card>
        <CardHeader>
          <CardTitle>Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          {rewards.length > 0 ? (
            <ul className="list-disc pl-5 space-y-1">
              {rewards.slice(0, 7).map((reward: any) => (
                <li key={reward.id}>
                  <span className="font-semibold">{reward.rewardType}:</span>{" "}
                  {reward.details}
                </li>
              ))}
            </ul>
          ) : (
            <p>No achievements available.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

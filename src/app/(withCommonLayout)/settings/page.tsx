import { NotificationSettings } from "@/components/modules/setting/notificationSetting";
import { ThemeSettings } from "@/components/modules/setting/themeSetting";
import { TimerSettings } from "@/components/modules/setting/timerSetting";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  return (
    <div className="container p-4 mx-auto">
      <h1 className="text-3xl font-bold mb-4">Settings</h1>
      <Separator className="my-6" />
      <div className="space-y-8">
        <NotificationSettings />
        <TimerSettings />
        <ThemeSettings />
      </div>
    </div>
  );
}

import { AccountStats } from "@/components/modules/profile/accountStats";
import { ProfileForm } from "@/components/modules/profile/profileForm";
import { Separator } from "@/components/ui/separator";

export default function ProfilePage() {
  return (
    <div className="container p-4 mx-auto">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <Separator className="my-6" />
      <div className="grid gap-8 md:grid-cols-2">
        <ProfileForm />
        <AccountStats />
      </div>
    </div>
  );
}

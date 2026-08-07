import ProfileForm from "@/components/dash/forms/ProfileForm";
import { getCurrentUser } from "@/lib/current-user";

export default async function ProfilePage() {
  const user = await getCurrentUser();
  return (
    <>
      <div className="mt-2 mb-4">
        <h1 className="title1 text-light">Your Profile</h1>
      </div>
      <ProfileForm
        fname={user?.fname ?? ""}
        lname={user?.lname ?? ""}
        email={user?.email ?? ""}
        phone={user?.phone ?? ""}
        address={user?.address ?? ""}
      />
    </>
  );
}

import { NextPage } from "next";
import Link from "next/link";

const ProfilePage: NextPage = () => {
  return (
    <>
      <Link href="/">
        <div>Home</div>
      </Link>
      <Link href="/profile">
        <div>Profile</div>
      </Link>

      <Link href="/settings">
        <div>Settings</div>
      </Link>
    </>
  );
};

export default ProfilePage;

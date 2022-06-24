import { NextPage } from "next";
import Link from "next/link";
import Rightbar from "../components/Rightbar";
import Sidebar from "../components/Sidebar";
import TweetInFeed from "../components/TweetInFeed";
import { defaultImgs } from "../defaultImages";
import { useMoralis } from "react-moralis";
import { useEffect } from "react";

const ProfilePage: NextPage = () => {
  const { user } = useMoralis();

  return (
    <div className="page">
      <div className="sideBar">
        <Sidebar />
      </div>
      <div className="mainWindow">
        <div className="pageIdentify">Profile</div>
        <img
          className="profileBanner"
          src={
            user?.attributes.banner ? user?.attributes.banner : defaultImgs[1]
          }
        />
        <div className="pfpContainer">
          <img
            className="profilePFP"
            src={user?.attributes.pfp ? user?.attributes.pfp : defaultImgs[0]}
          />
          <div className="profileName">
            {user?.attributes.username.slice(0, 6)}
          </div>
          <div className="profileWallet">{`${user?.attributes.ethAddress.slice(
            0,
            4
          )}...
            ${user?.attributes.ethAddress.slice(38)}`}</div>
          <Link href="/settings">
            <div className="profileEdit">Edit profile</div>
          </Link>
          <div className="profileBio">{user?.attributes.bio}</div>
          <div className="profileTabs">
            <div className="profileTab">Your Tweets</div>
          </div>
        </div>
        <TweetInFeed profile={true} />
      </div>
      <div className="rightBar">
        <Rightbar />
      </div>
    </div>
  );
};

export default ProfilePage;

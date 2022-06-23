import { NextPage } from "next";
import Link from "next/link";
import Rightbar from "../components/Rightbar";
import Sidebar from "../components/Sidebar";
import TweetInFeed from "../components/TweetInFeed";
import { defaultImgs } from "../defaultImages";

const ProfilePage: NextPage = () => {
  return (
    <div className="page">
      <div className="sideBar">
        <Sidebar />
      </div>
      <div className="mainWindow">
        <div className="pageIdentify">Profile</div>
        <img className="profileBanner" src={defaultImgs[1]}></img>
        <div className="pfpContainer">
          <img className="profilePFP" src={defaultImgs[0]}></img>
          <div className="profileName">Lala</div>
          <div className="profileWallet">{`0x432423423`}</div>
          <Link href="/settings">
            <div className="profileEdit">Edit profile</div>
          </Link>
          <div className="profileBio">Hey crazy</div>
          <div className="profileTabs">
            <div className="profileTab">Your Tweets</div>
          </div>
        </div>
        <TweetInFeed />
      </div>
      <div className="rightBar">
        <Rightbar />
      </div>
    </div>
  );
};

export default ProfilePage;

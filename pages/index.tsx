import { NextPage } from "next";
import { TextArea } from "web3uikit";
import Rightbar from "../components/Rightbar";
import Sidebar from "../components/Sidebar";
import { defaultImgs } from "../defaultImages";

const HomePage: NextPage = () => {
  return (
    <>
      <div className="page">
        <div className="sideBar">
          <Sidebar />
        </div>
        <div className="mainWindow">
          <div className="mainContent">
            <div className="profileTweet">
              <img src={defaultImgs[0]} className="profilePic" />
              <div className="tweetBox">
                <TextArea label="" name="tweetTxtArea" width="95%" />
              </div>
            </div>
          </div>
        </div>
        <div className="rightBar">
          <Rightbar />
        </div>
      </div>
    </>
  );
};

export default HomePage;

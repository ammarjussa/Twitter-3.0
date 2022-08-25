import { NextPage } from "next";
import { TextArea, Icon, ConnectButton } from "web3uikit";
import Rightbar from "../components/Rightbar";
import Sidebar from "../components/Sidebar";
import TweetInFeed from "../components/TweetInFeed";
import { defaultImgs } from "../defaultImages";
import { useMoralis } from "react-moralis";
import { useRef } from "react";
import { useTweet } from "../providers/TweetProvider";

const HomePage: NextPage = () => {
  const { isAuthenticated, Moralis } = useMoralis();

  const inputFile: any = useRef();

  const {
    user,
    selectedFile,
    setSelectedFile,
    setTheFile,
    setTweet,
    saveTweet,
    maticTweet,
  } = useTweet();

  const onImageClick = () => {
    inputFile.current.click();
  };

  const changeHandler = (event) => {
    const img = event.target.files[0];
    setTheFile(img);
    setSelectedFile(URL.createObjectURL(img));
  };

  return (
    <>
      {isAuthenticated ? (
        <div className="page">
          <div className="sideBar" id="side">
            <Sidebar />
            <div
              className="logout"
              onClick={() => {
                Moralis.User.logOut().then(() => {
                  window.location.reload();
                });
              }}
            >
              Logout
            </div>
          </div>
          <div className="mainWindow">
            <div className="pageIdentify">Home</div>
            <div className="mainContent">
              <div className="profileTweet">
                <img
                  src={
                    user.attributes.pfp ? user.attributes.pfp : defaultImgs[0]
                  }
                  className="profilePic"
                />
                <div className="tweetBox">
                  <TextArea
                    name="tweetTxtArea"
                    placeholder="What's Happening?"
                    width="95%"
                    onChange={(e) => setTweet(e.target.value)}
                  />
                  {selectedFile ? (
                    <img src={selectedFile} className="tweetImg" />
                  ) : null}

                  <div className="imgOrTweet">
                    <div className="imgDiv" onClick={onImageClick}>
                      <input
                        type="file"
                        name="file"
                        ref={inputFile}
                        onChange={changeHandler}
                        style={{ display: "none" }}
                      />
                      <Icon fill="#1da1f2" size={20} svg="image" />
                    </div>
                    <div className="tweetOptions">
                      <div className="tweet" onClick={saveTweet}>
                        Tweet
                      </div>
                      <div
                        className="tweet"
                        style={{ backgroundColor: "#8247e5" }}
                        onClick={maticTweet}
                      >
                        <Icon fill="#fff" size={20} svg="matic" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <TweetInFeed profile={false} />
          </div>
          <div className="rightBar">
            <Rightbar />
          </div>
        </div>
      ) : (
        <div className="loginPage">
          <Icon fill="#fff" size={40} svg="twitter" />
          <ConnectButton />
        </div>
      )}
    </>
  );
};

export default HomePage;

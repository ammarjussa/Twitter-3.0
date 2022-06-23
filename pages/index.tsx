import { NextPage } from "next";
import { useState, useRef } from "react";
import { TextArea, Icon } from "web3uikit";
import Rightbar from "../components/Rightbar";
import Sidebar from "../components/Sidebar";
import TweetInFeed from "../components/TweetInFeed";
import { defaultImgs } from "../defaultImages";

const HomePage: NextPage = () => {
  const inputFile: any = useRef();
  const [selectedFile, setSelectedFile] = useState<any>();

  const onImageClick = () => {
    inputFile.current.click();
  };

  const changeHandler = (event) => {
    const img = event.target.files[0];
    setSelectedFile(URL.createObjectURL(img));
  };

  return (
    <>
      <div className="page">
        <div className="sideBar">
          <Sidebar />
        </div>
        <div className="mainWindow">
          <div className="pageIdentify">Home</div>
          <div className="mainContent">
            <div className="profileTweet">
              <img src={defaultImgs[0]} className="profilePic" />
              <div className="tweetBox">
                <TextArea
                  name="tweetTxtArea"
                  placeholder="What's Happening?"
                  width="95%"
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
                    <div className="tweet">Tweet</div>
                    <div
                      className="tweet"
                      style={{ backgroundColor: "#8247e5" }}
                    >
                      <Icon fill="#fff" size={20} svg="matic" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <TweetInFeed />
        </div>
        <div className="rightBar">
          <Rightbar />
        </div>
      </div>
    </>
  );
};

export default HomePage;

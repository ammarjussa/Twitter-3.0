import { NextPage } from "next";
import { useState, useRef } from "react";
import { TextArea, Icon, ConnectButton } from "web3uikit";
import Rightbar from "../components/Rightbar";
import Sidebar from "../components/Sidebar";
import TweetInFeed from "../components/TweetInFeed";
import { defaultImgs } from "../defaultImages";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";

const HomePage: NextPage = () => {
  const { isAuthenticated, Moralis, isInitialized } = useMoralis();
  const user = isInitialized ? Moralis.User.current() : null;
  const contractProcessor = useWeb3ExecuteFunction();

  const inputFile: any = useRef();
  const [selectedFile, setSelectedFile] = useState<any>();
  const [theFile, setTheFile] = useState();
  const [tweet, setTweet] = useState<string>();

  // MATIC TWEET FUNCTION
  async function maticTweet() {
    if (!tweet) return;

    let img;
    if (theFile) {
      const data: any = theFile;
      const file: any = new Moralis.File(data.name, data);
      await file.saveIPFS();
      img = file.ipfs();
    } else {
      img = "No Img";
    }

    let options = {
      contractAddress: "0x4851C6Fdb190ea1708eaA30F92247ef7D3F49391",
      functionName: "addTweet",
      abi: [
        {
          inputs: [
            {
              internalType: "string",
              name: "tweetTxt",
              type: "string",
            },
            {
              internalType: "string",
              name: "tweetImg",
              type: "string",
            },
          ],
          name: "addTweet",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
      ],
      params: {
        tweetTxt: tweet,
        tweetImg: img,
      },
      msgValue: Moralis.Units.ETH(1),
    };

    await contractProcessor.fetch({
      params: options,
      onSuccess: () => {
        saveTweet();
      },
      onError: (error: any) => {
        console.log(error.data.message);
      },
    });
  }

  // SAVE TWEET FUNCTION
  const saveTweet = async () => {
    if (!tweet) return;

    const Tweets = Moralis.Object.extend("Tweets");

    const newTweet = new Tweets();

    newTweet.set("tweetTxt", tweet);
    newTweet.set("tweeterPfp", user.attributes.pfp);
    newTweet.set("tweeterAcc", user.attributes.ethAddress);
    newTweet.set("tweeterUserName", user.attributes.username);

    if (theFile) {
      const data: any = theFile;
      const file: any = new Moralis.File(data.name, data);
      await file.saveIPFS();
      newTweet.set("tweetImg", file.ipfs());
    }

    await newTweet.save();
    window.location.reload();
  };

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
          <div className="sideBar">
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

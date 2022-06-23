import { NextPage } from "next";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Input } from "web3uikit";
import Rightbar from "../components/Rightbar";
import Sidebar from "../components/Sidebar";
import { defaultImgs } from "../defaultImages";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";

const SettingsPage: NextPage = () => {
  const [pfps, setPfps] = useState<any>([]);
  const [selectedPFP, setSelectedPFP] = useState();
  const inputFile = useRef(null);
  const [selectedFile, setSelectedFile] = useState(defaultImgs[1]);
  const [theFile, setTheFile] = useState();
  const [username, setUsername] = useState<string>();
  const [bio, setBio] = useState<string>();
  const { Moralis, isAuthenticated, account, isInitialized } = useMoralis();
  const Web3Api = useMoralisWeb3Api();

  const resolveLink = (url) => {
    if (!url || !url.includes("ipfs://")) return url;
    return url.replace("ipfs://", "https://gateway.ipfs.io/ipfs/");
  };

  useEffect(() => {
    const fetchNFTs = async () => {
      const options: any = {
        chain: "mumbai",
        address: account,
      };
      if (isInitialized) {
        const mumbaiNFTs = await Web3Api.account.getNFTs(options);
        const images = mumbaiNFTs.result.map((e) =>
          resolveLink(JSON.parse(e.metadata)?.image)
        );
        setPfps(images);
      }
    };

    fetchNFTs();
  }, [isAuthenticated, account, isInitialized]);

  const onBannerClick = () => {
    inputFile.current.click();
  };

  const changeHandler = (event) => {
    const img = event.target.files[0];
    setTheFile(img);
    setSelectedFile(URL.createObjectURL(img));
  };

  const saveEdits = async () => {
    const User = Moralis.Object.extend("_User");
    const query = new Moralis.Query(User);
    const myDetails = await query.first();

    if (bio) {
      myDetails.set("bio", bio);
    }

    if (selectedPFP) {
      myDetails.set("pfp", selectedPFP);
    }

    if (username) {
      myDetails.set("username", username);
    }

    if (theFile) {
      const data: any = theFile;
      const file: any = new Moralis.File(data.name, data);
      await file.saveIPFS();
      myDetails.set("banner", file.ipfs());
    }

    await myDetails.save();
    window.location.reload();
  };

  return (
    <div className="page">
      <div className="sideBar">
        <Sidebar />
      </div>
      <div className="mainWindow">
        <div className="pageIdentify">Settings</div>
        <div className="settingsPage">
          <Input
            label="Name"
            name="NameChange"
            width="100%"
            labelBgColor="#141d26"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <Input
            label="Bio"
            name="bioChange"
            width="100%"
            labelBgColor="#141d26"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />

          <div className="pfp">
            Profile Image (Your NFTs)
            <div className="pfpOptions">
              {pfps.map((e, i) => {
                return (
                  <img
                    src={e}
                    onClick={() => setSelectedPFP(pfps[i])}
                    className={
                      selectedPFP === e ? "pfpOptionSelected" : "pfpOption"
                    }
                  />
                );
              })}
            </div>
          </div>

          <div className="pfp">
            Profile Banner
            <div className="pfpOptions">
              <img
                src={selectedFile}
                className="banner"
                onClick={onBannerClick}
              />
              <input
                type="file"
                name="file"
                ref={inputFile}
                style={{ display: "none" }}
                onChange={changeHandler}
              />
            </div>
          </div>
          <div className="save" onClick={saveEdits}>
            Save
          </div>
        </div>
      </div>
      <div className="rightBar">
        <Rightbar />
      </div>
    </div>
  );
};

export default SettingsPage;

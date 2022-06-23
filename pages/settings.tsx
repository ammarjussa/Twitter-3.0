import { NextPage } from "next";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Input } from "web3uikit";
import Rightbar from "../components/Rightbar";
import Sidebar from "../components/Sidebar";
import { defaultImgs } from "../defaultImages";

const SettingsPage: NextPage = () => {
  const [pfps, setPfps] = useState<any>([
    "pfp1.png",
    "pfp2.png",
    "pfp3.png",
    "pfp4.png",
    "pfp5.png",
  ]);
  const [selectedPFP, setSelectedPFP] = useState();
  const inputFile = useRef(null);
  const [selectedFile, setSelectedFile] = useState(defaultImgs[1]);
  const [theFile, setTheFile] = useState();
  const [username, setUsername] = useState();
  const [bio, setBio] = useState();

  const onBannerClick = () => {
    inputFile.current.click();
  };

  const changeHandler = (event) => {
    const img = event.target.files[0];
    setTheFile(img);
    setSelectedFile(URL.createObjectURL(img));
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
          />

          <Input
            label="Bio"
            name="bioChange"
            width="100%"
            labelBgColor="#141d26"
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
          <div className="save">Save</div>
        </div>
      </div>
      <div className="rightBar">
        <Rightbar />
      </div>
    </div>
  );
};

export default SettingsPage;

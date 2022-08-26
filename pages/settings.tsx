import { NextPage } from "next";
import { useState, useRef, useEffect } from "react";
import { Input } from "web3uikit";
import Rightbar from "../components/Rightbar";
import Sidebar from "../components/Sidebar";
import { defaultImgs } from "../defaultImages";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";

const SettingsPage: NextPage = () => {
  const [profilePic, setProfilePic] = useState<any>([defaultImgs[0]]);
  const [profileFile, setProfileFile] = useState();
  const inputFile = useRef(null);
  const inputProfile = useRef(null);
  const [selectedFile, setSelectedFile] = useState(defaultImgs[1]);
  const [theFile, setTheFile] = useState();
  const [username, setUsername] = useState<string>();
  const [bio, setBio] = useState<string>();
  const { Moralis } = useMoralis();

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

    if (username) {
      myDetails.set("username", username);
    }

    if (theFile) {
      const data: any = theFile;
      const file: any = new Moralis.File(data.name, data);
      await file.saveIPFS();
      myDetails.set("banner", file.ipfs());
    }

    if (profileFile) {
      const data: any = profileFile;
      const file: any = new Moralis.File(data.name, data);
      await file.saveIPFS();
      myDetails.set("pfp", file.ipfs());
    }

    await myDetails.save();
    alert("Saved");
  };

  const onImageClick = () => {
    inputProfile.current.click();
  };

  const changeProfileHandler = (event) => {
    const img = event.target.files[0];
    setProfileFile(img);
    setProfilePic(URL.createObjectURL(img));
  };

  return (
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
            Profile Image
            <div className="pfpOptions">
              <input
                type="file"
                name="file"
                ref={inputProfile}
                onChange={changeProfileHandler}
                style={{ display: "none" }}
              />
              <img
                src={profilePic}
                className={"pfpOption"}
                onClick={onImageClick}
              />
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

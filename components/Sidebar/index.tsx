import { Icon } from "web3uikit";
import Link from "next/link";
import { useMoralis } from "react-moralis";
import { defaultImgs } from "../../defaultImages";

interface Props {}

const Sidebar: React.FC<Props> = () => {
  const { Moralis } = useMoralis();
  const user = Moralis.User.current();
  return (
    <>
      <div className="siderContent">
        <div className="menu">
          <div className="details">
            <Icon fill="#fff" size={33} svg="twitter" />
          </div>

          <Link href="/" className="link">
            <div className="menuItems">
              <Icon fill="#fff" size={33} svg="list" />
              Home
            </div>
          </Link>
          <Link href="/profile" className="link">
            <div className="menuItems">
              <Icon fill="#fff" size={33} svg="user" />
              Profile
            </div>
          </Link>
          <Link href="/settings" className="link">
            <div className="menuItems">
              <Icon fill="#fff" size={33} svg="cog" />
              Settings
            </div>
          </Link>
        </div>
        <div className="details">
          <img
            src={user.attributes.pfp ? user.attributes.pfp : defaultImgs[0]}
            className="profilePic"
          ></img>
          <div className="profile">
            <div className="who">{user.attributes.username.slice(0, 6)}</div>
            <div className="accWhen">
              {`${user.attributes.ethAddress.slice(
                0,
                4
              )}...${user.attributes.ethAddress.slice(38)}`}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

import { Icon } from "web3uikit";
import Link from "next/link";

interface Props {}

const Sidebar: React.FC<Props> = () => {
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
      </div>
    </>
  );
};

export default Sidebar;

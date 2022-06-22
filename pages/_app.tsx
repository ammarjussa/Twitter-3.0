import { AppProps } from "next/app";
import { NotificationProvider } from "web3uikit";
import { MoralisProvider } from "react-moralis";
import "../styles/globals.css";
import "../styles/Home.css";
import "../styles/Profile.css";
import "../styles/Setting.css";
import "../components/Sidebar/index.css";
import "../components/Rightbar/index.css";
import "../components/TweetInFeed/index.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // <MoralisProvider appId="xxxx" serverUrl="xxx">
    <NotificationProvider>
      <Component {...pageProps} />;
    </NotificationProvider>
    // </MoralisProvider>
  );
}

export default MyApp;

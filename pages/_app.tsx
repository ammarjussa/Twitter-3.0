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
    <MoralisProvider
      appId={process.env.NEXT_PUBLIC_APP_ID}
      serverUrl={process.env.NEXT_PUBLIC_DAPP_URL}
    >
      <NotificationProvider>
        <Component {...pageProps} />;
      </NotificationProvider>
    </MoralisProvider>
  );
}

export default MyApp;

import { MoralisProvider } from "react-moralis";
import "../styles/globals.css";
import "../styles/Home.css";
import "../styles/Profile.css";
import "../styles/Setting.css";
import "../components/Sidebar/index.css";
import "../components/Rightbar/index.css";
import "../components/TweetInFeed/index.css";
import { TweetProvider } from "../providers/TweetProvider";

function MyApp({ Component, pageProps }: any) {
  return (
    <MoralisProvider
      appId={process.env.NEXT_PUBLIC_APP_ID}
      serverUrl={process.env.NEXT_PUBLIC_DAPP_URL}
    >
      <TweetProvider>
        <Component {...pageProps} />
      </TweetProvider>
    </MoralisProvider>
  );
}

export default MyApp;

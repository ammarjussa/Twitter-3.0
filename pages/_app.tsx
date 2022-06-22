import { AppProps } from "next/app";
import { NotificationProvider } from "web3uikit";
import { MoralisProvider } from "react-moralis";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MoralisProvider appId="xxxx" serverUrl="xxx">
      <NotificationProvider>
        <Component {...pageProps} />;
      </NotificationProvider>
    </MoralisProvider>
  );
}

export default MyApp;

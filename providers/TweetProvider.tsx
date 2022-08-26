import { useContext, createContext, ReactNode, useState } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";

export const TweetContext = createContext(null);

interface Props {
  children: ReactNode;
}

export const TweetProvider: React.FC<Props> = ({ children }) => {
  const { Moralis, isInitialized } = useMoralis();
  const user = isInitialized ? Moralis.User.current() : null;
  const contractProcessor = useWeb3ExecuteFunction();
  const [selectedFile, setSelectedFile] = useState<any>();
  const [theFile, setTheFile] = useState();
  const [tweet, setTweet] = useState<string>();

  const saveTweet = async () => {
    if (!tweet) return;

    const Tweets = Moralis.Object.extend("Tweets");
    const newTweet = new Tweets();

    newTweet.set("tweetTxt", tweet);
    newTweet.set("tweeterPfp", user.attributes.pfp);
    newTweet.set("tweeterAcc", user.attributes.ethAddress);
    newTweet.set("tweeterUserName", user.attributes.username);
    newTweet.set("tweetLikes", 0);
    newTweet.set("tweetLikers", []);
    newTweet.set("tweetDonations", 0);
    newTweet.set("tweetDoners", []);

    if (theFile) {
      const data: any = theFile;
      const file: any = new Moralis.File(data.name, data);
      await file.saveIPFS();
      newTweet.set("tweetImg", file.ipfs());
    }

    setTweet("");
    setTheFile(null);
    await newTweet.save();
  };

  const maticTweet = async () => {
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
  };

  const likeTweet = async (data: any, id: string, user: any) => {
    const mytweet = data.filter((d) => d.id === id)[0];

    if (mytweet.attributes.tweetLikers.includes(user.attributes.ethAddress)) {
      mytweet.set("tweetLikes", mytweet.attributes.tweetLikes - 1);
      mytweet.set(
        "tweetLikers",
        mytweet.attributes.tweetLikers.filter(
          (name) => name !== user.attributes.ethAddress
        )
      );
    } else {
      mytweet.set("tweetLikes", mytweet.attributes.tweetLikes + 1);
      mytweet.set("tweetLikers", [
        ...mytweet.attributes.tweetLikers,
        user.attributes.ethAddress,
      ]);
    }
    await mytweet.save();
  };

  const storeDonation = async (data, id, user, amount) => {
    const mytweet = data.filter((d) => d.id === id)[0];

    if (mytweet.attributes.tweetDoners.includes(user.attributes.ethAddress)) {
      mytweet.set(
        "tweetDonations",
        mytweet.attributes.tweetDonations + parseFloat(amount)
      );
    } else {
      mytweet.set(
        "tweetDonations",
        mytweet.attributes.tweetDonations + parseFloat(amount)
      );
      mytweet.set("tweetDoners", [
        ...mytweet.attributes.tweetDoners,
        user.attributes.ethAddress,
      ]);
    }
    await mytweet.save();
  };

  const tweetDonation = async (data, id, user, tweeter, amount) => {
    console.log(amount);
    let options = {
      contractAddress: "0xE5f2A565Ee0Aa9836B4c80a07C8b32aAd7978e22",
      functionName: "deposit",
      abi: [
        {
          inputs: [
            {
              internalType: "address",
              name: "accepter",
              type: "address",
            },
          ],
          name: "deposit",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
      ],
      params: {
        accepter: tweeter,
      },
      msgValue: Moralis.Units.ETH(amount),
    };

    await contractProcessor.fetch({
      params: options,
      onSuccess: () => {
        storeDonation(data, id, user, amount);
      },
      onError: (error: any) => {
        console.log(error.data.message);
      },
    });
  };

  return (
    <TweetContext.Provider
      value={{
        selectedFile,
        user,
        setSelectedFile,
        theFile,
        setTheFile,
        tweet,
        setTweet,
        saveTweet,
        maticTweet,
        likeTweet,
        tweetDonation,
      }}
    >
      {children}
    </TweetContext.Provider>
  );
};

export function useTweet() {
  const context = useContext(TweetContext);
  if (context === undefined) {
    throw new Error("useContactsContext must be used within Contacts Provider");
  }
  return context;
}

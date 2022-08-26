import { Icon } from "web3uikit";
import { defaultImgs } from "../../defaultImages";
import { useMoralis, useMoralisQuery } from "react-moralis";
import { AiOutlineHeart } from "react-icons/ai";
import { AiOutlineRetweet } from "react-icons/ai";
import { useTweet } from "../../providers/TweetProvider";
import { AiFillHeart } from "react-icons/ai";

interface Props {
  profile: boolean;
}

const TweetInFeed: React.FC<Props> = ({ profile }) => {
  const { Moralis, account, isInitialized } = useMoralis();
  const user = isInitialized ? Moralis.User.current() : null;

  const { likeTweet, tweetDonation } = useTweet();

  const query = profile
    ? (query) => query.equalTo("tweeterAcc", account)
    : (query) => query.ascending("createdAt");

  const { data } = useMoralisQuery("Tweets", query, [], {
    live: true,
  });

  const getAmount = (data, id, tweeter, user) => {
    let amount = prompt("Input amount to donate");
    if (amount !== null || amount !== undefined) {
      tweetDonation(data, id, user, tweeter, amount);
    }
  };

  return (
    <>
      {data
        ?.map((e, i) => {
          return (
            <>
              <div className="feedTweet" key={i}>
                <img
                  src={
                    e.attributes.tweeterPfp
                      ? e.attributes.tweeterPfp
                      : defaultImgs[0]
                  }
                  className="profilePic"
                />
                <div className="completeTweet">
                  <div className="who">
                    {e.attributes.tweeterUserName.slice(0, 6)}
                    <div className="accWhen">
                      {`${e.attributes.tweeterAcc.slice(
                        0,
                        4
                      )}...${e.attributes.tweeterAcc.slice(38)} · 
                        ${e.attributes.createdAt.toLocaleString("en-us", {
                          month: "short",
                        })}  
                        ${e.attributes.createdAt.toLocaleString("en-us", {
                          day: "numeric",
                        })}
                        `}
                    </div>
                  </div>
                  <div className="tweetContent">
                    {e.attributes.tweetTxt}
                    {e.attributes.tweetImg && (
                      <img src={e.attributes.tweetImg} className="tweetImg" />
                    )}
                  </div>
                  <div className="interactions">
                    <div className="interactionNums">
                      <Icon fill="#3f3f3f" size={20} svg="messageCircle" />
                    </div>
                    <div className="interactionNums">
                      <AiOutlineRetweet fill="#3f3f3f" size={20} />
                    </div>
                    <div
                      className="interactionNums"
                      onClick={() => likeTweet(data, e.id, user)}
                    >
                      {e.attributes.tweetLikers.includes(
                        user.attributes.ethAddress
                      ) ? (
                        <AiFillHeart fill="red" size={20} />
                      ) : (
                        <AiOutlineHeart fill="#3f3f3f" size={20} />
                      )}
                      <p>
                        {e.attributes.tweetLikes === 0
                          ? null
                          : e.attributes.tweetLikes}
                      </p>
                    </div>
                    <div
                      className="interactionNums"
                      onClick={() =>
                        getAmount(data, e.id, e.attributes.tweeterAcc, user)
                      }
                    >
                      <Icon fill="#3f3f3f" size={20} svg="matic" />
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })
        .reverse()}
    </>
  );
};

export default TweetInFeed;

// [
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "accepter",
// 				"type": "address"
// 			}
// 		],
// 		"name": "deposit",
// 		"outputs": [],
// 		"stateMutability": "payable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "constructor"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "doner",
// 		"outputs": [
// 			{
// 				"internalType": "address",
// 				"name": "",
// 				"type": "address"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	}
// ]

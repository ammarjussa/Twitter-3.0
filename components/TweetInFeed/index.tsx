import { Icon } from "web3uikit";
import { defaultImgs } from "../../defaultImages";
import { useMoralis, useMoralisQuery } from "react-moralis";
import { AiOutlineHeart } from "react-icons/ai";
import { AiOutlineRetweet } from "react-icons/ai";
// import { AiFillHeart } from "react-icons/ai";

interface Props {
  profile: boolean;
}

const TweetInFeed: React.FC<Props> = ({ profile }) => {
  const { account } = useMoralis();

  const query = profile
    ? (query) => query.equalTo("tweeterAcc", account)
    : (query) => query.ascending("createdAt");

  const { data } = useMoralisQuery("Tweets", query, [], {
    live: true,
  });

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
                ></img>
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
                      <AiOutlineHeart fill="#3f3f3f" size={20} />
                    </div>
                    <div className="interactionNums">
                      <Icon fill="#3f3f3f" size={20} svg="matic" />
                    </div>
                    <div className="interactionNums">
                      <AiOutlineRetweet fill="#3f3f3f" size={20} />
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

import { Icon } from "web3uikit";
import { defaultImgs } from "../../defaultImages";

interface Props {}

const TweetInFeed: React.FC<Props> = () => {
  return (
    <div className="feedTweet">
      <img src={defaultImgs[0]} className="profilePic" />
      <div className="completeTweet">
        <div className="who">
          Hello
          <div className="accWhen">0x42....9Y664 . 1hr</div>
        </div>
        <div className="tweetContent">
          Nice Day of golfing
          <img src="golf.png" className="tweetImg" />
        </div>
        <div className="interactions">
          <div className="interactionNums">
            <Icon fill="#3f3f3f" size={20} svg="messageCircle" />
          </div>
          <div className="interactionNums">
            <Icon fill="#3f3f3f" size={20} svg="star" />
          </div>
          <div className="interactionNums">
            <Icon fill="#3f3f3f" size={20} svg="matic" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TweetInFeed;

import { Input } from "web3uikit";

interface Props {}

const Rightbar: React.FC<Props> = () => {
  const trends = [
    {
      img: "spaceshooter.jpeg",
      text: "Learn how to build a Web3 FPS game using unity...",
      link: "https://moralis.io/moralis-projects-learn-to-build-a-web3-space-fps-game/",
    },
    {
      img: "netflix.jpeg",
      text: "The fisrt Moralis Project! Let's Netflix and chill...",
      link: "https://moralis.io/moralis-projects-learn-to-build-a-web3-netflix-clone/",
    },
    {
      img: "academy.png",
      text: "Master DeFi in 2022. Start  at the Moralis Academy...",
      link: "https://academy.moralis.io/courses/defi-101",
    },
    {
      img: "js.png",
      text: "Become a Web3 Developer with just simple JS...",
      link: "https://academy.moralis.io/all-courses",
    },
    {
      img: "youtube.png",
      text: "Best youtube channel to learn about Web3...",
      link: "https://www.youtube.com/channel/UCgWS9Q3P5AxCWyQLT2kQhBw",
    },
  ];
  return (
    <>
      <div className="rightbarContent">
        <Input
          label="Search Twitter"
          name="Search Twitter"
          prefixIcon="search"
          labelBgColor="#141d26"
        ></Input>

        <div className="trends">
          News For You
          {trends.map((e) => {
            return (
              <>
                <div className="trend" onClick={() => window.open(e.link)}>
                  <img src={e.img as any} className="trendImg"></img>
                  <div className="trendText">{e.text}</div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Rightbar;

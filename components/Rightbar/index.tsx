import { Input } from "web3uikit";

interface Props {}

const Rightbar: React.FC<Props> = () => {
  const trends = [
    {
      img: "portfolio-web.png",
      text: "Check out my portfolio site",
      link: "https://ammarjussa.com/",
    },
    {
      img: "facebook-web.png",
      text: "Checkout this facebook clone using Solana",
      link: "https://main--facebook-solana-web3.netlify.app/",
    },
  ];
  return (
    <>
      <div className="rightbarContent">
        <Input
          label="Search Twitter"
          name="Search Twitter"
          prefixIcon="search"
          labelBgColor="#000000"
        />

        <div className="trends">
          News For You
          {trends.map((e, i) => {
            return (
              <div key={i}>
                <div className="trend" onClick={() => window.open(e.link)}>
                  <img src={e.img as any} className="trendImg"></img>
                  <div className="trendText">{e.text}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Rightbar;

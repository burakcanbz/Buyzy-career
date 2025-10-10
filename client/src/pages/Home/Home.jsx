import React from "react";
import homeImg from "../../assets/home.jpg";

const Home = () => {
  return (
    <div>
      <img
        src={homeImg}
        alt=""
        style={{
          width: "100vw",
        }}
      />
    </div>
  );
};

export default Home;

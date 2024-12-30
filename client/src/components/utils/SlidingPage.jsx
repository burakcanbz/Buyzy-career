import React from "react";

const SlidingPage = ({ animationClassName, children }) => {
  return (
    <div className={animationClassName}>
      {children}
    </div>
  );
};

export default SlidingPage;

import React from "react";
import DashboardHeader from "../../components/DashboardHeader";
import Tools from "../../components/Tools";
import PositionList from "../../components/PositionList";

const OpenPositions = () => {
  return (
    <div style={{ backgroundColor: "white" }}>
      <DashboardHeader />
      <Tools />
      <PositionList />
    </div>
  );
};

export default OpenPositions;

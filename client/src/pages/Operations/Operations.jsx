import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Tab, Tabs } from "react-bootstrap";
import CreatePositionTab from "../../components/CreatePositionTab";
import PositionForm from "../../components/general/PositionForm";

const Operations = () => {
  const [active, setActive] = useState("create");
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo.role !== "Owner") {
      navigate("/");
    }
  }, [userInfo, navigate]);
  
  if (userInfo.role !== "Owner") {
    return null;
  }

  return (
    <div className="application-tabs-container">
      <Container>
        <Tabs
          activeKey={active}
          defaultActiveKey="create"
          onSelect={(key) => setActive(key)}
          id="fill-tab-example"
          className="custom-tabs mb-5"
          fill
        >
          <Tab
            eventKey="create"
            title={
              <span className="fw-bold text-primary">Create Position</span>
            }
          >
          {active === "create" && <CreatePositionTab /> }
          </Tab>
          <Tab
            eventKey="update"
            title={
              <span className="fw-bold text-success">Update Position</span>
            }
          >
          {active === "update" && <PositionForm name={"Update"}/>}
          </Tab>
          <Tab
            eventKey="delete"
            title={<span className="fw-bold text-danger">Delete Position</span>}
          >
            {active === "delete" && <PositionForm name={"Delete"}/>}
          </Tab>
        </Tabs>
      </Container>
    </div>
  );
};

export default Operations;

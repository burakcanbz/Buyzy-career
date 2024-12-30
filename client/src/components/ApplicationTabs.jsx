import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import TabContent from "./TabContent";


const ApplicationTabs = ({ role, division, userInfo }) => {
  
    return (
      <div className="application-tabs-container">
        <Tabs defaultActiveKey="role" id="fill-tab-example" className="custom-tabs mb-5" fill>
          <Tab eventKey="role" title={<span className="fw-bold">Role</span>}>
            <TabContent
              items={role}
              name="title"
              userInfo={userInfo}
            />
          </Tab>
          <Tab eventKey="division" title={<span className="fw-bold">Division</span>}>
            <TabContent
              items={division}
              name="division"
              userInfo={userInfo}
            />
          </Tab>
        </Tabs>
      </div>
    );
  };

export default ApplicationTabs;

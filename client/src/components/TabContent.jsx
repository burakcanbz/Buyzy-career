import React from "react";
import { useLocation } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import ApplicationCard from "./ApplicationCard";
import Message from "./utils/Message";

const TabContent = ({ items, name, userInfo }) => {
  const location = useLocation();

  return (
    <div className="tab-content">
      <Row className="d-flex justify-content-center">
        <Col md={8}>
          {items?.length > 0 ? (
            items.map((item, index) => (
              <ApplicationCard
                key={index}
                index={index}
                item={item}
                pathname={location.pathname}
                userInfo={userInfo}
                name={name}
              />
            ))
          ) : (
            <Message variant="info">No applications found.</Message>
          )}
        </Col>
        
      </Row>
    </div>
  );
};

export default TabContent;

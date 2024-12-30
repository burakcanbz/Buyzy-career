import React from "react";
import { Col, Image, Row } from "react-bootstrap";
import notFound from "../../assets/notfound.png";
import { useNavigate } from "react-router-dom";
import GradientButton from "../../styledComponents/gradientButton";

const NotFound = () => {
    const navigate = useNavigate();

  return (
    <div className="p-5 bg-white h-screen" style={{ width: "100vw" }}>
      <Row className="d-flex justify-content-between align-items-center">
        <Col md={6} className="d-flex justify-content-end align-items-center">
          <Image src={notFound} />
        </Col>
        <Col md={6} className="d-flex justify-content-start">
          <div className="mt-5">
            <span className="fs-2 fw-bold">404 PAGE NOT FOUND</span>
            <br />
            <br />
            <span className="fs-5">
              The link is broken or the page has been moved.
            </span>
            <br />
            <br />
            <GradientButton
              $padding={"12px"}
              onClick={() => navigate('/')}
            >
              <span className="fs-6 fw-bold">Home Page</span>
            </GradientButton>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default NotFound;

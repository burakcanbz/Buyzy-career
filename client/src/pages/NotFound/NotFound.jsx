import React from "react";
import { Col, Image, Row } from "react-bootstrap";
import notFound from "../../assets/404.jpg";
import { useNavigate } from "react-router-dom";
import GradientButton from "../../styledComponents/gradientButton";

const NotFound = () => {
    const navigate = useNavigate();

  return (
    <div className="d-flex justify-content-center align-items-center p-5 bg-white" style={{ width: "100vw", height: "80dvh" }}>
      <Row className="d-flex justify-content-between align-items-center">
        <Col md={6} className="d-flex justify-content-end align-items-center">
          <Image src={notFound} style={{ borderRadius: "10px",  width: "clamp(300px, 30vw, 500px)", height: "300px"}}/>
        </Col>
        <Col md={6} className="d-flex justify-content-start">
          <div className="mt-5">
            <span className="fs-2 fw-bold ms-2">404 PAGE NOT FOUND</span>
            <br />
            <br />
            <span className="fs-5 ms-2">
              Only Jobs page availiable.
            </span>
            <br />
            <br />
            <GradientButton
              $padding={"12px"}
              style={{ marginLeft: 2 }}
              onClick={() => navigate('/open-positions')}
            >
              <span className="fs-6 fw-bold">Go Jobs</span>
            </GradientButton>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default NotFound;

import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaInstagram, FaLinkedin, FaFacebook } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaMailBulk } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{ minHeight: 270, backgroundColor: "#393D47", width: "100%" }}
    >
      <Container className="footer pt-5">
          <Row className="mt-5 pt-5">
            <Col md={3}>
              <Row>
                <Col md={4}>
                  <p>ABOUT US</p>
                </Col>
                <Col md={3}>
                  <p>NEWS</p>
                </Col>
                <Col md={3}>
                  <p>CAREERS</p>
                </Col>
              </Row>
            </Col>
            <Col md={9} className="d-flex justify-content-md-end">
              <Row
                className="d-flex justify-content-end align-items-end"
                style={{ cursor: "pointer" }}
              >
                <Col>
                  <p style={{ fontSize: 20 }}>
                    <FaLinkedin />
                  </p>
                </Col>
                <Col>
                  <p style={{ fontSize: 20 }}>
                    <FaInstagram />
                  </p>
                </Col>
                <Col>
                  <p style={{ fontSize: 20 }}>
                    <FaFacebook />
                  </p>
                </Col>
                <Col>
                  <p style={{ fontSize: 20 }}>
                    <BsTwitterX />
                  </p>
                </Col>
                <Col>
                  <p style={{ fontSize: 20 }}>
                    <FaMailBulk />
                  </p>
                </Col>
              </Row>
            </Col>
          </Row>
          <hr className="text-white px-5" />
          <Row className="mt-1">
            <Col md={2}>
              <p>
                <small>
                  <small> Copyright &copy; {currentYear} Buyzy</small>
                </small>
              </p>
            </Col>
            <Col md={10}>
              <p className="text-md-end text-sm-start">
                <small>
                  <small> Terms & Privacy</small>
                </small>
              </p>
            </Col>
          </Row>
      </Container>
    </footer>
  );
};

export default Footer;

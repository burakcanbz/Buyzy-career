import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaInstagram, FaLinkedin, FaFacebook } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaMailBulk } from "react-icons/fa";
import footerLogo from "../../assets/footerLogo.jpg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{ minHeight: 270, backgroundColor: "#1E1E1E", width: "100vw" }}
    >
      <Container className="footer">
        <Row>
          <Col className="d-flex mt-3" style={{ marginLeft: -30 }}>
            <Container>
              <img
                src={footerLogo}
                alt="Logo"
                style={{
                  maxHeight: 80,
                  borderRadius: "5%",
                  marginRight: 10,
                  cursor: "pointer",
                }}
              ></img>
            </Container>
          </Col>
        </Row>
        <Container>
          <Row className="mt-5">
            <Col md={3}>
            <Row>
              <Col md={4}>
                <p >ABOUT US</p>
              </Col>
              <Col md={3}>
                <p >GAMES</p>
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
                  <small> &copy; {currentYear} Dream Games</small>
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
      </Container>
    </footer>
  );
};

export default Footer;

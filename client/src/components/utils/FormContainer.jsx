import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const FormContainer = ({ render }) => {
  return (
    <Container style={{ height: "50vh"}}>
      <Row className="d-flex justify-content-md-center align-items-end">
        <Col xs={12} md={6} className="p-5">
          {render()}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;

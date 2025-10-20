import React from "react";
import { Row, Form, Card } from "react-bootstrap";
import { capitalizeFirstLetter } from "../helpers/helper";
import { IoMdClose, IoMdCheckmark } from "react-icons/io";

const FeedbackCard = ({ item }) => {
  return (
    <Card className="shadow-lg mb-2 border-1">
      <Card.Body>
        <Row className="align-items-center">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <strong>Status:</strong>
              <span className={`ms-2 ${item.status === "positive" ? "text-success" : "text-danger"}`}>
                {capitalizeFirstLetter(item.status)}{" "}
                {item.status === "positive" ? (
                  <IoMdCheckmark style={{ color: "green", fontSize: "1.2rem" }} />
                ) : (
                  <IoMdClose style={{ color: "red", fontSize: "1.2rem" }} />
                )}
              </span>
            </div>
          </div>
          <div>
            <strong>From&nbsp; :</strong>
            <span className="ms-2 text-muted">{item.from}</span>
          </div>
          <Form.Control
            as="textarea"
            name="message"
            value={item.message}
            readOnly
            rows={2}
            className="mt-2 border-1 bg-light"
            style={{ resize: "none", overflow: "auto" }}
          />
        </Row>
      </Card.Body>
    </Card>
  );
};

export default FeedbackCard;

import React from "react";
import { Form } from "react-bootstrap";
import FeedbackCard from "./FeedbackCard";

const GivenFeedbacks = ({ feedbacks }) => {
  return (
    <>
      <Form.Label
        id="apply-form-label"
        className="fs-5 mt-3 d-flex justify-content-center"
      >
        Given Feedbacks
      </Form.Label>
      {feedbacks.map((item, index) => {
        return <FeedbackCard key={index} item={item} />;
      })}
    </>
  );
};

export default GivenFeedbacks;

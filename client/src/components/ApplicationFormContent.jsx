import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { usePostFeedbackMutation } from "../slices/feedbackApiSlice";
import { toast } from "react-toastify";
import { downloadFile } from "../helpers/helper";
import HireStatus from "./HireStatus";

const ApplicationFormContent = ({ userInfo, id, appDetail, refetchFeed, refetchApp }) => {
  const [updated, setUpdated] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [feedback, setFeedback] = useState({
    status: "",
    message: "",
    from: userInfo.email,
    applicationId: id,
  });
  const [postFeedback] = usePostFeedbackMutation();

  const handleTagClick = (tag) => {
    tag.includes("https://")
      ? window.open(`${tag}`)
      : window.open(`https://${tag}`);
  };

  const handleChange = (e) => {
    const { name } = e.target;
    const { value } = e.target;
    if (name === "status") {
      setIsChecked(true);
    }
    setFeedback((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const sendFeedback = async () => {
    try {
      if (isChecked) {
        const resp = await postFeedback({ feedback }).unwrap();
        refetchFeed(id).then(data => console.log("in refetch => ", data));
        toast.success("Feedback sent successfully");
        setUpdated(false);
      } else {
        toast.error("You need to check the status box.");
        setIsChecked(false);
      }
    } catch (err) {
      toast.error(err.data.message || "Error while sending feedback");
      setUpdated(false);
    }
  };

  const submitFeedback = (e) => {
    e.preventDefault();
    if (!isChecked) {
      toast.error("You need to check the status box.");
      return;
    }
    setUpdated(true);
  };

  useEffect(() => {
    if (updated) {
      sendFeedback();
    }
  }, [updated]);

  return (
    <>
      <Form className="w-75" id="apply-form">
        <HireStatus id={id} hireStatus={appDetail?.hireStatus} refetchApp={refetchApp}/>
        <Form.Group className="mb-4" controlId="formBasicEmail">
          <Form.Label id="apply-form-label">
            &nbsp;Full Name<span style={{ color: "red" }}>&nbsp;*</span>
          </Form.Label>
          <Form.Control
            name="name"
            type="name"
            value={appDetail.name}
            readOnly
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label id="apply-form-label">
            &nbsp;Email<span style={{ color: "red" }}>&nbsp;*</span>
          </Form.Label>
          <Form.Control
            name="email"
            type="email"
            value={appDetail.email}
            readOnly
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPhone">
          <Form.Label id="apply-form-label">&nbsp;Phone</Form.Label>
          <Form.Control
            name="phone"
            type="tel"
            value={appDetail.phone}
            readOnly
          />
        </Form.Group>
        <Form.Group className="mb-4" controlId="formBasicLocation">
          <Form.Label name="location" id="apply-form-label">
            &nbsp;Current Location
          </Form.Label>
          <Form.Control name="location" value={appDetail.location} readOnly />
        </Form.Group>
        <Form.Group controlId="formBasicCompany">
          <Form.Label id="apply-form-label">&nbsp;Current Company</Form.Label>
          <Form.Control name="company" value={appDetail.company} readOnly />
        </Form.Group>
        <Form.Group>
          <Form.Label id="apply-form-label" className="mt-4">&nbsp;Personal Files </Form.Label>
          <Form.Text className="text-muted">
              <small >
                &nbsp;&nbsp;&nbsp;(Click to download files.<span style={{ color: "red" }}>*</span>)
              </small>
          </Form.Text>
          <div style={{ height: 150 }} className="div-tag-span">
            {appDetail?.files.map((item, index) => {
              return (
                <a
                  key={index}
                  onClick={() => downloadFile(item)}
                  className="tag-span text-decoration-none"
                >
                  {item}
                </a>
              );
            })}
          </div>
        </Form.Group>
        <br />
        <br />
        <Row className="mt-4 mb-4">
          <h5 style={{ color: "rgb(81 83 87)" }} className="fw-bold fs-5 mb-5">
            LINKS
          </h5>
          <Form.Group>
            <Form.Label id="apply-form-label">
              &nbsp;Personal Accounts Links
            </Form.Label>
            <Form.Text className="text-muted">
              <small >
                &nbsp;&nbsp;&nbsp;(Click to navigate links.<span style={{ color: "red" }}>*</span>)
              </small>
          </Form.Text>
            <div style={{ height: 150 }} className="div-tag-span">
              {appDetail?.links.map((item, index) => {
                return (
                  <span
                    key={index}
                    onClick={() => handleTagClick(item)}
                    className="tag-span"
                  >
                    {item}
                  </span>
                );
              })}
            </div>
          </Form.Group>
          <Form.Group className="mt-4 mb-3" controlId="ControlTextarea">
            <Form.Label id="apply-form-label">&nbsp;Message</Form.Label>
            <Form.Control
              as="textarea"
              name="message"
              value={appDetail.message}
              readOnly
              rows={5}
              style={{ resize: "none", overflow: "auto" }}
            />
          </Form.Group>
          {userInfo.role !== "Viewer" && (
            <Form.Group>
              <Form.Label id="apply-form-label" className="mt-4 fs-5">
                &nbsp;FEEDBACK
              </Form.Label>
              <Row className="mt-3">
                <Form.Label id="apply-form-label" className="mt-4 fs-6">
                  &nbsp;Feedback Status
                </Form.Label>
                <Col md={3}>
                  <Form.Check
                    type="radio"
                    label="Positive"
                    name="status"
                    value="positive"
                    checked={feedback.status === "positive"}
                    onChange={handleChange}
                    className="fw-bold"
                  />
                </Col>
                <Col md={3}>
                  <Form.Check
                    type="radio"
                    label="Negative"
                    name="status"
                    value="negative"
                    checked={feedback.status === "negative"}
                    onChange={handleChange}
                    className="fw-bold"
                  />
                </Col>
                <Form.Text className="text-muted">
                  {!isChecked && (
                    <small style={{ color: "red" }}>
                      &nbsp; You need to check one of the above options *
                    </small>
                  )}
                </Form.Text>
                <Form.Group
                  className="mt-4 mb-3"
                  controlId="ControlFeedbackMessage"
                >
                  <Form.Label id="apply-form-label">&nbsp;Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="message"
                    value={feedback.message}
                    onChange={handleChange}
                    placeholder="Enter your feedback message here..."
                    rows={5}
                  />
                  <Button className="mt-2" onClick={submitFeedback}>
                    Send Feedback
                  </Button>
                </Form.Group>
              </Row>
            </Form.Group>
          )}
        </Row>
      </Form>
    </>
  );
};

export default ApplicationFormContent;
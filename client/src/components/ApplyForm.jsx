import React, { useState, useRef, useEffect, use } from "react";
import { Form, Row } from "react-bootstrap";
import { usePostApplicationMutation } from "../slices/applicationApiSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ModalMessage from "./utils/ModalMessage";
import TagLinks from "./TagLinks";
import TagFiles from "./TagFiles";
import GradientButton from "../styledComponents/gradientButton";

const ApplyForm = ({ positionId, position }) => {
  const navigate = useNavigate();
  const [updated, setUpdated] = useState(false);
  const [application, setApplication] = useState({
    name: "",
    email: "",
    phone: "+90",
    location: "",
    company: "",
    files: [],
    links: [],
    message: "",
    hireStatus: "",
  });
  const [postApplication] = usePostApplicationMutation();
  const [file ,setFile] = useState([]);
  const childRef = useRef();

  const handleChange = (e) => {
    const { name } = e.target;
    const { value } = e.target;

    setApplication((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFilesChange = (files) => {
    const filesArray = Array.isArray(files) ? files : Array.from(files);
    const fileNames = filesArray.map((file) => file.name);
    setApplication((prev) => ({
      ...prev,
      files: filesArray,
    }));
    setFile(fileNames);
  };

  const handleLinksChange = (value) => {
    setApplication((prev) => ({
      ...prev,
      links: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUpdated(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const post = async () => {
    if (updated && positionId && application) {
      try {
        const formData = new FormData();
        formData.append("position", JSON.stringify(position));
        formData.append("name", application.name);
        formData.append("email", application.email);
        formData.append("phone", application.phone);
        formData.append("location", application.location);
        formData.append("company", application.company);
        formData.append("message", application.message);
        formData.append("files", JSON.stringify(file));
        formData.append("hireStatus", application.hireStatus);
        application.files.forEach((file) => {
          formData.append("file", file);
        });
        formData.append("links", JSON.stringify(application.links));
        const resp = await postApplication(formData).unwrap();
        if (childRef.current) {
          childRef.current.handleShow();
        }
        setTimeout(() => {
          // navigate('/open-positions');
        }, 2000);
        setUpdated(false);
      } catch (error) {
        toast.error(
          error?.data?.message ||
            "Unexpected error happened while sending application"
        );
        setTimeout(() => {
          // navigate('/open-positions');
        }, 2000);
        setUpdated(false);
      }
    }
  };

  useEffect(() => {
    if (updated) {
      post();
    }
  }, [updated]);

  return (
    <Form
      className="w-75"
      id="apply-form"
      onSubmit={handleSubmit}
      onKeyDown={handleKeyDown}
    >
      <Form.Group className="mb-4" controlId="formBasicEmail">
        <Form.Label id="apply-form-label">
          &nbsp;Full Name<span style={{ color: "red" }}>&nbsp;*</span>
        </Form.Label>
        <Form.Control
          name="name"
          type="name"
          placeholder="Enter your name"
          required
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label id="apply-form-label">
          &nbsp;Email<span style={{ color: "red" }}>&nbsp;*</span>
        </Form.Label>
        <Form.Control
          name="email"
          type="email"
          placeholder="Enter your e-mail"
          onChange={handleChange}
          required
        />
        <Form.Text className="text-muted">
          <small>&nbsp;We'll never share your email with anyone else.</small>
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPhone">
        <Form.Label id="apply-form-label">&nbsp;Phone</Form.Label>
        <Form.Control
          name="phone"
          type="tel"
          placeholder="Enter your phone number"
          value={application.phone}
          onChange={handleChange}
          required
        />
        <Form.Text className="text-muted">
          <small>
            &nbsp;We'll never share your phone number with anyone else.
          </small>
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-4" controlId="formBasicLocation">
        <Form.Label name="location" id="apply-form-label">
          &nbsp;Current Location
        </Form.Label>
        <Form.Control
          name="location"
          placeholder="Enter your current location"
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="formBasicCompany">
        <Form.Label id="apply-form-label">&nbsp;Current Company</Form.Label>
        <Form.Control
          name="company"
          placeholder="Enter your current company"
          onChange={handleChange}
        />
      </Form.Group>
      <TagFiles
        handleFilesChange={handleFilesChange}
        warning={"(You can add multiple files at once)"}
        allowMultiple={true}
        name={"Files"}
        isRequired={true}
      />
      <br />
      <br />
      <Row className="mt-4 mb-4">
        <h5 style={{ color: "rgb(81 83 87)" }} className="fw-bold fs-5 mb-5">
          LINKS
        </h5>
        <TagLinks handleLinksChange={handleLinksChange} />
        <Form.Group className="mb-3" controlId="ControlTextarea">
          <Form.Label id="apply-form-label">&nbsp;Message</Form.Label>
          <Form.Control
            as="textarea"
            name="message"
            placeholder="Enter your cover letter/message here...(The message must not exceed 500 characters.)"
            maxLength={500}
            value={application.message}
            onChange={handleChange}
            rows={5}
          />
        </Form.Group>
      </Row>
      <div className="d-flex justify-content-center">
        <GradientButton type="submit">
          <span style={{ color: "white" }}>Submit</span>
        </GradientButton>
        <ModalMessage ref={childRef} />
      </div>
    </Form>
  );
};

export default ApplyForm;

import React, { useEffect, useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { usePostPositionMutation } from "../slices/positionApiSlice";
import { toast } from "react-toastify";
import TagFiles from "./TagFiles";
import GradientButton from "../styledComponents/gradientButton";
import SlidingPage from "./utils/SlidingPage";

const CreatePositionTab = () => {
  const [postPosition] = usePostPositionMutation();
  const [files, setFiles] = useState([]);
  const [submit, setSubmit] = useState(false);
  const [position, setPosition] = useState({
    title: "",
    summary: "",
    division: "",
    location: "",
    requirements: "",
    responsibilities: "",
    image: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPosition((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFilesChange = async (files) => {
    const filesArray = Array.from(files);
    const fileName = filesArray.length > 0 ? filesArray[0].name : null;
    setPosition((prev) => ({
      ...prev,
      image: `/images/${fileName}`,
    }));
    setFiles((prevFiles) => [...prevFiles, ...filesArray]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmit(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const post = async () => {
    if (submit) {
      try {
        const formData = new FormData();
        formData.append("title", position.title);
        formData.append("summary", position.summary);
        formData.append("division", position.division);
        formData.append("location", position.location);
        formData.append("requirements", position.requirements);
        formData.append("responsibilities", position.responsibilities);
        formData.append("image", JSON.stringify(position.image));
        files.forEach((file) => {
          formData.append("file", file);
        });
        const resp = await postPosition({ formData }).unwrap();
        toast.success("Position created successfully.");
        setSubmit(false);
      } catch (err) {
        toast.error(
          err || "Unexpected error happened while creating position."
        );
        setSubmit(false);
      }
    }
  };

  useEffect(() => {
    if (submit) {
      post();
    }
  }, [submit]);

  return (
    <SlidingPage animationClassName={"slide-in"}>
      <Row className="d-flex justify-content-center">
        <Col md={9} className="d-flex justify-content-center">
          <Form
            className="w-75"
            id="apply-form"
            onSubmit={handleSubmit}
            onKeyDown={handleKeyDown}
          >
            <Form.Group className="mb-4" controlId="formBasicEmail">
              <Form.Label id="apply-form-label">
                &nbsp;Position Title
                <span style={{ color: "red" }}>&nbsp;*</span>
              </Form.Label>
              <Form.Control
                name="title"
                type="text"
                value={position.title}
                placeholder="Enter position title"
                required
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="formBasicEmail">
              <Form.Label id="apply-form-label">
                &nbsp;Division
                <span style={{ color: "red" }}>&nbsp;*</span>
              </Form.Label>
              <Form.Control
                name="division"
                type="text"
                value={position.division}
                placeholder="Enter position division"
                required
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="formBasicEmail">
              <Form.Label id="apply-form-label">
                &nbsp;Location
                <span style={{ color: "red" }}>&nbsp;*</span>
              </Form.Label>
              <Form.Control
                name="location"
                type="text"
                value={position.location}
                placeholder="Enter position location"
                required
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="ControlDescriptionArea">
              <Form.Label id="apply-form-label">
                &nbsp;Position Description
              </Form.Label>
              <Form.Control
                as="textarea"
                name="summary"
                placeholder="Enter position summary here..."
                value={position.summary}
                onChange={handleChange}
                rows={5}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="ControlRequirementsArea">
              <Form.Label id="apply-form-label">&nbsp;Requirements</Form.Label>
              <Form.Control
                as="textarea"
                name="requirements"
                placeholder="Enter requirements here..."
                value={position.requirements}
                onChange={handleChange}
                rows={5}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="ControlResponsibilitiesArea"
            >
              <Form.Label id="apply-form-label">
                &nbsp;Responsibilities
              </Form.Label>
              <Form.Control
                as="textarea"
                name="responsibilities"
                placeholder="Enter responsibilities here..."
                value={position.responsibilities}
                onChange={handleChange}
                rows={5}
              />
            </Form.Group>
            <TagFiles
              handleFilesChange={handleFilesChange}
              warning={"(You should add one image here.)"}
              allowMultiple={false}
              name={"Image"}
              isRequired={true}
            />
            <br />
            <br />
            <div className="d-flex justify-content-center">
              <GradientButton type="submit">
                <span style={{ color: "white" }}>Create Position</span>
              </GradientButton>
            </div>
          </Form>
        </Col>
      </Row>
    </SlidingPage>
  );
};

export default CreatePositionTab;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Row, Col, Button, Image } from "react-bootstrap";
import TagFiles from "../../../components/TagFiles";
import SlidingPage from "../../../components/utils/SlidingPage";
import { useParams } from "react-router-dom";
import {
  useGetJobItemDetailQuery,
  useUpdatePositionMutation,
} from "../../../slices/positionApiSlice";
import { toast } from "react-toastify";
import Message from "../../../components/utils/Message";
import Loading from "../../../components/utils/Loading";

const OperationsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: jobData,
    isError,
    isLoading,
    refetch,
  } = useGetJobItemDetailQuery(id);
  const openPosition = jobData?.position;
  const [updatePosition] = useUpdatePositionMutation();
  const [files, setFiles] = useState([]);
  const [position, setPosition] = useState({
    title: "",
    summary: "",
    division: "",
    location: "",
    requirements: "",
    responsibilities: "",
    image: "",
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
    try {
      if (fileName) {
        await processFile(fileName);
      }
      setPosition((prev) => ({
        ...prev,
        image: fileName ? `/images/${fileName}` : "",
      }));
      setFiles((prevFiles) => [filesArray[filesArray.length - 1]]);
    } catch (err) {
      console.error("File processing failed:", err);
    }
  };

  const processFile = (fileName) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", position._id);
    formData.append("title", position.title);
    formData.append("summary", position.summary);
    formData.append("division", position.division);
    formData.append("location", position.location);
    formData.append("requirements", position.requirements);
    formData.append("responsibilities", position.responsibilities);
    formData.append("image", position.image);

    if (files.length > 0) {
      formData.append("file", files[0]);
    }
    await post(formData);
    toast.success("Position updated successfully.");
  };

  const post = async (formData) => {
    try {
      const response = await updatePosition({ id, formData }).unwrap();
      if (response.success) {
        toast.success("File uploaded successfully." , {
          onClose: () => {
            navigate(-1);
          }
        });
      }
    } catch (error) {
      toast.error("File upload failed.");
    }
  };

  useEffect(() => {
    refetch();
    if (openPosition) {
      setPosition((prev) => ({
        ...prev,
        ...openPosition,
        image: openPosition.image || "",
      }));
    }
  }, [openPosition, id]);

  if(isLoading) { return <Loading />}

  if(isError) { return <Message variant="danger">{isError?.message || "No position available."}</Message>}

  return (
    <SlidingPage animationClassName={"slide-in"}>
      <Row className="d-flex justify-content-center mt-4">
        <Col md={8} className="d-flex justify-content-center">
          <Form className="w-75" id="apply-form" onSubmit={handleSubmit}>
            <Form.Group className="mb-4" controlId="formBasicTitle">
              <Form.Label>
                Position Title <span style={{ color: "red" }}>*</span>
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
            <Form.Group className="mb-4" controlId="formBasicDivision">
              <Form.Label>
                Division <span style={{ color: "red" }}>*</span>
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
            <Form.Group className="mb-4" controlId="formBasicLocation">
              <Form.Label>
                Location <span style={{ color: "red" }}>*</span>
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
            <Form.Group className="mb-3" controlId="formBasicSummary">
              <Form.Label>Position Description</Form.Label>
              <Form.Control
                as="textarea"
                name="summary"
                placeholder="Enter position summary here..."
                value={position.summary}
                onChange={handleChange}
                rows={10}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicRequirements">
              <Form.Label>Requirements</Form.Label>
              <Form.Control
                as="textarea"
                name="requirements"
                placeholder="Enter requirements here..."
                value={position.requirements}
                onChange={handleChange}
                rows={5}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicResponsibilities">
              <Form.Label>Responsibilities</Form.Label>
              <Form.Control
                as="textarea"
                name="responsibilities"
                placeholder="Enter responsibilities here..."
                value={position.responsibilities}
                onChange={handleChange}
                rows={5}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label id="apply-form-label" className="mt-4">
                &nbsp;Position Image{" "}
              </Form.Label>
              <Col md={6} className="d-flex justify-content-center">
                <Image src={files.length !== 0 ? URL.createObjectURL(files[0]) : position?.image || null} alt="Image" fluid />
              </Col>
            </Form.Group>
            <TagFiles
              handleFilesChange={handleFilesChange}
              warning="(You should add one image here.)"
              allowMultiple={false}
              name="Image"
              isRequired={false}
            />
            <br />
            <div className="d-flex justify-content-center">
              <Button
                variant="success"
                style={{ borderRadius: 80 }}
                type="submit"
              >
                <span style={{ color: "white" }}>Update Position</span>
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </SlidingPage>
  );
};

export default OperationsDetail;
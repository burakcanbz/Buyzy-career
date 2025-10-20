import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { motion, AnimatePresence  } from "framer-motion";
import SlidingPage from "../../../components/utils/SlidingPage";
import ApplyForm from "../../../components/ApplyForm";
import {
  Card,
  CardContent,
  Typography,
  Link,
  CardMedia
} from "@mui/material";
import { useGetJobItemDetailQuery } from "../../../slices/positionApiSlice";
import Loading from "../../../components/utils/Loading";
import Message from "../../../components/utils/Message";

const Apply = () => {
  const { id: positionId } = useParams();
  const { data, error, isLoading } = useGetJobItemDetailQuery(positionId)
  const position = data?.position
  const [showMore, setShowMore] = useState(false);

  if (isLoading){
    return ( <Loading />) 
  }

  if (error){
    const message = "No data found"
    return ( <Message variant="danger">{error.message || message}</Message>)
  }

  return (
    <SlidingPage animationClassName={"slide-top"}>
      <div className="px-5 pb-5 p-md-5">
        <Row>
          <Col
            md={{ span: 4, offset: 0 }}
            className="p-5"
          >
            <Card className="card-hidden" sx={{ maxWidth: 500, boxShadow: 5, background: "rgba(250 250 250)", border: "1px solid rgba(240 240 240)", color: "black"}}>
              <CardContent>
                <CardMedia 
                  component="img"
                  height="194"
                  image={`${position?.image}`}
                  alt={`${position?.image}`}
                  className="mb-2"
                />
                <Typography
                  gutterBottom
                  component="div"
                  sx={{ marginBottom: 0 }}
                  className="fs-3 fw-bold fst-italic"
                >
                  {position?.title}
                </Typography>
                <Typography className="text-muted fw-bold fst-italic" sx={{ marginBottom: 1 }}>
                  <small>
                    {position?.division} / {position?.location}
                  </small>
                </Typography>
                <Typography variant="body2"  sx={{ marginBottom: 1 }}>
                  <span className="fw-bold fs-5 fst-italic">Description<br /></span>
                  <span className="mt-1 d-block fst-italic">{position?.summary}</span>
                </Typography>
                <AnimatePresence>
                { showMore && (
                  <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.5 }}
                  style={{ overflow: "hidden" }}
                >
                <Row>
                  <Col xl={6}>
                    <Typography variant="body2" component="div">
                      <span className="fw-bold fs-5 fst-italic" style={{ marginLeft: 15 }}>Requirements</span>{" "}
                      <br />
                      <ul style={{ marginTop: 5 }} className="fst-italic">
                        <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, cupiditate!.</li>
                        <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, rem.</li>
                        <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea, totam?</li>
                        <li>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur, excepturi.</li>
                      </ul>
                    </Typography>
                  </Col>
                  <Col xl={6}>
                    <Typography variant="body2" component="div">
                      <span className="fw-bold fs-5 fst-italic" style={{ marginLeft: 15 }}>
                        Responsibilities
                      </span>{" "}
                      <br />
                      <ul style={{ marginTop: 5 }} className="fst-italic">
                      <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, cupiditate!.</li>
                        <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, rem.</li>
                        <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea, totam?</li>
                        <li>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur, excepturi.</li>
                      </ul>
                    </Typography>
                  </Col>
                </Row>
                </motion.div>
                )}
                </AnimatePresence>
                <Link variant="body2" sx={{background: "none", cursor: "pointer", textDecoration: "none", color: "gray"}} onClick={() => setShowMore(prev => !prev)}>{showMore ? "Show Less" : "Show More.."}</Link>
              </CardContent>
            </Card>
          </Col>
          <Col xs={12} sm={12} md={10} xl={10} xxl={7}>
            <Row className="d-flex justify-content-center align-items-center">
              <Col xs={12} sm={12} md={10} xl={10} className="d-flex justify-content-start">
                <h1 style={{ color: "rgb(81 83 87)" }} className="fw-bold">{position?.title}</h1>
              </Col>
            </Row>
            <Row className="d-flex justify-content-center align-items-center mt-3">
              <Col
                xs={12}
                sm={12}
                md={10}
                className="d-flex justify-content-start"
              >
                <h6 className="fw-bold" style={{ color: "slategray" }}>
                  <small>&nbsp;{position?.location}</small>
                </h6>
              </Col>
            </Row>
            <Row className="d-flex justify-content-center align-items-center">
              <Col
                xs={12}
                sm={12}
                md={10}
                className="d-flex justify-content-start"
              >
                <h6 className="fw-bold" style={{ color: "slategray" }}>
                  <small>
                    &nbsp;{position?.division}&nbsp;&nbsp; /&nbsp;&nbsp;On-Site
                  </small>
                </h6>
              </Col>
            </Row>
            <Row className="d-flex justify-content-center align-items-center mt-5 mb-5">
              <Col
                xs={12}
                sm={12}
                md={10}
                className="d-flex justify-content-start align-items-center"
              >
                <h5 style={{ color: "rgb(81 83 87)" }} className="fw-bold fs-5">
                  SUBMIT YOUR APPLICATION
                </h5>
              </Col>
            </Row>
            <Row className="d-flex justify-content-center align-items-center">
              <Col xs={12} sm={12} md={10}>
                <ApplyForm  positionId={positionId} position={position}/>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </SlidingPage>
  );
};

export default Apply;

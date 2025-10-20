import React from "react";
import { ADMIN_URL, APP_URL } from "../../../constants";
import { useLocation, useNavigate } from "react-router-dom";
import { Row, Col, Container, Button } from "react-bootstrap";
import { useGetApplicationsByQueryQuery } from "../../../slices/applicationApiSlice";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { getQueryParams } from "../../../helpers/helper";
import Loading from "../../../components/utils/Loading";
import Message from "../../../components/utils/Message";

const ApplicationDetails = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = getQueryParams(new URLSearchParams(location.search));
  const { data, error, isLoading, } = useGetApplicationsByQueryQuery({ queryArr:Object.values(queryParams) });
  const { userInfo } = useSelector((state) => state.auth);
  
  if (isLoading) { return <Loading />}
  
  if (error) { return <Message variant="danger">{error.data?.message || "Something went wrong..."}</Message>}
  
  return (
    <div>
      <Container>
        <Row className="d-flex justify-content-center mt-4">
          <Col md={1}><Button variant="secondary" onClick={() => navigate(`${ADMIN_URL}${APP_URL}`)}>Back</Button></Col>
          <Col md={8}>
            {data &&
              data.applications?.map((item, index) => {
                return (
                  <Card
                    key={index}
                    sx={{ display: "flex", cursor: "pointer", boxShadow: "2px 5px 15px rgba(0, 0, 0, .5)" }}
                    className="mb-4"
                    onClick={() => navigate(`${location.pathname}/details/${item._id}`)}
                  >
                    <CardMedia
                      component="img"
                      sx={{ width: 250, height: 215 }}
                      style={{
                        objectFit: "cover",
                      }}
                      className="d-none d-lg-block"
                      image={`${item.position.image}`}
                      alt={`${item.position.title}`}
                    />
                    <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
                      <CardContent sx={{ flex: "1 0 auto" }}>
                        <Typography
                          variant="h5"
                          component="div"
                          sx={{ color: "text.secondary" }}
                        >
                          {item.position.title}
                        </Typography>
                        <Typography
                          component="div"
                          variant="subtitle1"
                          sx={{ color: "text.secondary" }}
                          className="mt-2"
                        >
                          <strong>Application Id:</strong> <span className="fw-bold text-black">{item._id}</span>
                        </Typography>
                        <Typography
                          component="div"
                          variant="subtitle1"
                          sx={{ color: "text.secondary" }}
                          className="mt-2"
                        >
                          <strong>Applicant Name:</strong> <span className="fw-bold text-black">{item.name}</span>
                        </Typography>

                        <Typography
                          component="div"
                          variant="subtitle1"
                          sx={{ color: "text.secondary" }}
                          className="mt-2"
                        >
                          <strong>Status:</strong> <span className="fw-bold text-black">{item.hireStatus === "hired" ? <span className="text-success">Hired</span> : <span className="text-danger">Not Hired</span>}</span>
                        </Typography>
                      </CardContent>
                      { userInfo.role !== 'Viewer' && (
                         <Box
                         sx={{
                           display: "flex",
                           justifyContent: "flex-end",
                           padding: "0 10px 10px",
                           gap: 2
                         }}
                       >
                         <Button size="sm" variant="success" sx={{ flex: 1, marginRight: 2 }}>
                           Add Feedback
                         </Button>
                       </Box>
                      )}
                    </Box>
                  </Card>
                );
              })}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ApplicationDetails;

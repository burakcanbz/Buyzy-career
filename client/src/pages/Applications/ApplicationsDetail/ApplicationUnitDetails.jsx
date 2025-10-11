import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetApplicationDetailQuery } from "../../../slices/applicationApiSlice";
import { Row, Col, Container, Button } from "react-bootstrap";
import { useGetFeedbacksQuery } from "../../../slices/feedbackApiSlice";
import { useSelector } from "react-redux";
import GivenFeedbacks from "../../../components/GivenFeedbacks";
import ApplicationFormContent from "../../../components/ApplicationFormContent";
import Message from "../../../components/utils/Message";
import SlidingPage from "../../../components/utils/SlidingPage";

const ApplicationUnitDetails = () => {
  const { id } = useParams();
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { data: feedbacks, feedError, isFeedLoading, isFetching, refetch: refetchFeedbacks } = useGetFeedbacksQuery(id);
  const feedbacksArr = feedbacks?.feedbacks;
  const { data, error, isLoading, refetch: refetchApplicationDetails } = useGetApplicationDetailQuery(id);
  const appDetail = data?.applicationDetail;

  useEffect(() => {
    if (id) {
      refetchApplicationDetails(id);
      window.scrollTo(0, 0);
    }
  }, [id, refetchApplicationDetails]);

  if(isFetching) { return <div></div>}  // need to use refetch data from backend

  if(error) { return <Message variant="danger">{error?.data?.message || "There is no application with that id"}</Message>}

  return (
    <SlidingPage animationClassName={"slide-top"}>
      <Container>
        {appDetail && (
          <Row className="d-flex justify-content-center">
            <Col md={1}>
              <Button variant="secondary" onClick={() => navigate(-1)}>
                Back
              </Button>
            </Col>
            <Col md={8} className="d-flex justify-content-center">
              <ApplicationFormContent
                userInfo={userInfo}
                id={id}
                appDetail={appDetail}
                refetchFeed={refetchFeedbacks}
                refetchApp={refetchApplicationDetails}
              />
            </Col>
            {feedbacksArr?.length > 0 && (
              <Col md={3}>
                <GivenFeedbacks feedbacks={feedbacksArr} />
              </Col>
            )}
          </Row>
        )}
      </Container>
    </SlidingPage>
  );
};

export default ApplicationUnitDetails;
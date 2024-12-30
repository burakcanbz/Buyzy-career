import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Image } from "react-bootstrap";
import { useGetJobItemDetailQuery } from "../../../slices/positionApiSlice";
import GradientButton from "../../../styledComponents/gradientButton";
import SlidingPage from "../../../components/utils/SlidingPage";
import Loading from "../../../components/utils/Loading";
import Message from "../../../components/utils/Message";

const OpenPositionDetails = () => {
  const { id: positionId } = useParams();
  const { data, error, isLoading, refetch } = useGetJobItemDetailQuery(positionId);
  const position = data?.position;

  const formatSummary = (summary) => {
    return summary.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < summary.split("\n").length - 1 && <br />}
      </React.Fragment>
    ));
  };

  const handleClick = () => {
    window.open(`/${position.id}/apply`, "_blank");
  };

  useEffect(() => {
    refetch();
  }, [positionId])

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    const message = "No data found";
    return <Message variant="danger">{error.message || message}</Message>;
  }

  return (
    <SlidingPage animationClassName={"slide-in"}>
      <div
        className="p-5"
        style={{
          background: "rgb(245 245 245)",
          color: "#323232",
          lineHeight: "34px",
          letterSpacing: 0.2,
          fontWeight: 500,
        }}
      >
        {position && (
          <div>
            <Row className="d-flex justify-content-center align-items-center">
              <Row>
                <Col
                  lg={{ span: 6, offset: 3 }}
                  md={8}
                  className="d-flex align-items-center"
                >
                  <h1 className="fw-bold">{position.title} </h1>
                </Col>
                <Col lg={3} md={4}>
                  <GradientButton onClick={handleClick}>
                    Apply Now
                  </GradientButton>
                </Col>
              </Row>
              <Row className="mt-sm-4 mb-sm-4 mt-4 mb-4 d-none d-md-block">
                <Image src={`${position?.image}` || null} width="1900px" height="549px"></Image>
              </Row>
              <Row>
                <Col md={{ span: 10, offset: 1 }}>
                  <Row className="d-flex justify-content-center align-items-center mt-3">
                    <Col md={8}>
                      <div style={{ fontSize: 20 }}>
                        {position?.summary && (
                          <>
                            <p className="mt-4">
                              {formatSummary(position.summary)}
                            </p>
                            <br />
                            <hr />
                          </>
                        )}
                      </div>
                    </Col>
                  </Row>
                  {position.division !== "Career Days" && (
                    <>
                      <Row className="d-flex justify-content-center align-items-center mt-3">
                        <Col md={8}>
                          <strong className="fs-3">Requirements</strong>
                          <br />
                          <ul style={{ fontSize: 20 }} className="mt-3">
                            {position.requirements === "" ? (Array.from({ length: 5 }).map((_, index) => (
                              <li key={index}>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Cupiditate vel ab, magni dolor
                                sit neque!.{index + 1}
                              </li>
                            ))) : (position.requirements)}
                          </ul>
                          <br />
                          <hr />
                        </Col>
                      </Row>

                      <Row className="d-flex justify-content-center align-items-center mt-3">
                        <Col md={8}>
                          <strong className="fs-3">Responsibilities</strong>
                          <ul style={{ fontSize: 20 }} className="mt-3">
                            {position.responsibilities === "" ? (Array.from({ length: 5 }).map((_, index) => (
                              <li key={index}>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Cupiditate vel ab, magni dolor
                                sit neque! {index + 1}
                              </li>
                            ))) : (position.responsibilities)}
                          </ul>
                        </Col>
                      </Row>
                    </>
                  )}
                </Col>
              </Row>
            </Row>
            <Row>
              <Col md={12} className="d-flex justify-content-center mt-5">
                <GradientButton onClick={handleClick}>
                  Apply For This Job
                </GradientButton>
              </Col>
            </Row>
          </div>
        )}
      </div>
    </SlidingPage>
  );
};

export default OpenPositionDetails;

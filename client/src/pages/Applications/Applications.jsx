import React from "react";
import { useSelector } from "react-redux";
import { useGetApplicationsQuery } from "../../slices/applicationApiSlice";
import { Row, Col, Container } from "react-bootstrap";
import { groupedByDivision, groupedById } from "../../helpers/helper";
import ApplicationTabs from "../../components/ApplicationTabs";
import Loading from "../../components/utils/Loading";
import Message from "../../components/utils/Message";

const Applications = () => {
  const { userInfo } = useSelector((state) => state.auth);
  console.log("userInfo => ", userInfo);
  const { data, error, isLoading } = useGetApplicationsQuery({ id: userInfo._id});
  const apps = data?.applications;
  console.log("applications data => ", apps);
  
  if (isLoading) {
    return <Loading />;
  }

  const applicationFormRole = groupedById(apps);
  const applicationFormDivision = groupedByDivision(apps);

  return (
    <>
      {apps?.length > 0 ? (
        <>
          <Container>
            <Row className="d-flex justify-content-center">
              <Col md={12}>
                <ApplicationTabs role={applicationFormRole} division={applicationFormDivision} userInfo={userInfo}/>
              </Col>
            </Row>
          </Container>
        </>
      ):
      <Message variant="danger">No Applications here.</Message>
      }
    </>
  );
};

export default Applications;
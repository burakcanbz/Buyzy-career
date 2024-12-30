import React, { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Pagination } from "@mui/material";
import { useGetPositionWithPageQuery } from "../../slices/positionApiSlice";
import Message from "../utils/Message";
import Loading from "../utils/Loading";
import OperationsPositionCard from "../OperationsPositionCard";

const PositionForm = ({ name }) => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, refetch } = useGetPositionWithPageQuery({
    page,
    limit: 10,
  });

  const positions = data?.paginatedPositions;
  const totalPages = data?.totalPages;

  const handleChange = (e, value) => {
    setPage(value);
  };

  if (isError) {
    return (
      <Message variant="danger">
        {isError?.data?.message || "Unexpected thing happened."}
      </Message>
    );
  }

  if (isLoading) {
    return <Loading />;
  }

  const positionLeft = positions?.slice(0, 5);
  const positionRight = positions?.slice(5, 10);

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Row>
      <Col md={positionRight?.length > 0 ? 6 : 9}>
          {positionLeft?.map((position, index) => (
            <OperationsPositionCard key={index} position={position} index={index} buttonName={name} refetch={refetch}/>
          ))}
        </Col>
        <Col md={6}>
          {positionRight?.length > 0 && positionRight?.map((position, index) => (
            <OperationsPositionCard key={index} position={position} index={index} buttonName={name} refetch={refetch}/>
          ))}
        </Col>
        <Col className="d-flex justify-content-center mt-5" md={12}>
          <Pagination
            size="large"
            count={totalPages}
            page={page}
            onChange={handleChange}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default PositionForm;

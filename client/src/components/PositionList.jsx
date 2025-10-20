import React, { useState, useEffect, useMemo, useRef } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { calculateValues } from "../helpers/helper";
import { useNavigate } from "react-router-dom";
import { useGetJobItemsQuery } from "../slices/positionApiSlice";
import { setPositions } from "../slices/positionsSlice";
import { useSelector, useDispatch } from "react-redux";
import Loading from "./utils/Loading";
import Message from "./utils/Message";
import PaginationComponent from "./general/PaginationComponent";
import GradientButton from "../styledComponents/gradientButton";
import PositionCard from "./PositionCard";

const PositionList = () => {
  const ref = useRef(null);
  const firstRender = useRef(true);
  const [currentPage, setCurrentPage] = useState(1);
  const { data, error, isLoading } = useGetJobItemsQuery();
  const { searchedItems } = useSelector((state) => state.position);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const openPositions = useMemo(() => {
    return data?.data || [];
  }, [data?.data]);
  
  useEffect(() => {
    if (data) {
      dispatch(setPositions(data?.data));
    }
  }, [data, dispatch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchedItems]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [currentPage]);

  const [items, totalPages, pageNumbers] = useMemo(() => {  // Avoid recalculation if any other render different than updating these parameter values.
    return calculateValues(currentPage, searchedItems, openPositions);
  }, [currentPage, searchedItems, openPositions]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    const message = (
      <div className="d-flex flex-column justify-content-center align-items-center">
        <p className="fs-3 p-3">500 Internal Server Error</p>
        <p className="d-none d-md-block fs-3 ps-6">
          Please visit our website later.
        </p>
        <GradientButton $padding={"12px"} onClick={() => navigate("/")}>
          <span className="fs-6 fw-bold">Home Page</span>
        </GradientButton>
      </div>
    );
    return <Message variant="danger">{error.message || message}</Message>;
  }

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber)
  };

  const nextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  const paginationProps = {
    pageNumbers,
    totalPages,
    prevPage,
    nextPage,
    currentPage,
    handlePagination,
  };

  return (
    <>
    <div style={{ background: "radial-gradient(circle,  rgb(240, 240, 240),  rgb(220 220 220), rgb(235, 235, 243))"}}>
      <Container >
        <Row className="d-flex justify-content-center" ref={ref}>
          <Col className="d-flex justify-content-start align-items-center text-muted fs-5 mt-4 mb-4">
            {searchedItems?.length > 0 ? (
              <span>Open Roles: {searchedItems.length}</span>
            ) : (
              <span>Open Roles: {openPositions.length}</span>
            )}
          </Col>
        </Row>
        <Row>
          {items.length > 0 &&
            items.map((position, index) => (
              <Col
                sm={12}
                md={12}
                lg={6}
                xl={6}
                xxl={4}
                key={index}
                className="d-flex justify-content-center" >
                <PositionCard
                  key={position._id}
                  position={position}
                  index={index} />
              </Col>
            ))}
        </Row>
        <Row className="mt-5">
          <PaginationComponent {...paginationProps} />
        </Row>
      </Container>
      </div>
    </>
  );
};

export default PositionList;
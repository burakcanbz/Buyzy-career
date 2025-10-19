import React, { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getFilteredItems, getValues } from "../helpers/helper";
import { clearSearchItems, searchItems } from "../slices/positionsSlice";
import Select from "react-select";
import Loading from "./utils/Loading";

const Tools = () => {
  const data = useSelector((state) => state.position?.positions);
  const [isError, setIsError] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const dispatch = useDispatch();

  const handleDivision = (selectedOption) => {
    const searchingItem = selectedOption.value;
    if(selectedOption.value !== "All Division" ){
      const filteredItems = data?.filter((item) => {
        const divisionMatch = item.division.toString().toLowerCase().includes(searchingItem.toLowerCase());
        return divisionMatch})
      dispatch(searchItems(filteredItems));
      setSearchItem("")
    }
    else{
      dispatch(clearSearchItems())
      setSearchItem("")
    }
  }

  const handleLocation = (selectedOption) => {
    const searchingItem = selectedOption.value;
    if(selectedOption.value !== "All Location" ){
      const filteredItems = data?.filter((item) => {
        const locationMatch = item.location.toString().toLowerCase().includes(searchingItem.toLowerCase());
        return locationMatch})
      dispatch(searchItems(filteredItems));
      setSearchItem("")
    }
    else{
      dispatch(clearSearchItems())
      setSearchItem("")
    }
  }

  const handleSearch = (e) => {
    const value = e.target.value;
    const searchingItem = e.target.value.toLowerCase();
    setSearchItem(value);

    const filteredItems = getFilteredItems(data, searchingItem); 
    handleErrorStatus(filteredItems)

    if (searchingItem === "") {
      dispatch(clearSearchItems());
    } else if (filteredItems.length !== 0) {
      dispatch(searchItems(filteredItems));
      }
    };
  
    const handleErrorStatus = (filteredItems) => {
      const _ = filteredItems.length === 0 && !isError 
    ? (dispatch(clearSearchItems()), setIsError(true)) 
    : filteredItems.length !== 0 && isError && setIsError(false);
  }
  
  const divisions = data ? getValues(data, "division").sort() : [];
  const locations = data ? getValues(data, "location").sort() : [];

  if (!data) {
    return <Loading />;
  }

  return (
    <>
      {data && (
        <Container className="mt-5">
          <Row>
            <Col
              className="mb-4"
              sm={12}
              md={{ span: 10, offset: 1 }}
              xl={{ span: 5, offset: 1 }}
            >
              <Form>
                <Form.Control
                  className="ps-4 fs-6 fw-semibold"
                  type="search"
                  placeholder="Search for a position, location, team..."
                  value={searchItem}
                  onChange={handleSearch}
                  aria-label="Search"
                  style={{
                    borderRadius: 80,
                    paddingTop: 8,
                    paddingBottom: 9,
                    borderColor: "rgb(179 179 179)",
                    color: isError ? "red" : "#6C757D"
                  }}
                />
              </Form>
            </Col>
            <Col
              sm={6}
              md={{ span: 5, offset: 1 }}
              xl={{ span: 2, offset: 0 }}
              className="mb-4"
            >
              <Form>
                <Select
                  id="division"
                  options={[
                    { value: "All Division", label: "All Divisions" },
                    ...divisions.map((item) => ({
                      value: item,
                      label: item,
                    })),
                  ]}
                  onChange={handleDivision}
                  placeholder="Division"
                  className="custom-select w-100"
                  classNamePrefix="custom-select"
                />
              </Form>
            </Col>
            <Col sm={6} md={5} xl={2} className="mb-2">
              <Form>
                <Select
                  id="location"
                  options={[
                    { value: "All Location", label: "All Locations" },
                    ...locations.map((item) => ({
                      value: item,
                      label: item,
                    })),
                  ]}
                  onChange={handleLocation}
                  placeholder="Location"
                  className="custom-select w-100"
                  classNamePrefix="custom-select"
                />
              </Form>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default Tools;
import React from "react";
import {Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getQueryParamNames } from "../helpers/helper";
import { motion } from "framer-motion";

const ApplicationCard = ({ index, item, pathname, userInfo, name }) => {

  const navigate = useNavigate();
  const itemInfo = item[0]
  const { filterQuery, nameQuery } = getQueryParamNames(name, itemInfo);
  const isHired = item.some(i => i.hireStatus === "hired");

  return (
    <motion.div
    initial={{ opacity: 0}}
    animate={{ opacity: 1}}
    transition={{ delay: index * 0.2, duration: 0.5 }}>
      <Card
        key={index}
        sx={{
          display: "flex",
          cursor: "pointer",
          boxShadow: "2px 5px 15px rgba(0, 0, 0, .5)",
          flexDirection: "row",
        }}
        className="mb-4"
        onClick={() =>
          navigate(`${pathname}/tabs?filter=${filterQuery}&name=${nameQuery}`)
        }
      >
        <CardMedia
          component="img"
          sx={{
            width: 250,
            height: 180,
            objectFit: "cover",
          }}
          image={`${itemInfo.position.image}`}
          alt={`${itemInfo.position.title}`}
          className="d-none d-xxl-block"
        />

        <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography
              variant="h5"
              component="div"
              sx={{ color: "text.secondary" }}
            >
              {name === "title" ? itemInfo.position.title : itemInfo.position.division}
            </Typography>
            <Typography
              component="div"
              variant="subtitle2"
              sx={{ color: "text.secondary" }}
              className="mt-2"
            >
              {name === "title" ?<> <strong className="fs-6">Position Id:</strong>
              <span className="fw-bold text-black fs-6">{itemInfo.position.id}</span> </>: <>
              <strong className="fs-6">Division:</strong><span className="fw-bold text-black fs-6"> {itemInfo.position.division}</span></>}
              
            </Typography>
            <Typography
              component="div"
              variant="subtitle2"
              sx={{ color: "text.secondary" }}
              className="mt-2"
            >
              <strong className="fs-6">Application Count:</strong>{" "}
              <span className="fw-bold text-black fs-6"> {item.length}</span>
            </Typography>
            <Typography
              component="div"
              variant="subtitle2"
              sx={{ color: "text.secondary" }}
              className="mt-2"
            >
              <strong className="fs-6">Status:</strong>{" "}
              <span className="fw-bold text-black fs-6">{isHired ? <span className="text-success">Hired</span> : <span className="text-danger">Not Hired</span>}</span>
            </Typography>
            <Typography
              component="div"
              variant="subtitle2"
              sx={{ color: "text.secondary" }}
              className="mt-2"
            >
            </Typography>
          </CardContent>

        </Box>
      </Card>
    </motion.div>
  );
};

export default ApplicationCard;

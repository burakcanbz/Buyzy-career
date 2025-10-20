import React, { useState } from "react";
import { Button } from "react-bootstrap";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { motion } from "framer-motion";
import { ADMIN_URL, OPERATIONS_URL } from "../constants";
import { useNavigate } from "react-router-dom";
import { useDeletePositionMutation } from "../slices/positionApiSlice";
import ConfirmationModal from "./utils/ConfirmationModal";
import { toast } from "react-toastify";

const OperationsPositionCard = ({ position, index, buttonName, refetch }) => {
  const [deletePosition] = useDeletePositionMutation();
  const [modalShow, setModalShow] = useState(false);
  const [selectedPositionId, setSelectedPositionId] = useState(null);
  const navigate = useNavigate();

  const handleClick = async () => {
    if (buttonName === "Update") {
      navigate(`${ADMIN_URL}${OPERATIONS_URL}/${position._id}`);
    } else {
      setSelectedPositionId(position._id);
      setModalShow(true);
    }
  };

  const handleDeletePosition = async () => {
    try {
      await deletePosition({ id: selectedPositionId });
      refetch();
      toast.success("Position deleted successfully!");
      setModalShow(false);
    } catch (error) {
      toast.error("Error deleting position:", error);
    }
  };

  return (
    <motion.div
      key={position.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.5,
        delay: index * 0.2,
      }}
    >
      <Card
        sx={{
          display: "flex",
          cursor: "pointer",
          boxShadow: "2px 5px 15px rgba(0, 0, 0, .5)",
          flexDirection: "row",
        }}
        className="mb-4"
      >
        <CardMedia
          component="img"
          sx={{
            width: 200,
            height: 170,
            objectFit: "cover",
          }}
          image={`${position.image}`}
          alt={`${position.title}`}
          className="d-none d-xxl-block"
        />

        <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography
              variant="h5"
              component="div"
              style={{ fontSize: 14 }}
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                display: "block",
                maxWidth: "350px",
                color: "text.secondary",
              }}
            >
              <span className="fw-bold text-black fs-6">{position.title}</span>
            </Typography>
            <Typography
              component="div"
              variant="subtitle2"
              sx={{ color: "text.secondary" }}
              className="mt-2"
            >
              <strong className="fs-6">Division:</strong>{" "}
              <span className="fw-bold text-black fs-6">
                {position.division}
              </span>
            </Typography>
            <Typography
              component="div"
              variant="subtitle2"
              sx={{ color: "text.secondary" }}
              className="mt-2"
            >
              <strong className="fs-6">Location:</strong>{" "}
              <span className="fw-bold text-black fs-6">
                {position.location}
              </span>
            </Typography>
          </CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              padding: "0 15px 10px",
              gap: 1,
            }}
          >
            <Button
              size="sm"
              variant={buttonName === "Update" ? "success" : "danger"}
              onClick={handleClick}
            >
              {buttonName}
            </Button>
            <ConfirmationModal
              show={modalShow}
              onHide={() => setModalShow(false)}
              onConfirm={handleDeletePosition}
              positionId={selectedPositionId}
            />
          </Box>
        </Box>
      </Card>
    </motion.div>
  );
};

export default OperationsPositionCard;

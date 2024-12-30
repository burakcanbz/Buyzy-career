import React from "react";
import { Modal, Button } from "react-bootstrap";
import { Typography, Box } from "@mui/material";

const CustomModal = ({
  show,
  onHide,
  onConfirm,
  title,
  bodyContent,
  confirmText = "Yes",
  cancelText = "Cancel",
  confirmVariant = "danger",
  cancelVariant = "secondary",
  icon = null,
  buttonColor,
}) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            width="100%"
          >
            <Typography
              variant="h5"
              component="div"
              sx={{
                display: "flex",
                alignItems: "center",
                fontWeight: 550,
                color: `${buttonColor}`,
                marginRight: 1,
              }}
            >
             {icon &&  {icon} }
              {title}
            </Typography>
          </Box>
      </Modal.Header>

      <Modal.Body>
        <Typography
          variant="body1"
          sx={{ fontSize: 16, color: "#333", lineHeight: 1.6, fontWeight: 550 }}
        >
          {bodyContent}
        </Typography>
      </Modal.Body>

      {onConfirm && (
        <Modal.Footer>
            <Button
              variant={cancelVariant}
              onClick={onHide}
              style={{ backgroundColor: "#6c757d" }}
            >
              {cancelText}
            </Button>

            <Button
              variant={confirmVariant}
              onClick={onConfirm}
              style={{ backgroundColor: `${buttonColor}` }}
            >
              {confirmText}
            </Button>
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default CustomModal;

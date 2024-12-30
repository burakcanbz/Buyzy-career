import React from "react";
import CustomModal from "../general/CustomModal";

const HireModal = ({ show, handleClose, handleHire }) => {
  return (
    <CustomModal
      show={show}
      onHide={handleClose}
      onConfirm={handleHire}
      title="Hire Candidate"
      bodyContent="Do you really want to hire this candidate?"
      confirmText="Hire"
      cancelText="Cancel"
      confirmVariant="success"
      buttonColor="green"
    />
  );
};

export default HireModal;

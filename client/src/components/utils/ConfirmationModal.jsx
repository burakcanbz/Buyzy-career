import React from "react";
import CustomModal from "../general/CustomModal";

const ConfirmationModal = ({ show, onHide, onConfirm, positionId }) => {
  return (
    <CustomModal
      show={show}
      onHide={onHide}
      onConfirm={() => onConfirm(positionId)}
      title="Delete Position"
      bodyContent="Do you really want to delete this position?"
      confirmText="Yes"
      cancelText="Cancel"
      confirmVariant="danger"
      buttonColor="red"
    />
  );
};

export default ConfirmationModal;

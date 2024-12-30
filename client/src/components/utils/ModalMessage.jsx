import React, { forwardRef, useImperativeHandle, useState } from "react";
import { FcCheckmark } from "react-icons/fc";
import CustomModal from "../general/CustomModal";

const ModalMessage = forwardRef((props, ref) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useImperativeHandle(ref, () => ({
    handleShow,
  }));

  return (
    <CustomModal
      show={show}
      onHide={handleClose}
      title="Application Submitted!"
      bodyContent="Your application has been successfully submitted. We will get in touch with you soon."
      confirmText="Close"
      cancelText={null}
      icon={<FcCheckmark style={{ fontSize: 30, marginRight: 10 }} />}
      confirmVariant="success"
      buttonColor="green"
    />
  );
});

export default ModalMessage;

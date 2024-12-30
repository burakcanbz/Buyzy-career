import React from "react";
import { Alert } from "react-bootstrap";
import FormContainer from "./FormContainer";

const Message = ({ variant, children }) => {
  return (
    <FormContainer
      render={() => <Alert variant={variant}>{children}</Alert>}
    ></FormContainer>
  );
};

Message.defaultProps = {
  variant: "info",
};

export default Message;

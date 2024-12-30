import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useUpdateHireStatusMutation } from "../slices/applicationApiSlice";
import { IoMdCheckmark } from "react-icons/io";
import HireModal from "./utils/HireModal";

const HireStatus = ({ id, hireStatus, refetchApp }) => {
  const [showModal, setShowModal] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const [updateHireStatus] = useUpdateHireStatusMutation();

  const handleShow = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleHire = async () => {
    try {
      await updateHireStatus({ message: "hired", id }).unwrap();
      refetchApp(id);
      setShowModal(false);
    } catch (err) {
      setShowModal(false);
    }
  };
  return (
    <>
      {userInfo.role === "Owner" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className={`hire-section mt-3 mb-4 p-3 border rounded shadow-sm  ${
            hireStatus === "" ? "bg-light w-75" : "bg-transparent w-100 p-2"
          }`}
        >
          {hireStatus === "" ? (
            <>
              <h5 className="text-primary fw-bold mb-2">Hire Status</h5>
              <p className="text-muted">
                Candidate not hired yet. Would you like to{" "}
                <Link
                  as="button"
                  className="hire-link text-decoration-none text-primary fw-bold"
                  onClick={handleShow}
                >
                  hire
                </Link>
                ?
              </p>
            </>
          ) : (
            <div
              className="d-flex justify-content-center align-items-center p-3 rounded-3 shadow-sm"
              style={{ backgroundColor: "#d4edda", width: "auto" }}
            >
              <span
                className="text-success fs-5"
                style={{ display: "flex", alignItems: "center" }}
              >
                Candidate hired
                <IoMdCheckmark style={{ fontSize: 30, marginLeft: "10px" }} />
              </span>
            </div>
          )}
          <HireModal
            show={showModal}
            handleClose={handleClose}
            handleHire={handleHire}
          />
        </motion.div>
      )}
    </>
  );
};

export default HireStatus;

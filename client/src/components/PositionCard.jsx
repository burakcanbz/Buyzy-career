import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { CardTitle } from "react-bootstrap";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { convertFromPositionToURL } from "../helpers/helper";
import { POSITIONS_URL } from "../constants";
import { useDispatch } from "react-redux";
import { clearSearchItems } from "../slices/positionsSlice";
import {
  Box,
  Button,
  CardContent,
  CardMedia,
  Typography,
  Tooltip,
} from "@mui/material";
import StyledCard from "../styledComponents/styledCard";


const PositionCard = ({ position, index }) => {
  const [disable, setDisable] = useState("");
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const textRef = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLink = () => {
    dispatch(clearSearchItems());
    navigate(
      `${POSITIONS_URL}/${position.id}/${convertFromPositionToURL(
        position.title
      )}`
    );
  };

  const handleClick = (e) => {
    e.stopPropagation();
    window.open(`/${position.id}/apply`);
  };

  const handleMouseEnter = () => {
    if (isOverflowing) {
      setTooltipOpen(true);
    }
  };

  const handleMouseLeave = () => {
    setTooltipOpen(false);
  };

  useEffect(() => {
    const checkOverflow = () => {
      if (textRef.current) {
        setIsOverflowing(
          textRef.current.scrollWidth > textRef.current.clientWidth // check if unvisible area bigger than visible area
        );
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    
    return () => {
      window.removeEventListener("resize", checkOverflow);
    };
  }, [position?.title]);

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
      }}
    >
      <StyledCard className="job-item" onClick={handleLink}>
        <CardMedia
          component="img"
          sx={{ width: 130 }}
          image={`${position?.image}`}
          alt={position?.title}
        />
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <Tooltip
            title={position?.title}
            open={tooltipOpen}
            onClose={handleMouseLeave}
            onOpen={handleMouseEnter}
            arrow
          >
            <CardTitle
              sx={{ maxHeight: "100px", marginBottom: 0 }}
              className={`${disable} mt-1`}
            >
              <Typography
                style={{ fontSize: 14 }}
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  display: "block",
                  maxWidth: "250px",
                }}
                className="fw-bold ms-3"
                ref={textRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {position?.title}
              </Typography>
            </CardTitle>
          </Tooltip>

          <CardContent sx={{ paddingTop: 0, paddingBottom: 0, paddingLeft: 2 }}>
            <Typography
              variant="subtitle2"
              component="div"
              className="text-muted"
            >
              <small>
                {position?.division} / {position?.location}
              </small>
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Typography
                variant="subtitle2"
                component="div"
                sx={{
                  width: "calc(100% - 100px)",
                  height: "50px",
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 3,
                  textOverflow: "ellipsis",
                  marginTop: 0,
                  marginBottom: 0,
                  lineHeight: 1.2,
                }}
                className={`${disable}`}
              >
                <small>
                  {position?.summary}
                </small>
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  marginLeft: 2,
                  gap: 1,
                }}
              >
                <Box>
                  <Button
                    sx={{
                      color: "inherit",
                      backgroundColor: "transparent",
                      // marginTop: -1,
                      fontSize: 15,
                      ":hover": {
                        backgroundColor: "transparent",
                      },
                    }}
                    size="sm"
                  >
                    <FaArrowRight className={`${disable}`} />
                  </Button>
                </Box>
                {/* <Box className="d-flex justify-content-center">
                  <GradientButton
                    $radius={"80px"}
                    $paddingLeft={"0px"}
                    $paddingRight={"0px"}
                    $padding={"0px"}
                    
                  >
                      <IoNavigateCircleSharp onClick={handleClick}
                    onMouseEnter={() => setDisable("text-black")}
                    onMouseLeave={() => setDisable("text-blue")} style={{fontSize: 24}}/>
                  </GradientButton>
                </Box> */}
              </Box>
            </Box>
          </CardContent>
        </Box>
      </StyledCard>
    </motion.div>
  );
};

export default PositionCard;

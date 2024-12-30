import styled from "styled-components";
import { Card } from "@mui/material";

const StyledCard = styled(Card)(({ theme, dynamicWidth, dynamicHeight, customShadow }) => ({
    display: "flex",
    marginBottom: 20,
    maxWidth: dynamicWidth || "500px", 
    minWidth: "375px",
    height: dynamicHeight || "120px", 
    borderRadius: 5,
    boxShadow: customShadow || "2px 2px 5px rgba(0, 0, 0, .5)"
  }));
  
  export default StyledCard;
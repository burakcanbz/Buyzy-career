import styled from "styled-components";

// Using a function to access props in the styled component
const GradientButton = styled.button`
  position: relative;
  display: inline-block;
  padding: ${(props) => props.$padding || '7px'};
  font-size: 16px;
  cursor: pointer;
  overflow: hidden;
  color: white;
  z-index: 1;
  border: none;
  margin-left: -5px;
  border-radius:  ${(props) => props.$radius || '80px'};
  padding-left: ${(props) => props.$paddingLeft || '22px'};
  padding-right: ${(props) => props.$paddingRight || '22px'};
  transition: color 0.3s ease;
  background: ${(props) => props.$background || 'rgb(163, 166, 168)'};

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: ${(props) =>
      props.$hoverGradient || "linear-gradient(to right, #0D6EFD,rgb(52, 69, 218))"};
    z-index: -1;
    transition: left 0.5s ease;
  }

  &:hover::before {
    left: 0;
  }

  &:hover {
    color: #fff; 
  }
`;

export default GradientButton;

import homeImg from "../../assets/home.jpg";
import GradientButton from "../../styledComponents/gradientButton";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        backgroundImage: `url(${homeImg})`,
        width: "100%",
        minHeight: "90dvh",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <motion.h1
        initial={{ x: "-100vw" }}
        animate={{ x: 0 }}
        transition={{ type: "tween", duration: 0.8, ease: "anticipate" }}
        className="fw-bold text-center"
        style={{
          marginTop: "-40px",
          fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
          color: "#ffffffff",
          textShadow: "5px 5px 5px rgba(0, 0, 0, 0.7)",
          padding: "0 1rem",
        }}
      >
        Welcome to Buyzy Career
      </motion.h1>
      <motion.div
      initial={{ x: "-100vw" }}
        animate={{ x: 0 }}
        transition={{ type: "tween", duration: 0.8, ease: "anticipate" }}>
      <GradientButton
        $padding="12px"
        $background="linear-gradient(to right, #dd920fff, #e46d06ff)"
        $hoverGradient="linear-gradient(to right, #dd920fff, #e46d06ff)"
        onClick={() => {
          navigate("/open-positions");
        }}
      >
        <span style={{ fontSize: 18 }}>Explore Jobs</span>
      </GradientButton>
      </motion.div>
    </div>
  );
};

export default Home;

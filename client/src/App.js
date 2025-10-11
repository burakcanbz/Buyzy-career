import React, { Profiler } from "react";
import { Outlet } from "react-router-dom";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import Footer from "./components/organisms/Footer";
import Header from "./components/organisms/Header";
import 'react-toastify/dist/ReactToastify.css'; 
import "./App.css";

const theme = createTheme({
  typography: {
    fontFamily: "'Satoshi', sans-serif",
  },
});


const App = () => {
  return (
    <>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div
        className="d-flex flex-column"
        style={{
          minHeight: "100vh",
          backgroundColor: "rgba(240, 240, 240)",
        }}
      >
        <Header />
        <main
          style={{ flexGrow: 1, marginTop: 105 }}
        >
          <Outlet />
        </main>
        <Footer />
      </div>
      <ToastContainer />
    </ThemeProvider>
    </>
  );
}

export default App;

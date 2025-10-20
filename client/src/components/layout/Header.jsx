import React, { useState } from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../slices/authSlice";
import { useLogoutMutation } from "../../slices/authApiSlice";
import { toast } from "react-toastify";
import logo from "../../assets/buyzy.png";

const Header = () => {
  const [isActive, setIsActive] = useState(0);
  const [openDropdown, setOpenDropdown] = useState(null);
  const { userInfo } = useSelector((state) => state.auth);
  const [logoutApiCall] = useLogoutMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await logoutApiCall().unwrap(); // without unwrap the logoutApiCall returns redux action object, with it, it returns promise-like object
      dispatch(logout());
      toast.error(`${userInfo?.role} ${userInfo?.type} logged out`)
      navigate("/admin-panel");
    } catch (err) {
      throw new Error(err);
    }
  };

  const handleShow = (id) => {
    if (openDropdown === id) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(id);
    }
  };

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <header>
      <Navbar
        variant="dark"
        expand="lg"
        className="d-flex shadow-sm"
        collapseOnSelect
        style={{
          backgroundColor: "#393D47",
          opacity: 0.96,
        }}
      >
        <Navbar.Brand
          name="home"
          className=" nav-brand d-flex align-items-center justify-content-center"
          onClick={() => handleClick("/")}
        >
          <img
            src={logo}
            alt="Logo"
            className="ms-md-3 ms-3"
            style={{
              maxHeight: 80,
              borderRadius: 50,
              cursor: "pointer",
            }}
          />
            <h2 className="brand ms-md-3 ms-2 my-2" style={{ cursor: "pointer"}}>Buyzy</h2>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="ms-5 d-lg-flex justify-content-lg-end text-sm-end"
          style={{ marginRight: 50 }}
        >
          <Nav>
            <NavDropdown
              className="my-dropdown me-3"
              onMouseEnter={() => handleShow("about")}
              onMouseLeave={() => handleShow(null)}
              onClick={() => handleShow("about")}
              show={openDropdown === "about"}
              title={<span style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>ABOUT US</span>}
              id="collapsible-nav-dropdown"
            >
              <NavDropdown.Item
                className={`my-dropdown-item ${isActive === 1 ? "active" : ""} mb-1`}
                onClick={() => {
                  handleClick("/offices"); 
                  setIsActive(1); 
                }}
              >
                Office
              </NavDropdown.Item>
              <NavDropdown.Item
                className={`my-dropdown-item ${isActive === 2 ? "active" : ""} mb-1`}
                onClick={() => { 
                  handleClick("/news");
                  setIsActive(2); 
                  }}
              >
                Announcements
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown
              className="my-dropdown me-3"
              onMouseEnter={() => handleShow("games")}
              onMouseLeave={() => handleShow(null)}
              onClick={() => handleShow("games")}
              show={openDropdown === "games"}
              title={<span style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>NEWS</span>}
              id="collapsible-nav-dropdown"
            >
              <NavDropdown.Item
                className={`my-dropdown-item ${isActive === 3 ? "active" : ""} mb-1`}
                onClick={() => {
                  handleClick("/games/royal-match");
                  setIsActive(3)}}
              >
                Talent Program
              </NavDropdown.Item>
              <NavDropdown.Item
                className={`my-dropdown-item ${isActive === 4 ? "active" : ""}`}
                onClick={() => {
                  handleClick("/games/royal-kingdom")
                  setIsActive(4)}}
              >
                Bootcamp
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown
              className="my-dropdown me-3"
              onMouseEnter={() => handleShow("careers")}
              onMouseLeave={() => handleShow(null)}
              onClick={() => handleShow("careers")}
              show={openDropdown === "careers"}
              title={<span style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>CAREERS</span>}
              id="collapsible-nav-dropdown"
            >
              <NavDropdown.Item
                className={`my-dropdown-item ${isActive === 5 ? "active" : ""} mb-1`}
                onClick={() => { 
                  handleClick("/life-at-buyzy")
                  setIsActive(5)}}
              >
                Life at Buyzy
              </NavDropdown.Item>
              <NavDropdown.Item
                className={`my-dropdown-item ${isActive === 6 ? "active" : ""} mb-1`}
                onClick={() => { 
                  handleClick("/summer-internship");
                  setIsActive(6)}}
              >
                Summer Internship
              </NavDropdown.Item>
              <NavDropdown.Item
                className={`my-dropdown-item ${isActive === 7 ? "active" : ""} mb-1`}
                onClick={() => {
                  handleClick("/open-positions")
                  setIsActive(7)}}
              >
                Jobs
              </NavDropdown.Item>
            </NavDropdown>

            {userInfo && (
              <>
                <NavDropdown
                  className="my-dropdown me-3"
                  onMouseEnter={() => handleShow("admin")}
                  onMouseLeave={() => handleShow(null)}
                  onClick={() => handleShow("admin")}
                  show={openDropdown === "admin"}
                  title={<span style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>ADMIN</span>}
                  id="collapsible-nav-dropdown"
                >
                  <NavDropdown.Item
                    className={`my-dropdown-item ${isActive === 8 ? "active" : ""} mb-1`}
                    onClick={() => {
                      handleClick("/admin/applications");
                      setIsActive(8)}}>
                    Applications
                  </NavDropdown.Item>
                  { userInfo.role === "Owner" && 
                  <NavDropdown.Item
                  className={`my-dropdown-item ${isActive === 9 ? "active" : ""} mb-1`}
                  onClick={() => {
                    handleClick("/admin/operations");
                    setIsActive(9)}}>
                  Operations
                 </NavDropdown.Item>
                  }
                </NavDropdown>
                <NavDropdown
                  className="my-dropdown me-3 toggle-none"
                  onClick={handleLogout}
                  title={<span style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>LOGOUT</span>}
                />
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Header;

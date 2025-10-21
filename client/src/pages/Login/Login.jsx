import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { BiLogIn } from "react-icons/bi";
import { useLoginMutation } from "../../slices/authApiSlice";
import { setCredentials } from "../../slices/authSlice";
import { toast } from "react-toastify";
import buyzy from "../../assets/buyzy-ref.png";
import Loading from "../../components/utils/Loading";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [userInfo, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate('/');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };


  return (
    <>
      <Row className="d-flex justify-content-center">
        <Col md={3}>
          <Card
            className="border-0 my-5 p-3 rounded shadow-lg d-flex justify-content-center align-items-center"
            style={{ backgroundImage: `url(${buyzy})`, backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center", minHeight: 500 }}>
            <span className="fs-4 fw-bold text-muted">Admin Panel</span>
            <BiLogIn style={{ fontSize: 64, marginTop: 10, marginBottom: 4 }} />
            <h1 className="fw-bold text-black">Sign In</h1>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="email" className="my-3">
                <Form.Label className="fw-bold">Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  style={{ border: "2px solid black"}}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="password" className="my-3">
                <Form.Label className="fw-bold">Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  style={{ border: "2px solid black"}}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                ></Form.Control>
              </Form.Group>

              <Button
                type="submit"
                variant="primary"
                className="mt-2"
                disabled={isLoading}
              >
                Sign In
              </Button>
              {isLoading && <Loading />}
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Login;
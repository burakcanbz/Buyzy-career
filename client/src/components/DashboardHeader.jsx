import React from "react";
import { Carousel, Row, Col, Image } from "react-bootstrap";
import { images } from "../data/carouselImages.js";
import { motion } from "framer-motion";

const DashboardHeader = () => {
  return (
    <section>
      <Row className="h-100">
        <Col md={12} className="position-relative h-100">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          > 
            <Carousel
              hover="pause"
              className="d-flex justify-content-center align-items-center shadow-lg"
              style={{
                height: "500px",
                border: "none",
              }}
            >
              {images.map((item) => {
                return (
                  <Carousel.Item
                  className="carousel-item"
                    key={item.id}
                    style={{ height: "500px", position: "relative" }}
                  >
                      <Image
                        key={item.id}
                        src={item.src}
                        alt={item.alt}
                        fluid
                        style={{
                          height: "100%",
                          width: "100%",
                          objectFit: "cover",
                        }}
                      />

                      <Carousel.Caption
                        className="carousel-caption"
                      >
                        <motion.h1
                        initial={{ y: "-100vh" }}
                        animate={{ y: "0vh" }}
                        transition={{ type: "spring", stiffness: 250, delay: 0.1 }}
                        className="fw-bold" style={{ fontSize: "3.5rem", color: "white", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)" }}
                      >
                         JOBS
                      </motion.h1>

                      </Carousel.Caption>
                  </Carousel.Item>
                );
              })}
            </Carousel>
          </motion.div>
        </Col>
      </Row>
    </section>
  );
};

export default DashboardHeader;

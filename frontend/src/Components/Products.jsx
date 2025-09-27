import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const Products = () => {
  const { cartItems, addToCart } = useCartStore();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products`)
      .then((res) => {
        if (Array.isArray(res.data)) {
          setProducts(res.data);
        } else {
          console.error("Unexpected API response:", res.data);
        }
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, []);

  const handleAddtoCart = (item) => {
    addToCart(item);
  };

  const isInCart = (item) => {
    return cartItems.some((cartItem) => cartItem.id === item.id);
  };

  return (
    <Container className="my-4">
      <Row className="g-4">
        {products.map((item) => (
          <Col key={item.id} xs={12} sm={6} md={4}>
            <Card className="h-100 shadow-sm">
              <Card.Img
                variant="top"
                src={item.image}
                style={{
                  height: "220px",
                  objectFit: "contain",
                  padding: "10px",
                }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title style={{ fontSize: "16px", minHeight: "50px" }}>
                  {item.title}
                </Card.Title>
                <Card.Text className="fw-bold">₹{item.price}</Card.Text>

                <div className="mt-auto">
                  {isInCart(item) ? (
                    <Link to="/cart">
                      <Button variant="success" className="w-100">
                        Go to Cart
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      variant="primary"
                      className="w-100"
                      onClick={() => handleAddtoCart(item)}
                    >
                      Add to Cart
                    </Button>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Products;

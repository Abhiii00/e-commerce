import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { useCartStore } from "../store/cartStore";
import {
  Container,
  Table,
  Button,
  Row,
  Col,
  Card,
  Form,
} from "react-bootstrap";

import config from '../config/config'



const Cart = () => {
  const [email, setEmail] = useState("");

  const { cartItems, removeCartItem, clearCart, incItemQty, decItemQty } =
    useCartStore();

  let sum = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleRemoveCartItems = (e, item) => {
    e.preventDefault();
    removeCartItem(item);
  };

  const handleClearCart = (e) => {
    e.preventDefault();
    clearCart();
  };

  const handleIncQty = (e, item) => {
    e.preventDefault();
    incItemQty(item);
  };

  const handleDecQty = (e, item) => {
    e.preventDefault();
    decItemQty(item);
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    try {
      if (!email) {
        alert("Email is Required");
        return;
      }

      const body = {
        products: cartItems,
        email: email,
      };
      const headers = {
        "Content-Type": "application/json",
      };
      const response = await fetch("http://localhost:3000/paymentCheckout", {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });

      const stripe = await loadStripe('');

      const session = await response.json();
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        alert("Failed to redirect to checkout.");
      } else {
        setTimeout(() => {
          clearCart();
        }, 1000);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Your Cart</h2>

      {cartItems.length === 0 ? (
        <h4 className="text-center text-muted">Your cart is empty</h4>
      ) : (
        <>
          {/* Cart Table */}
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Product</th>
                <th className="text-center">Price</th>
                <th className="text-center">Quantity</th>
                <th className="text-end">Total</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((cartItem) => (
                <tr key={cartItem.id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src={cartItem.image}
                        alt={cartItem.name}
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "contain",
                          marginRight: "10px",
                        }}
                      />
                      <div>
                        <strong>{cartItem.name}</strong>
                        <div className="text-muted">{cartItem.desc}</div>
                        <Button
                          variant="link"
                          size="sm"
                          className="p-0 text-danger"
                          onClick={(e) => handleRemoveCartItems(e, cartItem)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </td>

                  <td className="text-center">₹{cartItem.price}</td>

                  <td className="text-center">
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={(e) => handleDecQty(e, cartItem)}
                    >
                      -
                    </Button>
                    <span className="mx-2">{cartItem.quantity}</span>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={(e) => handleIncQty(e, cartItem)}
                    >
                      +
                    </Button>
                  </td>

                  <td className="text-end fw-bold">
                    ₹{cartItem.price * cartItem.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Summary Section */}
          <Row className="mt-4">
            <Col md={6}>
              <Button
                variant="outline-danger"
                onClick={(e) => handleClearCart(e)}
              >
                Clear Cart
              </Button>
            </Col>
            <Col md={6}>
              <Card className="p-3 shadow-sm">
                <h5 className="d-flex justify-content-between">
                  <span>Payable Amount:</span>
                  <span className="fw-bold">₹{sum}</span>
                </h5>

                <Form.Group className="mt-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Please enter your email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  className="mt-3 w-100"
                  onClick={(e) => handleCheckout(e)}
                >
                  Check Out
                </Button>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default Cart;

import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCartStore } from "../store/cartStore";
import { Navbar, Container, Nav, Badge } from "react-bootstrap";

const AppNavbar = () => {
  const { cartItems } = useCartStore();
  const length = cartItems.length;

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Shopping Cart
        </Navbar.Brand>

        <Nav className="ms-auto">
          <Nav.Link as={Link} to="/cart" className="d-flex align-items-center">
            <ShoppingCartIcon />
            <Badge bg="light" text="dark" className="ms-1">
              {length}
            </Badge>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;

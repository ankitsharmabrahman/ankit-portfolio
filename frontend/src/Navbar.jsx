
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';

function MyNavbar() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar
        expand="lg"
        className="bg-body-tertiary shadow-sm"
        sticky="top"
      >
        <Container fluid>
          <Navbar.Brand href="#home" className="fw-bold">
            Ankit Sharma
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbarScroll" />

          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#about">About</Nav.Link>
              <Nav.Link href="#contact">Contact</Nav.Link>
            </Nav>

            <Form
              className="d-flex me-lg-3 mb-3 mb-lg-0"
              onSubmit={(e) => e.preventDefault()}
            >
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success" type="submit">
                Search
              </Button>
            </Form>

            <Button
              className="admin-login-btn"
              onClick={() => navigate('/admin-login')}
            >
              <span className="admin-icon">⚡</span>
              Admin Login
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <style>{`
        .admin-login-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px 18px;
          border: none;
          border-radius: 12px;
          color: white;
          font-weight: 700;
          background: linear-gradient(135deg, #6366f1, #9333ea);
          box-shadow: 0 4px 15px rgba(99, 102, 241, 0.25);
          transition: all 0.25s ease;
          white-space: nowrap;
        }

        .admin-login-btn:hover {
          color: white;
          background: linear-gradient(135deg, #4f46e5, #7e22ce);
          box-shadow: 0 8px 22px rgba(99, 102, 241, 0.4);
          transform: translateY(-2px);
        }

        .admin-login-btn:active {
          transform: scale(0.97);
        }

        .admin-icon {
          font-size: 16px;
        }

        @media (max-width: 991px) {
          .admin-login-btn {
            width: 100%;
            margin-bottom: 12px;
          }
        }
      `}</style>
    </>
  );
}

export default MyNavbar;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import Modal from "../Modal";
import Cart from "../screens/Cart";
import { useCart } from "../components/ContextReducer";

export default function Navbar() {
  let data = useCart();
  const [cartView, setCartView] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <>
      <style>
        {`
          body {
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
              'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
              sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            font-family: 'NHaasGrateskDSPro-65Md' !important;
          }

          code {
            font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
              monospace;
          }

          #carousel {
            max-height: 100px;
          }

          /* Custom Navbar Styling */
          .custom-navbar {
            background-color: black; /* Black background */
          }

          .navbar-brand, .nav-link, .btn {
            color: white !important; /* White font color */
          }

          .navbar-brand:hover, .nav-link:hover, .btn:hover {
            color: #ddd !important; /* Lighter font color on hover */
          }

          .custom-btn {
            background-color: white;
            color: black !important;
            border: none;
          }

          .custom-btn:hover {
            background-color: #f8f9fa; /* Light gray background on hover */
            color: black !important;
          }

          .badge-danger {
            background-color: red; /* Red badge color */
          }
        `}
      </style>
      <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
        <div className="container-fluid d-flex align-items-center">
          <Link className="navbar-brand fs-1" to="/">
            FlavorEase
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse d-flex justify-content-between"
            id="navbarNav"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex align-items-center">
              <li className="nav-item">
                <Link
                  className="nav-link fs-3 active"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              {localStorage.getItem("authToken") ? (
                <li className="nav-item">
                  <Link
                    className="nav-link fs-5 active"
                    aria-current="page"
                    to="/myOrder"
                  >
                    My Orders
                  </Link>
                </li>
              ) : null}
            </ul>

            <div className="d-flex align-items-center">
              {!localStorage.getItem("authToken") ? (
                <>
                  <Link
                    className="btn custom-btn mx-1"
                    aria-current="page"
                    to="/Login"
                  >
                    Login
                  </Link>
                  <Link
                    className="btn custom-btn mx-1"
                    aria-current="page"
                    to="/Signup"
                  >
                    Signup
                  </Link>
                </>
              ) : (
                <>
                  <div
                    className="btn custom-btn mx-2"
                    onClick={() => setCartView(true)}
                  >
                    My Cart {"  "}
                    <Badge pill bg="danger">
                      {data.length}
                    </Badge>
                  </div>
                  {cartView ? (
                    <Modal onClose={() => setCartView(false)}>
                      <Cart />
                    </Modal>
                  ) : null}
                  <div className="btn custom-btn mx-2" onClick={handleLogout}>
                    Logout
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header = ({ isAuthenticated, onLogout }) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <header className="bg-primary text-white py-4">
      <div className="container">
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-between">
          
          <div className="text-center text-md-left mb-3 mb-md-0">
            <img
              src="./assets/logo.jpeg"
              alt="Library Logo"
              className="img-fluid rounded-circle"
              style={{
                maxHeight: "100px",
                width: "100px",
                height: "100px",
              }}
            />
          </div>

          
          <div className="text-center flex-grow-1">
            <h1 className="m-0" style={{ fontSize: "2rem" }}>
              Library Management System
            </h1>
          </div>

          <div className="text-center text-md-right">
            <nav className="navbar navbar-expand-md navbar-light p-0">
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto">
                
                  {!isHomePage && (
                    <li className="nav-item">
                      <Link
                        to="/"
                        className="nav-link text-white btn btn-outline-light mb-2 mb-md-0"
                        style={{
                          fontSize: "0.8rem",
                          padding: "12px 20px",
                          borderRadius: "25px",
                          backgroundColor: "#003366",
                          transition: "background-color 0.3s ease, transform 0.3s ease",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Go to Home
                      </Link>
                    </li>
                  )}

                
                  <li className="nav-item ml-md-2">
                    <Link
                      to="/register"
                      className="nav-link text-white btn btn-outline-light mb-2 mb-md-0"
                      style={{
                        fontSize: "0.8rem",
                        padding: "12px 20px",
                        borderRadius: "25px",
                        backgroundColor: "#003366",
                        transition: "background-color 0.3s ease, transform 0.3s ease",
                      }}
                    >
                      Register
                    </Link>
                  </li>

                  {!isHomePage && (
                    <li className="nav-item ml-md-2">
                      <Link
                        to="/login"
                        className="nav-link text-white btn btn-outline-light mb-2 mb-md-0"
                        style={{
                          fontSize: "0.8rem",
                          padding: "12px 20px",
                          borderRadius: "25px",
                          backgroundColor: "#003366",
                          transition: "background-color 0.3s ease, transform 0.3s ease",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Logout
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

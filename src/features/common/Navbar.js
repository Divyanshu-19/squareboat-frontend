import React from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { authState, setAuthState } = useAuth();

  const handleLogout = () => {
    console.log("logout");
    localStorage.removeItem("token");
    setAuthState({ type: "LOGOUT" });
    navigate("/products");
  };

  return (
    <div>
      <nav
        className="navbar navbar-dark bg-dark"
        style={{ display: "flex", justifyContent: "right" }}
      >
        <div className="d-flex align-items-center">
          {authState.isAuthenticated ? (
            <>
              <button
                type="button"
                className="btn btn-primary px-3 me-2"
                onClick={() => navigate("/pastorders")}
              >
                Order History
              </button>
              <button
                type="button"
                className="btn btn-link me-3"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className="btn btn-link px-3 me-2"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                type="button"
                className="btn btn-primary me-3"
                onClick={() => navigate("/signup")}
              >
                Sign up for free
              </button>
            </>
          )}
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

export default Navbar;

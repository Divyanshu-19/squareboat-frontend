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
    navigate("na/products");
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
                onClick={() => navigate("na/pastorders")}
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
                onClick={() => navigate("na/login")}
              >
                Login
              </button>
              <button
                type="button"
                className="btn btn-primary me-3"
                onClick={() => navigate("na/signup")}
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

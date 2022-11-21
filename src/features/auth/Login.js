import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "../../config/config";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const formValidation = () => {
    if (!email) {
      setError("Email cannot be empty");
      return -1;
    }
    if (!password) {
      setError("Password cannot be empty");
      return -1;
    }
  };

  const handleSubmitButton = async (e) => {
    e.preventDefault();
    const validation = formValidation();
    if (validation === -1) {
      return;
    }
    setLoading(true);
    setError("");
    try {
      const { status, statusText, data } = await axios.post(
        `${config.URL}/api/v1/user/login`,
        {
          email,
          password,
        }
      );
      console.log({ status, statusText, data });
      if (status === 200) {
        localStorage.setItem("token", data.result.token);
        navigate("/products");
      } else {
        setError("Error fetching data from server. Please try again later...");
      }
    } catch {
      setError("Problem connecting to internet. Please try after some time...");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="text-center"
      style={{ height: "100vh", padding: "10vh 0 20vh 0" }}
    >
      <div
        className="mx-auto my-5"
        style={{
          maxWidth: "540px",
          padding: "10vh 5vh",
          border: "1px solid black",
        }}
      >
        <form onSubmit={handleSubmitButton}>
          <div className="h3 mb-4">Welcome back!</div>
          <input
            id="email"
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="form-control mb-4"
            placeholder="Email"
            aria-label="Email"
            aria-describedby="basic-addon1"
          ></input>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="form-control mb-4"
            placeholder="Password"
            aria-label="Password"
            aria-describedby="basic-addon1"
          ></input>
          <button
            type="Submit"
            className="btn btn-primary mb-4"
            disabled={loading}
          >
            {loading ? `Loading...` : `Login`}
          </button>
          {error ? <div className="text-danger">{`*${error}`}</div> : null}
        </form>
        <button
          type="button"
          className="btn btn-link mb-4"
          onClick={() => navigate("/signup")}
        >
          Not Registered? SignUp..
        </button>
      </div>
    </div>
  );
};

export default Login;

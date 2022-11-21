import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "../../config/config";

const SignUp = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const formValidation = () => {
    if (!name) {
      setError("Name cannot be empty");
      return -1;
    }
    if (!email) {
      setError("Email cannot be empty");
      return -1;
    }
    if (!password) {
      setError("Password cannot be empty");
      return -1;
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setError("Email not valid");
      return -1;
    }
    if (password !== confirmPassword) {
      setError("Password do not match");
      return -1;
    }
    return 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const valid = formValidation();
    if (valid === -1) {
      setLoading(false);
      return;
    }
    try {
      const { status, statusText, data } = await axios.post(
        `${config.URL}/api/v1/user/register`,
        {
          name,
          email,
          password,
        }
      );
      console.log({ status, statusText, data });
      if (status >= 200 && status <= 300) {
        if (data.status === "OK") {
          navigate("/na/login");
        } else {
          setError(data.msg);
        }
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
        className="mx-auto my-5 px-4 py-4"
        style={{ maxWidth: "540px", border: "1px solid black" }}
      >
        <div className="h3 mb-4">SignUp</div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="form-control mb-4"
            placeholder="Name"
            aria-label="Name"
            aria-describedby="basic-addon1"
          ></input>
          <input
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="form-control mb-4"
            placeholder="Email"
            aria-label="Email"
            aria-describedby="basic-addon1"
          ></input>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="form-control mb-4"
            placeholder="Password"
            aria-label="Password"
            aria-describedby="basic-addon1"
          ></input>
          <input
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            className="form-control mb-4"
            placeholder="Confirm Password"
            aria-label="Confirm Password"
            aria-describedby="basic-addon1"
          ></input>
          <button
            type="Submit"
            className="btn btn-primary mb-4"
            disabled={loading}
          >
            {loading ? `Loading...` : `SignUp`}
          </button>
          {error ? <div className="text-danger">{`*${error}`}</div> : null}
        </form>
        <button
          type="button"
          className="btn btn-link mb-4"
          onClick={() => navigate("/na/login")}
        >
          Already Registered? SignIn
        </button>
      </div>
    </div>
  );
};

export default SignUp;

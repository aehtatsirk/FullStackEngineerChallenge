import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { LOGIN } from "../graphql";

export default function ({ history }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [login] = useMutation(LOGIN);

  const submitHandler = (e) => {
    e.preventDefault();
    login({ variables: { username, password } })
      .then((response) => {
        const { token, userId } = response.data.login;
        if (token) {
          localStorage.setItem("token", token);
          localStorage.setItem("userId", userId);
          history.push(`/employee/${userId}`);
        } else {
          setError("Invalid Credentials");
          setUsername("");
          setPassword("");
        }
      })
      .catch((err) => {
        setError(err.message);
        setUsername("");
        setPassword("");
      });
  };

  return (
    <form onSubmit={submitHandler}>
      {error && <p className="text-danger">{error}</p>}
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          className="form-control"
          name="username"
          required
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-control"
          name="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
      &nbsp;
      <NavLink to="/create-account" className="btn btn-secondary">
        Create Account
      </NavLink>
    </form>
  );
}

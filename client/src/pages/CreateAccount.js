import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_ACCOUNT } from "../graphql";
import { NavLink } from "react-router-dom";

export default function ({ history }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [name, setName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [createEmployee] = useMutation(CREATE_ACCOUNT);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const employee = {
      username,
      password,
      isAdmin,
      name,
      jobTitle,
    };
    createEmployee({
      variables: { employee },
    })
      .then((res) => {
        if (res.data.createEmployee) {
          setInfo("Successfully created account with username: ");
          document.getElementById("create-button").disabled = true;
        }
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="disabled">
      {info && (
        <fieldset>
          <p className="text-success">
            {info} <span className="font-weight-bold">{username}. </span>
          </p>
        </fieldset>
      )}
      {error && <p className="text-danger">{error}</p>}
      <div className="form-row">
        <div className="col-md-6 mb-3">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            name="username"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="jobTitle">Job Title</label>
          <input
            type="text"
            className="form-control"
            name="jobTitle"
            onChange={(e) => setJobTitle(e.target.value)}
          />
        </div>
        <div className="col-md-6 mb-3">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              name="isAdmin"
              onChange={(e) => setIsAdmin(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="isAdmin">
              Administrator Account
            </label>
          </div>
        </div>
      </div>
      <div className="form-group row">
        <div className="col-sm-10">
          <button className="btn btn-primary" type="submit" id="create-button">
            Create Account
          </button>
          &nbsp;
          <NavLink to="/login" className="btn btn-secondary">
            Go back to Login
          </NavLink>
        </div>
      </div>
    </form>
  );
}

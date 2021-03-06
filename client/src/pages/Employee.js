import React from "react";
import { GET_EMPLOYEE } from "../graphql";
import { useQuery } from "@apollo/react-hooks";
import { NavLink } from "react-router-dom";

export default function ({ match: { params } }) {
  const { loading, error, data } = useQuery(GET_EMPLOYEE, {
    skip: !params.employeeId,
    variables: { id: params.employeeId },
  });

  let content;

  if (!data) {
    content = <p>No Employee data available</p>;
  } else if (loading) {
    content = <p>Loading Employee Details</p>;
  } else if (error) {
    content = <p>Error loading Employee Details</p>;
  } else {
    const {
      employee: { username, name, jobTitle, id, feedbackRequests },
    } = data;

    content = (
      <fieldset>
        <p>Username: {username}</p>
        <p>Name: {name}</p>
        <p>Job Title: {jobTitle}</p>
        <NavLink to={`/performance/${id}`} className="btn btn-info">
          Perfomance Review
        </NavLink>
        {feedbackRequests && feedbackRequests.length > 0 && (
          <div>
            <h4>Feedback Requests</h4>
            <ul>
              {feedbackRequests.map((item, i) => (
                <li key={i}>
                  <p>{item.performanceId}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </fieldset>
    );
  }

  return content;
}

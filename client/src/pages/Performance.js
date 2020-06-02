import React from "react";
import { GET_PERFORMANCE } from "../graphql";
import { useQuery } from "@apollo/react-hooks";
import { NavLink } from "react-router-dom";

export default function ({ match: { params } }) {
  const { loading, error, data } = useQuery(GET_PERFORMANCE, {
    skip: !params.employeeId,
    variables: { employeeId: params.employeeId },
  });

  let content;

  if (!data || !data.performance) {
    content = (
      <fieldset>
        <p>No Performance available. </p>
        <NavLink to="/create-performance" className="btn btn-primary">
          Create Performance Review
        </NavLink>
      </fieldset>
    );
  } else if (loading) {
    content = <p>Loading Performance Details</p>;
  } else if (error) {
    content = <p>Error loading Performance Details</p>;
  } else {
    const {
      performance: {
        technicalSkill,
        softSkill,
        attendance,
        qualityOfWork,
        overallScore,
        feedbackList,
      },
    } = data;

    content = (
      <fieldset>
        <legend>Performance Review</legend>
        <p>Technical Skill: {technicalSkill}</p>
        <p>Soft Skill: {softSkill}</p>
        <p>Attendance: {attendance}</p>
        <p>Quality of Work: {qualityOfWork}</p>
        <p className="font-weight-bold">Overall Score: {overallScore}</p>
        {feedbackList && feedbackList.length > 0 ? (
          <div>
            <h4>Feedbacks</h4>
            <ul>
              {feedbackList.map((item) => (
                <li key={item.id}>
                  <p>Reviewer: {item.reviewerId}</p>
                  <p>Comment: {item.comment}</p>
                  <p>Status: {item.isSubmitted ? "Submitted" : "Pending"}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <NavLink to="/assign-feedback" className="btn btn-primary">
            Assign Employee for Feedback
          </NavLink>
        )}
      </fieldset>
    );
  }

  return content;
}

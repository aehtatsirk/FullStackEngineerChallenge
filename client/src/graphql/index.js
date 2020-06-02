import gql from "graphql-tag";

const LOGIN = gql`
  mutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      userId
      token
      tokenExpiration
    }
  }
`;

const CREATE_ACCOUNT = gql`
  mutation($employee: EmployeeInput) {
    createEmployee(employee: $employee) {
      id
      username
      password
      isAdmin
      name
      jobTitle
    }
  }
`;

const CREATE_PERFORMANCE = gql`
  mutation($performance: PerformanceInput) {
    createPerformance(performance: $performance) {
      employeeId
      id
      technicalSkill
      softSkill
      attendance
      qualityOfWork
      overallScore
    }
  }
`;

const ASSIGN_FEEDBACK = gql`
  mutation($feedback: FeedbackInput) {
    createFeedback(feedback: $feedback) {
      reviewerId
      performanceId
      comment
      isSubmitted
    }
  }
`;

const GET_EMPLOYEE = gql`
  query($id: ID!) {
    employee(id: $id) {
      id
      username
      password
      isAdmin
      name
      jobTitle
      feedbackRequests {
        performanceId
      }
    }
  }
`;

const GET_PERFORMANCE = gql`
  query($employeeId: ID!) {
    performance(employeeId: $employeeId) {
      technicalSkill
      softSkill
      attendance
      qualityOfWork
      overallScore
      feedbackList {
        reviewerId
        comment
        isSubmitted
      }
    }
  }
`;

export {
  LOGIN,
  CREATE_ACCOUNT,
  ASSIGN_FEEDBACK,
  CREATE_PERFORMANCE,
  GET_EMPLOYEE,
  GET_PERFORMANCE,
};

const { makeExecutableSchema } = require("graphql-tools");
const resolvers = require("./resolvers");

const typeDefs = `
  type Employee {
        id: ID!
        username: String!
        password: String
        isAdmin: Boolean
        name: String
        jobTitle: String
        feedbackRequests: [Feedback]
        performance: Performance
      }
      input EmployeeInput {
        username: String!
        password: String!
        isAdmin: Boolean
        name: String
        jobTitle: String
      }
      
      type Feedback {
        id: ID!
        reviewerId: ID!
        performanceId: ID!
        comment: String
        isSubmitted: Boolean
      }
      input FeedbackInput {
         reviewerId: ID!
         performanceId: ID!
         comment: String!
         isSubmitted: Boolean!
      }
      
      type Performance {
        id: ID!
        employeeId: ID!
        technicalSkill: String
        softSkill: String
        attendance: String
        qualityOfWork: String
        overallScore: String
        feedbackList: [Feedback]
      }
      input PerformanceInput {
        employeeId: ID!
        technicalSkill: String
        softSkill: String
        attendance: String
        qualityOfWork: String
        overallScore: String
      }
      
      type AuthData {
        userId: ID!
        token: String!
        tokenExpiration: Int!
      }
      
      type Query {
         employees: [Employee]
         employee(id: ID!): Employee
         performance(employeeId: ID!): Performance
         feedbacks: [Feedback]
         performances: [Performance]
      }
      type Mutation {
          login(username: String!, password: String!): AuthData
          createEmployee(employee: EmployeeInput): Employee
          updateEmployee(id: ID!, employee: EmployeeInput): Employee
          deleteEmployee(id: ID!): Employee
          createFeedback(feedback: FeedbackInput): Feedback
          updateFeedback(id: ID!, feedback: FeedbackInput): Feedback
          createPerformance(performance: PerformanceInput): Performance
          updatePerformance(id: ID!, performance: PerformanceInput): Performance
      }
`;

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
});

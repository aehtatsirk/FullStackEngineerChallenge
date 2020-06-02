# Full Stack Developer Challenge
 Design a web application that allows employees to submit feedback toward each other's performance review.
 [Code Challenge](https://github.com/Pay-Baymax/FullStackEngineerChallenge)

# Technology Stack
### /client/
- React Hooks, Bootstrap, Apollo client, GraphQl
- Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
 
### /server/
- GraphQL, NodeJS, Express, MongoDB
- Open [http://localhost:5000/graphql](http://localhost:5000/graphql) to view it in the browser.

## Assumptions
- A user can login or create an account
- Every employee has one performance review
- Each performance review has many employee feedbacks
- Admin can assign a reviewer other than the employee him/herself to a performance review
- Employee can only view feedback requests, and submit a feedback to other performance review

# Finished Tasks
### /client/
1. Login and authentication
2. Create Account
3. View Employee
4. View Performance
5. View Feedback Requests

### /server/
1. CRUD employee
2. CRU performance
3. CRU feedback
4. login and authentication

#Pending Tasks
1. Authentication of API and UI screen
2. ADMIN and Employee View
3. Unimplemented APIS to UI
4. Tests

#Data Design
- Employee has one performance and many Feedback Requests
- Performance has many Feedbacks
- Feedback has Reviewer (Employee) and Performance Review

## Available Scripts

In the project directory, you can run:

### `npm install`

Installs the node modules. <br />

### `npm run start`

Runs the app in the development mode.<br />

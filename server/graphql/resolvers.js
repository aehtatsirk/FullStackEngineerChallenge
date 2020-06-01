const Employee = require("../models/employee");
const Feedback = require("../models/feedback");
const Performance = require("../models/perfomance");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  Employee: {
    async feedbackRequests({ id }) {
      return Feedback.find({ reviewerId: id });
    },
    async performance({ id }) {
      return Performance.findOne({ employeeId: id });
    },
  },
  Performance: {
    async feedbackList({ id }) {
      return Feedback.find({ performanceId: id });
    },
  },
  Query: {
    async employees() {
      return Employee.find();
    },
    async employee(parent, { id }) {
      if (!id) return null;
      return Employee.findById(id);
    },
    async performance(parent, { employeeId }) {
      return Performance.findOne({ employeeId });
    },
    async feedbacks() {
      return Feedback.find();
    },
    async performances() {
      return Performance.find();
    },
  },
  Mutation: {
    async login(parent, { username, password }) {
      const user = await Employee.findOne({ username });
      if (!user) throw new Error("Invalid credentials");

      const isPwEqual = await bcrypt.compare(password, user.password);
      if (!isPwEqual) throw new Error("Invalid credentials");

      const token = jwt.sign(
        { userId: user.id, username: user.username },
        `${process.env.SECRET_KEY}`,
        { expiresIn: "1h" }
      );

      return { userId: user.id, token, tokenExpiration: 1 };
    },
    async createEmployee(parent, { employee }, req) {
      // if (!req.isAuth) throw new Error("Unauthenticated");

      const existingUser = await Employee.findOne({
        username: employee.username,
      });
      if (existingUser) {
        throw new Error("Username already exist");
      }

      const hashedPassword = await bcrypt.hash(employee.password, 12);
      return Employee.create({ ...employee, password: hashedPassword });
    },
    async updateEmployee(parent, { id, employee }) {
      return Employee.findByIdAndUpdate(id, { $set: employee }, { new: true });
    },
    async deleteEmployee(parent, { id }) {
      return Employee.findByIdAndRemove(id).exec();
    },
    async createFeedback(parent, { feedback }) {
      const { reviewerId, performanceId } = feedback;
      const performance = await Performance.findById(performanceId);
      if (reviewerId === performance.employeeId) {
        throw new Error("Cannot assign employee to create it's own feedback");
      }
      return Feedback.create(feedback);
    },
    async updateFeedback(parent, { id, feedback }) {
      return Feedback.findByIdAndUpdate(id, { $set: feedback }, { new: true });
    },
    async createPerformance(parent, { performance }) {
      return Performance.create(performance);
    },
    async updatePerformance(parent, { id, performance }) {
      return Performance.findByIdAndUpdate(
        id,
        { $set: performance },
        { new: true }
      );
    },
  },
};

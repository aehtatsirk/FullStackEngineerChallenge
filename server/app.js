const express = require("express");
const graphqlHttp = require("express-graphql");
const mongoose = require("mongoose");
const schema = require("./graphql/schema");
const cors = require("cors");
const isAuth = require("./middleware/is-auth");

const app = express();
app.use(cors());
app.use(isAuth);

app.use(
  "/graphql",
  graphqlHttp({
    schema,
    graphiql: true,
  })
);

const { MONGO_USER, MONGO_PASSWORD, MONGO_DB, MONGO_HOST } = process.env;

mongoose
  .connect(
    `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DB}`,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    }
  )
  .then(() => app.listen(5000))
  .catch((err) => console.log(err));

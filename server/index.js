const express = require('express');
const colors = require('colors'); /* раскрашиваю консоль */
require('dotenv').config();
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const connectDB = require('./config/db.js');

const port = process.env.PORT || 5000;

const app = express();

connectDB();

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    /* графикл,это постман для графкл...запускаю его в режиме development */
    graphiql: process.env.NODE_ENV === 'development',
  }),
);

app.listen(port, console.log(`Servers port: ${port}`));

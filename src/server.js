import express from "express";
import bodyParser from "express";
import { route } from "./route.js";
import cors from "cors";
import { mongoConnection } from "./mongoose.js";
import { exceptionHandler } from './util/exceptionHandler'

// TODO: just tip only, next time install package, please add -e after npm install
// for better package version control, e.g. npm install -e express
// -e stands for exact -> express: ^4.17.1 -> express: 4.17.1

const start = async () => {
  const PORT = 8080;
  const app = express();

  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.get(`/`, (req, res) => {
    res.status(200).send(`Hello World`);
  });

  route(app);

  // Error boundary
  app.use(exceptionHandler);

  await mongoConnection();

  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`);
  });
};

start();

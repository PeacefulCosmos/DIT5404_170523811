import express from "express";
import bodyParser from "express";
import { route } from "./route.js";
import cors from "cors";
import { mongoConnection } from "./mongoose.js";

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

  await mongoConnection();

  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`);
  });
};

start();

import express from "express";
import bodyParser from "express";
import { mongoConnection } from "./mongoose.js";
import { environment } from "./environment/environment.js";

const PORT = 8080;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get(`/`, (req, res) => {
  res.status(200).send(`Hello World`);
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}...`);
});

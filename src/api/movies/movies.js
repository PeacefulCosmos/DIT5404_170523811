import express from "express";
import * as movieService from "./movies.service.js";

export const movieRouter = express.Router();

movieRouter.get(`/`, async (req, res) => {
  let movies = await movieService.getAllMovies();
  // console.log(movies);
  res.status(200).send(movies);
});

movieRouter.post(`/insert`, async (req, res) => {
  await movieService.insertMovies();
  res.status(200).send("Insert completed");
});

import express from "express";
import * as movieService from "./movies.service.js";

export const movieRouter = express.Router();

movieRouter.get(`/latest`, async (req, res) => {
  res.status(200).send(await movieService.getLatest());
  // res.send(`great!!`);
});

movieRouter.get(`/test`, async (req, res) => {
  res.status(200).send(await movieService.getMovieVideo(req.query));
  // res.send(`great!!`);
});

movieRouter.post(`/insert`, async (req, res) => {
  await movieService.insertMovies();
  res.status(200).send("ok");
});

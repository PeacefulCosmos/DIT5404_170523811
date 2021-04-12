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

import express from "express";
import { MovieService } from './movies.service'
import {asyncHandler} from '../../util/asyncHandler'

export const movieRouter = express.Router();

// TODO: Try to understand /util/exceptionHandler, /util/asyncHandler
// TODO: exceptionHandler, a simple `next` middleware of the controller function,
// all exceptions found in controller will automatically call the exceptionHandler

// TODO: asyncHandler, a HOF for calling `next` function automatically while error is found

// TODO: in all controller function, please wrap the callback with asyncHandler
movieRouter.get(`/`, asyncHandler(async (req, res) => {
  let movies = await MovieService.getAllMovies();
  // console.log(movies);
  // TODO: no need to use status(200), all response code is default 200
  // TODO: use .json(movies) instead of send(movies);
  res.status(200).send(movies);
}));

movieRouter.post(`/insert`, async (req, res) => {
  await MovieService.insertMovies();
  res.status(200).send("Insert completed");
});

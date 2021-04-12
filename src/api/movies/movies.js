import express from "express";

export const movieRouter = express.Router();

movieRouter.get(`/`, (req, res) => {
  res.send(`great!!`);
});

import { movieRouter } from "./api/movies/movies.js";

export const route = (app) => {
  app.use(`/movie`, movieRouter);
};

import axios from "axios";
import { environment } from "../../environment/environment.js";

export const getLatest = async () => {
  let latestMovieArr = await axios.get(
    `${environment.baseUrl.theMovieDB}/movie/popular/?api_key=${environment.ApiKey.theMovieDB.v3}`
  );
  console.log(latestMovieArr.data.results.length);
  console.log(latestMovieArr.data.results);
  return latestMovieArr.data.results;
};

export const getMovieVideo = async (query) => {
  let movieVideoObject = await axios.get(
    `${environment.baseUrl.theMovieDB}/movie/${query.id}/videos?api_key=${environment.ApiKey.theMovieDB.v3}`
  );

  return movieVideoObject.data.results[0].key;
};

export const insertMovies = async () => {};

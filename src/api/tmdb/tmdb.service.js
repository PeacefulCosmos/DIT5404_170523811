import axios from "axios";
import { environment } from "../../environment/environment.js";

/*This is the request call to 'the movie database api'*/

// get all the lastest movies
export const getLatest = async () => {
  let latestMovieArr = await axios.get(
    `${environment.baseUrl.theMovieDB.api}/movie/popular?api_key=${environment.ApiKey.theMovieDB.v3}`
  );
  //   console.log(latestMovieArr.data.results.length);
  //   console.log(latestMovieArr.data.results);
  return latestMovieArr.data.results;
};

// extract the movie credit (actor, actress, director)
export const getMovieCredit = async (movie_id) => {
  let movieCredits = await axios.get(
    `${environment.baseUrl.theMovieDB.api}/movie/${movie_id}/credits?api_key=${environment.ApiKey.theMovieDB.v3}`
  );

  let movieCastArr = movieCredits.data.cast;
  let movieCrewArr = movieCredits.data.crew;
  let actor = [];
  let director = [];

  for (let cast of movieCastArr) {
    actor.push(cast.name);
  }

  for (let crew of movieCrewArr) {
    if (crew.job === "Director") {
      director.push(crew.name);
    }
  }
  const movieCast = {
    actor: actor,
    director: director,
  };

  //   console.log(movieCast);
  return movieCast;
};

// extract the movie detail
export const getMovieDetail = async (movie_id) => {
  let duration = 0;
  let category = [];

  const result = await axios.get(
    `${environment.baseUrl.theMovieDB.api}/movie/${movie_id}?api_key=${environment.ApiKey.theMovieDB.v3}`
  );

  duration = result.data.runtime;
  for (let genre of result.data.genres) {
    category.push(genre.name);
  }

  const movieDetail = {
    duration: duration,
    category: category,
  };

  //   console.log(movieDetail);
  return movieDetail;
};

// extract the movie trailer key on youtube
export const getMovieVideoKey = async (movie_id) => {
  let movieVideoObject = await axios.get(
    `${environment.baseUrl.theMovieDB.api}/movie/${movie_id}/videos?api_key=${environment.ApiKey.theMovieDB.v3}`
  );
  return movieVideoObject.data.results[0].key;
};

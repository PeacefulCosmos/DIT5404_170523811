import axios from "axios";
import { environment } from "../../environment/environment.js";

/*This is the request call to 'the movie database api'*/

// get all the lastest movies

export const getLatest = async () => {
  try {
    let latestMovieArr = await axios.get(
      `${environment.baseUrl.theMovieDB.api}/movie/popular?api_key=${environment.ApiKey.theMovieDB.v3}`
    );
    return latestMovieArr.data.results;
  } catch (err) {
    console.log(err);
  }
};

// extract the movie credit (actor, actress, director)
export const getMovieCredit = async (movie_id) => {
  try {
    const actor = [];
    const director = [];
    const movieCredits = await axios.get(
      `${environment.baseUrl.theMovieDB.api}/movie/${movie_id}/credits?api_key=${environment.ApiKey.theMovieDB.v3}`
    );

    if (movieCredits.data.cast) {
      let movieCastArr = movieCredits.data.cast;
      for (let cast of movieCastArr) {
        actor.push(cast.name);
      }
    }

    if (movieCredits.data.crew) {
      let movieCrewArr = movieCredits.data.crew;
      for (let crew of movieCrewArr) {
        if (crew.job === "Director") {
          director.push(crew.name);
        }
      }
    }

    return {
      actor: actor,
      director: director,
    };
  } catch (err) {
    console.log(err);
  }
};

// extract the movie detail
export const getMovieDetail = async (movie_id) => {
  try {
    const category = [];

    const result = await axios.get(
      `${environment.baseUrl.theMovieDB.api}/movie/${movie_id}?api_key=${environment.ApiKey.theMovieDB.v3}`
    );

    const duration = result.data.runtime;

    for (let genre of result.data.genres) {
      category.push(genre.name);
    }

    const movieDetail = {
      duration: duration,
      category: category,
    };
    return movieDetail;
  } catch (err) {
    console.log(err);
  }
};

// extract the movie trailer key on youtube
export const getMovieVideoKey = async (movie_id) => {
  try {
    let movieVideoObject = await axios.get(
      `${environment.baseUrl.theMovieDB.api}/movie/${movie_id}/videos?api_key=${environment.ApiKey.theMovieDB.v3}`
    );
    // console.log(movieVideoObject.data);
    if (movieVideoObject.data.results.length !== 0) {
      return movieVideoObject.data.results[0].key;
    }
    console.log(movieVideoObject.data);
    return "";
  } catch (err) {
    console.log(err);
  }
};

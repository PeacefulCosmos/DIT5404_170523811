import axios from "axios";
// TODO: file import should not include the extension .js, might have compilation error during compile time
import { Movie } from "./movies.model.js";
import { environment } from "../../environment/environment.js";
import * as tmdb from "../tmdb/tmdb.service.js";

// TODO: the return type of this function is Movie[] | undefined, please fix the catch block
const getAllMovies = async () => {
  try {
    // TODO: await here is useless, only one statement here
    return await Movie.find();
  } catch (err) {
    console.log(err);
  }
};

// insert the movies document into mongodb
const insertMovies = async () => {
  //get latest movies
  // TODO: use const
  let latestMovieArr = await tmdb.getLatest();
  // TODO: TL;DR, a good function should not exceed 50 lines
  // TODO: avoid using for / while loop in js, use latestMovieArr.forEach
  // TODO: Please destruct movie, there are nothing that will use the entire movie object -- clean code
  for (let movie of latestMovieArr) {
    const movie_id = movie.id;
    const title = movie.title;
    const rating = 0;
    const year_of_release = new Date(movie.release_date);
    const backdrop = `${environment.baseUrl.theMovieDB.image}${movie.backdrop_path}`;
    const poster = `${environment.baseUrl.theMovieDB.image}${movie.poster_path}`;
    const overview = movie.overview;
    const language = movie.original_language;

    //get movie cast and director
    const movieCast = await tmdb.getMovieCredit(movie_id);
    const actor = movieCast.actor;
    const director = movieCast.director;

    //get trailer youtube path
    const trailer = `${environment.baseUrl.youtube
      }/watch?v=${await tmdb.getMovieVideoKey(movie_id)}`;

    //get category and duration
    const movieDetail = await tmdb.getMovieDetail(movie_id);
    const category = movieDetail.category;
    const duration_of_movie = movieDetail.duration;

    const doc = {
      movie_id: movie_id,
      title: title,
      rating: rating,
      year_of_release: year_of_release,
      backdrop: backdrop,
      poster: poster,
      overview: overview,
      langauage: language,
      actor: actor,
      director: director,
      trailer: trailer,
      category: category,
      duration_of_movie: duration_of_movie,
    };

    Movie.findOne({ movie_id: doc.movie_id }, async (err, movie) => {
      if (err) console.log(err);
      if (movie) {
        console.log(
          `Movie "${movie.title}" is duplicated! Insert not complete!`
        );
      } else {
        const movieDoc = new Movie(doc);

        await movieDoc.save((err) => {
          if (err) return err;
          console.log(`Movie "${movieDoc.title}" insert successful!`);
        });
      }
    });
  }
};

// Object.freeze is used to prevent the MovieService from being modified from other place
export const MovieService = Object.freeze({
  getAllMovies,
  insertMovies
})

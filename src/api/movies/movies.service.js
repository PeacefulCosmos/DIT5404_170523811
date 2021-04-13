import axios from "axios";
import { Movie } from "./movies.model.js";
import { environment } from "../../environment/environment.js";
import * as tmdb from "../tmdb/tmdb.service.js";

export const getAllMovies = async () => {
  return await Movie.find();
  // console.log(doc);
};

// insert the movies document into mongodb
export const insertMovies = async () => {
  //get latest movies
  let latestMovieArr = await tmdb.getLatest();
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
    const trailer = `${
      environment.baseUrl.youtube
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

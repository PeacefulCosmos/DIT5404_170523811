import axios from 'axios';
import { Movie } from './movies.model.js';
import { environment } from '../../environment/environment.js';
import * as tmdb from '../tmdb/tmdb.service.js';

const getAllMovies = async () => {
    return Movie.find();
};

// insert the movies document into mongodb
const insertMovies = async () => {
    //get latest movies
    const latestMovieArr = await tmdb.getLatest();
    latestMovieArr.forEach(async (movie) => {
        //get movie cast and director
        const movieCast = await tmdb.getMovieCredit(movie.id);
        //get category and duration
        const movieDetail = await tmdb.getMovieDetail(movie.id);

        const doc = {
            movie_id: movie.id,
            title: movie.title,
            rating: 0,
            year_of_release: new Date(movie.release_date),
            backdrop: `${environment.baseUrl.theMovieDB.image}${movie.backdrop_path}`,
            poster: `${environment.baseUrl.theMovieDB.image}${movie.poster_path}`,
            overview: movie.overview,
            langauage: movie.original_language,
            actor: movieCast.actor,
            director: movieCast.director,
            trailer: `${environment.baseUrl.youtube}/watch?v=${await tmdb.getMovieVideoKey(movie.id)}`,
            category: movieDetail.category,
            duration_of_movie: movieDetail.duration,
        };

        // TODO: I personally do not suggest using callback here, since this is an async function,

        /**
         * // It would be much cleaner if you do this, let the error handler handle the error
         * const movie = await Movie.findOne({ movie_id: doc.movie_id });
         * if(movie) {
         *    throw new BadRequestException('Movie is exist');
         * }
         *
         * const movieDoc = new Movie(doc)
         * await movieDoc.save()
         * return 'Movie inserted';
         */
        Movie.findOne({ movie_id: doc.movie_id }, async (err, movie) => {
            if (err) console.log(err);
            if (movie) {
                console.log(`Movie "${movie.title}" is duplicated! Insert not complete!`);
            } else {
                const movieDoc = new Movie(doc);

                // TODO: Nested callback inside callback, > google callback hell
                await movieDoc.save((err) => {
                    if (err) return err;
                    // TODO: Instead of logging the result, would it be better to send a response back to client ?
                    console.log(`Movie "${movieDoc.title}" insert successful!`);
                });
            }
        });
    });
};

// Object.freeze is used to prevent the MovieService from being modified from other place
export const MovieService = Object.freeze({
    getAllMovies,
    insertMovies,
});

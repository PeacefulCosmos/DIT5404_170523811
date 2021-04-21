import axios from 'axios';
import { Movie } from './movies.model.js';
import { environment } from '../../environment/environment.js';
import * as tmdb from '../tmdb/tmdb.service.js';

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

        Movie.findOne({ movie_id: doc.movie_id }, async (err, movie) => {
            if (err) console.log(err);
            if (movie) {
                console.log(`Movie "${movie.title}" is duplicated! Insert not complete!`);
            } else {
                const movieDoc = new Movie(doc);

                await movieDoc.save((err) => {
                    if (err) return err;
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

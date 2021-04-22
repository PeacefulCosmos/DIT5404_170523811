import axios from 'axios';
import { environment } from '../../environment/environment.js';

/*This is the request call to 'the movie database api'*/

// get all the lastest movies
// TODO: Please Check the return type, now: movie[] | undefined
// TODO: remove try catch block in all service function
export const getLatest = async () => {
    try {
        let latestMovieArr = await axios.get(
            `${environment.baseUrl.theMovieDB.api}/movie/popular?api_key=${environment.ApiKey.theMovieDB.v3}`,
        );
        return latestMovieArr.data.results;
    } catch (err) {
        console.log(err);
    }
};

// extract the movie credit (actor, actress, director)
export const getMovieCredit = async (movie_id) => {
    // TODO: remove try catch block, asyncHandler already do this for you, you can safely throw error/exception
    try {
        // TODO: use const, movieCredits should not be modified after data fetching;
        let movieCredits = await axios.get(
            `${environment.baseUrl.theMovieDB.api}/movie/${movie_id}/credits?api_key=${environment.ApiKey.theMovieDB.v3}`,
        );

        // TODO: remove this, directly use in for loop, not a big performance issue
        let movieCastArr = movieCredits.data.cast;
        // TODO: remove this, directly use in for loop, not a big performance issue
        let movieCrewArr = movieCredits.data.crew;

        const actor = [];

        const director = [];

        for (let cast of movieCastArr) {
            actor.push(cast.name);
        }

        for (let crew of movieCrewArr) {
            if (crew.job === 'Director') {
                director.push(crew.name);
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
    // TODO: remove try catch block, asyncHandler already do this for you, you can safely throw error/exception
    try {
        const category = [];

        const result = await axios.get(
            `${environment.baseUrl.theMovieDB.api}/movie/${movie_id}?api_key=${environment.ApiKey.theMovieDB.v3}`,
        );

        const duration = result.data.runtime;
        // TODO: let -> const, it never change again
        for (let genre of result.data.genres) {
            category.push(genre.name);
        }

        // TODO: prefer direct return.
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
    // TODO: remove try catch block, asyncHandler already do this for you, you can safely throw error/exception
    try {
        let movieVideoObject = await axios.get(
            `${environment.baseUrl.theMovieDB.api}/movie/${movie_id}/videos?api_key=${environment.ApiKey.theMovieDB.v3}`,
        );
        return movieVideoObject.data.results[0].key;
    } catch (err) {
        console.log(err);
    }
};

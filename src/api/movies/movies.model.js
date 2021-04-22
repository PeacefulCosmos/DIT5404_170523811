import mongoose from 'mongoose';
const { Schema } = mongoose;

const MovieSchema = new Schema({
    title: String,
    rating: Number,
    category: Array,
    actor: Array,
    director: Array,
    year_of_release: Date,
    duration_of_movie: Number,
    trailer: String,
    poster: String,
    backdrop: String,
    overview: String,
    language: String,
    movie_id: Number,
});

export const Movie = mongoose.model('movie', MovieSchema, '170523811_movie');

// module.exports = Movie;

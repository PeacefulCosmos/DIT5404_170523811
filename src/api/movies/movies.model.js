import mongoose, { Collection, Schema } from "mongoose";

const MovieSchema = new Schema({
  title: String,
  rating: Number,
  category: String,
  leading_actor: String,
  director: String,
  year_of_release: Date,
  duration_of_movie: Number,
  trailer: String,
  poster: String,
});

const MovieModel = mongoose.model("movie", MovieSchema, "170523811_movie");

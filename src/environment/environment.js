// TODO: don't you think importing this like 'environment/environment'; is strange ?
// Rename this file to index.js or remove environment folder
export const environment = {
  baseUrl: {
    main: "http://localhost:8080",
    theMovieDB: {
      api: "https://api.themoviedb.org/3",
      image: "https://image.tmdb.org/t/p/original",
    },
    youtube: "https://youtube.com",
  },
  mongoDb: "mongodb://127.0.0.1:27017/dit5404",
  ApiKey: {
    theMovieDB: {
      v3: "53bd5ea72540a9003bdde8cb14cbb774",
      v4:
        "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1M2JkNWVhNzI1NDBhOTAwM2JkZGU4Y2IxNGNiYjc3NCIsInN1YiI6IjYwNzQ1MWM2ZDhmNDRlMDA0MTczMGY1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DZRQSFKkDhOAyJM-C_pbtH_XUMcuk5tgar_3e9z5aaU",
    },
  },
};

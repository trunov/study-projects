"use strict";
const Movie = use("App/Models/Movie");

class MovieController {
  async showAllMovies({ response }) {
    let movies = await Movie.all();

    if (movies) {
      return response.json(movies);
    }

    return response.status(404).send("There are no movies in DB");
  }

  async showSingleMovie({ params, response }) {
    const movie = await Movie.find(params.id);

    if (movie) {
      return response.json(movie);
    }

    return response.status(404).send("resource is not found");
  }

  async addMovie({ request, response }) {
    const movieInfo = request.only(["title", "minutes"]);

    const movie = new Movie();
    movie.title = movieInfo.title;
    movie.minutes = movieInfo.minutes;

    await movie.save();

    return response.status(201).json(movie);
  }

  async updateMovie({ params, request, response }) {
    const movieInfo = request.only(["title", "minutes"]);

    const movie = await Movie.find(params.id);

    if (!movie) {
      return response.status(404).send("resource is not found");
    }

    if (movieInfo.title || movieInfo.minutes) {
      movie.title = movieInfo.title;
      movie.minutes = movieInfo.minutes;

      await movie.save();

      return response.status(200).json(movie);
    }

    return response.status(400).send("some of the data is not provided");
  }

  async deleteMovie({ params, response }) {
    const movie = await Movie.find(params.id);

    if (!movie) {
      return response.status(404).json({ data: "Resource not found" });
    }

    await movie.delete();
    return response.status(204).json("resource was deleted");
  }
}

module.exports = MovieController;

"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");
const Movie = use("App/Models/Movie");

Route.group(() => {
  Route.get("movies", "MovieController.showAllMovies");
  Route.get("movies/:id", "MovieController.showSingleMovie");
  Route.post("movies", "MovieController.addMovie");
  Route.put("movies/:id", "MovieController.updateMovie");
  Route.delete("movies/:id", "MovieController.deleteMovie");
}).prefix("api");
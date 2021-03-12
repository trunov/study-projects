"use strict";
const { test, trait } = use("Test/Suite")("Movie endpoints testing");
const Movie = use("App/Models/Movie");

trait("Test/ApiClient");

const title = "Test";
const updateTitle = "UpdateTest";
const minutes = 55;

test("it should show list of the movies", async ({ client }) => {
  const response = await client.get("/api/movies").end();
  response.assertStatus(200);
});

test("it should create a new movie", async ({ client, assert }) => {
  const response = await client.post("/api/movies").send({ title, minutes }).end();
  const responseDataTitle = response.body.title;

  assert.equal(responseDataTitle, title);

  const movieInDb = await Movie.findBy('title', title);

  assert.isDefined(movieInDb)
});

test("it should delete a movie", async ({ client, assert }) => {
  const movie = new Movie();
  movie.title = "Test 2";
  movie.minutes = 32;
  await movie.save();
  const movieId = movie.id;

  const response = await client.delete(`/api/movies/${movieId}`).end();
  response.assertStatus(204);

  const findMovieAfterDelete = await Movie.find(movieId);
  assert.equal(findMovieAfterDelete, null);
});

test("it should update an existing movie", async ({ client, assert }) => {
  const movie = new Movie();
  movie.title = title;
  movie.minutes = minutes;
  await movie.save();
  const movieId = movie.id;
 
  const response = await client.put(`/api/movies/${movieId}`).send({ title: updateTitle }).end();
  const responseData = response.body.title;

  assert.equal(responseData, updateTitle);

  const findMovieAfterUpdate = await Movie.find(movieId);
   assert.isDefined(findMovieAfterUpdate)
})
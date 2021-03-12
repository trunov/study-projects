import { Movie } from "../entity/Movie";
import { setupServer } from "../index";
import supertest from "supertest";

const title: string = "Diamonds";
const minutes: number = 55;

const updateTitle: string = "Era 2";
const experimentalId: number = 7777;

let app;

beforeAll(async () => {
  app = supertest(await setupServer());
});

afterEach(async () => {
  const movie = Movie.find({ title });
  const movieUpdate = Movie.find({ title: updateTitle });
  if (movie) {
    Movie.delete({ title });
  }
  if (movieUpdate) {
    Movie.delete({ title: updateTitle });
  }
});

it("it should create a new movie", async () => {
  const mutation = `
  mutation {
    createMovie(options: {
      title: "${title}",
      minutes: ${minutes}
    }) {
      title
      minutes
    }
  }
  `;

  const response = await app.post("/graphql").send({
    queryName: "",
    variable: {},
    query: mutation,
  });

  // making a request
  expect(response.body.data).toEqual({ createMovie: { title, minutes } }); // verify result

  const movieData = Movie.find({ title }); // fetch movie from db
  expect(movieData).toBeDefined(); //verify movie in database
});

it("it should update an existing movie", async () => {
  const movie = await Movie.create({ title, minutes }).save(); // create new movie in db (movie.create)
  const id = movie.id;

  const mutation = `
  mutation {
    updateMovie(id: ${id}
      options: {
        title: "${updateTitle}"
      })
  }
  `;

  const response = await app.post("/graphql").send({
    queryName: "",
    variable: {},
    query: mutation,
  });

  expect(response.body.data).toEqual({ updateMovie: true }); // verify result

  const movieData = Movie.find({ title: updateTitle }); // fetch movie from db
  expect(movieData).toBeDefined(); //verify movie in database
});

it("it should throw an error if movie does not exist during the update", async () => {
  const mutation = `
  mutation {
    updateMovie(id: ${experimentalId}
      options: {
        title: "${updateTitle}"
      })
  }
  `;

  const response = await app.post("/graphql").send({
    queryName: "",
    variable: {},
    query: mutation,
  });

  expect(response.body.data).toEqual({ updateMovie: false }); // verify result
});

it("it should delete an existing movie", async () => {
  const movie = await Movie.create({ title, minutes }).save();
  const id = movie.id;

  const mutation = `
  mutation {
    deleteMovie(id: ${id})
  }
  `;

  const response = await app.post("/graphql").send({
    queryName: "",
    variable: {},
    query: mutation,
  });

  expect(response.body.data).toEqual({ deleteMovie: true }); // verify result

  const movieData = await Movie.findOne({ id }); // fetch non existing movie from db
  expect(movieData).toBeUndefined();
});

it("it should throw an error if movie does not exist during the delete", async () => {

  const mutation = `
  mutation {
    deleteMovie(id: ${experimentalId})
  }
  `;

  const response = await app.post("/graphql").send({
    queryName: "",
    variable: {},
    query: mutation,
  });

  expect(response.body.data).toEqual({ deleteMovie: false }); // verify result
});

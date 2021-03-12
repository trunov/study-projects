import * as express from "express";
import { Request, Response } from "express";

import "reflect-metadata";
import { createConnection } from "typeorm";
import { Users } from "./entity/User";

createConnection()
  .then(async (connection) => {
    const userRepository = connection.getRepository(Users);

    // create and setup express app
    const app = express();
    app.use(express.json());

    // get all users
    app.get("/users", async function (req: Request, res: Response) {
      const users = await userRepository.find();
      res.json(users);
    });

    //register user
    app.post("/register", async function (req: Request, res: Response) {
      const { firstName, lastName, password, email } = req.body;

      const user = await userRepository.create({
        firstName,
        lastName,
        password,
        email,
      });

      console.log(user);

      const results = await userRepository.save(user);
      return res.send(results);
    });


    //login user
    app.post("/login", async function (req: Request, res: Response) {
      const { email, password } = req.body;

      const result: Users = await userRepository.findOne({ email: email });
      if (!result) {
        res.status(404).send("User is nor registered yet")
      } else if (result.password !== password) {
          res.status(403).send("Email or password is incorrect")
        } else {
          res.send(result);
        }
    });

    app.use("*", async function (req: Request, res: Response) {
      res.send("This endpoint does not exist")
    })

    // start express server
    app.listen(3000);
    console.log("server successfully running")
  })
  .catch((error) => console.log(error));

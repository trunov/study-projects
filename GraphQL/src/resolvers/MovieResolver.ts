import {
  Mutation,
  Resolver,
  Arg,
  Int,
  Query,
  InputType,
  Field,
} from "type-graphql";
import { Movie } from "../entity/Movie";

@InputType()
class MovieInput {
  @Field()
  title: string;
  @Field(() => Int)
  minutes: number;
}

@InputType()
class MovieInputUpdate {
  @Field(() => String, { nullable: true })
  title?: string;
  @Field(() => Int, { nullable: true })
  minutes?: number;
}

@Resolver()
export class MovieResolver {
  @Mutation(() => Movie)
  async createMovie(@Arg("options", () => MovieInput) options: MovieInput) {
    // now on client side you need to specify options : { title: "..", minutes: ".."}
    const movie = await Movie.create(options).save();
    return movie;
  }

  @Mutation(() => Boolean) //mutation that changes either title or minutes column in Movie entity
  async updateMovie(
    @Arg("id", () => Int) id: number,
    @Arg("options", () => MovieInputUpdate) input: MovieInputUpdate
  ) {
    if (await Movie.findOne({ id })) {
      await Movie.update({ id }, input);
      return true;
    }

    return false;
  }

  @Mutation(() => Boolean)
  async deleteMovie(@Arg("id", () => Int) id: number) {
    if (await Movie.findOne({ id })) {
      await Movie.delete({ id });
      return true;
    }
    return false;
  }

  @Query(() => [Movie]) //signifying the array, passing the Movie graphQl type
  movies() {
    return Movie.find();
  }
}

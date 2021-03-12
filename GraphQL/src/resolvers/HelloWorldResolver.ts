import { Query, Resolver, Arg, Int } from "type-graphql";

@Resolver()
export class HelloWorldResolver {
    @Query(() => String)
    hello(@Arg("id", () => Int) id: number) {
        return `Hello ${id}`
    }
}
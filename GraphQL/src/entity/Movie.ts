import { Field, Int, ObjectType } from "type-graphql";
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@ObjectType() //specify in graphQl that this is the object class
@Entity()
export class Movie extends BaseEntity {
    @Field(() => Int) // adding fields so typescript know type from GraphQL
    @PrimaryGeneratedColumn()
    id: number

    @Field()
    @Column()
    title: string

    @Field(() => Int)
    @Column('int', {default:60})
    minutes: number
}
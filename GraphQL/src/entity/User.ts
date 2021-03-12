import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Users {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { length: 200 })
    firstName: string;

    @Column("varchar", { length: 200 })
    lastName: string;

    @Column("varchar", { length: 200 })
    password: string;

    @Column("varchar", { length: 200 })
    email: string;

}

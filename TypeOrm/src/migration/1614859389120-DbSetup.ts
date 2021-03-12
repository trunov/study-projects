import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class DbSetup1614859389120 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
          },
          {
            name: "firstName",
            type: "varchar",
            length: "200"
          },
          {
            name: "lastName",
            type: "varchar",
            length: "200"
          },
          {
            name: "password",
            type: "varchar",
            length: "200"
          },
          {
            name: "email",
            type: "varchar",
            length: "200"
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }
}

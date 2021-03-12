import { MigrationInterface, QueryRunner } from "typeorm";

export class UserRefactoring1614859379557 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE users CHANGE surname lastName VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL;`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE users CHANGE lastName surname VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL;`)
  }
}

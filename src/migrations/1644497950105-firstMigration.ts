import {MigrationInterface, QueryRunner} from "typeorm";

export class firstMigration1644497950105 implements MigrationInterface {
    name = 'firstMigration1644497950105'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sells" ("id" SERIAL NOT NULL, "clientName" character varying NOT NULL, "clientEmail" character varying NOT NULL, "totalPrice" integer NOT NULL DEFAULT '0', "createdOn" TIMESTAMP NOT NULL DEFAULT now(), "cartId" integer, "userId" integer, CONSTRAINT "REL_89850b75004a2cdc7f0254aa6c" UNIQUE ("cartId"), CONSTRAINT "PK_98dae8a080bb62a676f24e0dee0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "isAdm" boolean NOT NULL, "createdOn" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cart" ("id" SERIAL NOT NULL, "cartOwner" character varying NOT NULL, "products" text array NOT NULL DEFAULT '{}', "createdOn" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "REL_756f53ab9466eb52a52619ee01" UNIQUE ("userId"), CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "type" character varying NOT NULL, "price" integer NOT NULL, "createdOn" TIMESTAMP NOT NULL DEFAULT now(), "cartId" integer, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "sells" ADD CONSTRAINT "FK_89850b75004a2cdc7f0254aa6c3" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sells" ADD CONSTRAINT "FK_ce71f038f81911037586664f2c4" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "FK_756f53ab9466eb52a52619ee019" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_7a637e662f7c4b3a85001c53dfd" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_7a637e662f7c4b3a85001c53dfd"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "FK_756f53ab9466eb52a52619ee019"`);
        await queryRunner.query(`ALTER TABLE "sells" DROP CONSTRAINT "FK_ce71f038f81911037586664f2c4"`);
        await queryRunner.query(`ALTER TABLE "sells" DROP CONSTRAINT "FK_89850b75004a2cdc7f0254aa6c3"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "cart"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "sells"`);
    }

}

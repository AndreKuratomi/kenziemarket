import {MigrationInterface, QueryRunner} from "typeorm";

export class entitiesUpdated1644608569389 implements MigrationInterface {
    name = 'entitiesUpdated1644608569389'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sells" DROP CONSTRAINT "FK_89850b75004a2cdc7f0254aa6c3"`);
        await queryRunner.query(`ALTER TABLE "sells" DROP CONSTRAINT "PK_98dae8a080bb62a676f24e0dee0"`);
        await queryRunner.query(`ALTER TABLE "sells" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "sells" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "sells" ADD CONSTRAINT "PK_98dae8a080bb62a676f24e0dee0" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "sells" DROP CONSTRAINT "REL_89850b75004a2cdc7f0254aa6c"`);
        await queryRunner.query(`ALTER TABLE "sells" DROP COLUMN "cartId"`);
        await queryRunner.query(`ALTER TABLE "sells" ADD "cartId" uuid`);
        await queryRunner.query(`ALTER TABLE "sells" ADD CONSTRAINT "UQ_89850b75004a2cdc7f0254aa6c3" UNIQUE ("cartId")`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_7a637e662f7c4b3a85001c53dfd"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "cartId"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "cartId" uuid`);
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "cart" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "sells" ADD CONSTRAINT "FK_89850b75004a2cdc7f0254aa6c3" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_7a637e662f7c4b3a85001c53dfd" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_7a637e662f7c4b3a85001c53dfd"`);
        await queryRunner.query(`ALTER TABLE "sells" DROP CONSTRAINT "FK_89850b75004a2cdc7f0254aa6c3"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "cart" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "cartId"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "cartId" integer`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_7a637e662f7c4b3a85001c53dfd" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sells" DROP CONSTRAINT "UQ_89850b75004a2cdc7f0254aa6c3"`);
        await queryRunner.query(`ALTER TABLE "sells" DROP COLUMN "cartId"`);
        await queryRunner.query(`ALTER TABLE "sells" ADD "cartId" integer`);
        await queryRunner.query(`ALTER TABLE "sells" ADD CONSTRAINT "REL_89850b75004a2cdc7f0254aa6c" UNIQUE ("cartId")`);
        await queryRunner.query(`ALTER TABLE "sells" DROP CONSTRAINT "PK_98dae8a080bb62a676f24e0dee0"`);
        await queryRunner.query(`ALTER TABLE "sells" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "sells" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sells" ADD CONSTRAINT "PK_98dae8a080bb62a676f24e0dee0" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "sells" ADD CONSTRAINT "FK_89850b75004a2cdc7f0254aa6c3" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

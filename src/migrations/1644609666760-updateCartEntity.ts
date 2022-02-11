import {MigrationInterface, QueryRunner} from "typeorm";

export class updateCartEntity1644609666760 implements MigrationInterface {
    name = 'updateCartEntity1644609666760'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" DROP COLUMN "cartOwner"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP COLUMN "products"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" ADD "products" text array NOT NULL DEFAULT '{}'`);
        await queryRunner.query(`ALTER TABLE "cart" ADD "cartOwner" character varying NOT NULL`);
    }

}

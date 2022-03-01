import {MigrationInterface, QueryRunner} from "typeorm";

export class updatesToSell1646108958761 implements MigrationInterface {
    name = 'updatesToSell1646108958761'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sells" DROP COLUMN "clientName"`);
        await queryRunner.query(`ALTER TABLE "sells" DROP COLUMN "clientEmail"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sells" ADD "clientEmail" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sells" ADD "clientName" character varying NOT NULL`);
    }

}

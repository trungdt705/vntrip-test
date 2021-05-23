import {MigrationInterface, QueryRunner} from "typeorm";

export class testMigration1621440851848 implements MigrationInterface {
    name = 'testMigration1621440851848'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "order" ("id" SERIAL NOT NULL, "order_code" character varying NOT NULL, "order_type" character varying NOT NULL, "order_status" character varying NOT NULL, "total_price" integer NOT NULL, "quantity" integer NOT NULL, "products" character varying array NOT NULL DEFAULT '{}', CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "id" SERIAL NOT NULL, "product_name" character varying NOT NULL, "product_code" character varying NOT NULL, "price" integer NOT NULL, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "order"`);
    }

}

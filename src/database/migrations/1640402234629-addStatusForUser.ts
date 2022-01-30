import {MigrationInterface, QueryRunner} from "typeorm";

export class addStatusForUser1640402234629 implements MigrationInterface {
    name = 'addStatusForUser1640402234629'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`status\` enum ('inactive', 'active', 'deleted') NOT NULL DEFAULT 'inactive'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`status\``);
    }

}

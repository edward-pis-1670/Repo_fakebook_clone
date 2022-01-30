import {MigrationInterface, QueryRunner} from "typeorm";

export class addsecretToUserEntitty1640577926099 implements MigrationInterface {
    name = 'addsecretToUserEntitty1640577926099'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`twoFactorAuthenticationSecret\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`twoFactorAuthenticationSecret\``);
    }

}

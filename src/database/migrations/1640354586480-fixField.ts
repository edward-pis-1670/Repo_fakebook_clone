import {MigrationInterface, QueryRunner} from "typeorm";

export class fixField1640354586480 implements MigrationInterface {
    name = 'fixField1640354586480'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`RrToken\` \`refreshtToken\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`refreshtToken\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`refreshtToken\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`refreshtToken\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`refreshtToken\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`refreshtToken\` \`RrToken\` varchar(255) NULL`);
    }

}

import {MigrationInterface, QueryRunner} from "typeorm";

export class UserFollow1640339678942 implements MigrationInterface {
    name = 'UserFollow1640339678942'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user_follow\` (\`id\` int NOT NULL AUTO_INCREMENT, \`type\` smallint NOT NULL DEFAULT '0', \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` datetime NULL, \`sourceId\` int NOT NULL, \`targetId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user_follow\` ADD CONSTRAINT \`FK_2356404b080d600e9181c571d24\` FOREIGN KEY (\`sourceId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_follow\` ADD CONSTRAINT \`FK_676a9c9abed6b0527b5f7f264fa\` FOREIGN KEY (\`targetId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_follow\` DROP FOREIGN KEY \`FK_676a9c9abed6b0527b5f7f264fa\``);
        await queryRunner.query(`ALTER TABLE \`user_follow\` DROP FOREIGN KEY \`FK_2356404b080d600e9181c571d24\``);
        await queryRunner.query(`DROP TABLE \`user_follow\``);
    }

}

import {MigrationInterface, QueryRunner} from "typeorm";

export class UserFriend1640339465980 implements MigrationInterface {
    name = 'UserFriend1640339465980'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user_friend\` (\`id\` int NOT NULL AUTO_INCREMENT, \`type\` smallint NOT NULL DEFAULT '0', \`status\` smallint NOT NULL DEFAULT '0', \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` datetime NULL, \`notes\` text NULL, \`sourceId\` int NOT NULL, \`targetId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user_friend\` ADD CONSTRAINT \`FK_4966c7cb77b0895aa0c33a745e8\` FOREIGN KEY (\`sourceId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_friend\` ADD CONSTRAINT \`FK_19afa75c2f4c8eae9ce7299208b\` FOREIGN KEY (\`targetId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_friend\` DROP FOREIGN KEY \`FK_19afa75c2f4c8eae9ce7299208b\``);
        await queryRunner.query(`ALTER TABLE \`user_friend\` DROP FOREIGN KEY \`FK_4966c7cb77b0895aa0c33a745e8\``);
        await queryRunner.query(`DROP TABLE \`user_friend\``);
    }

}

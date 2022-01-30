import {MigrationInterface, QueryRunner} from "typeorm";

export class UserPost1640339617383 implements MigrationInterface {
    name = 'UserPost1640339617383'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user_post\` (\`id\` int NOT NULL AUTO_INCREMENT, \`message\` tinytext NOT NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` datetime NULL, \`userId\` int NOT NULL, \`senderId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user_post\` ADD CONSTRAINT \`FK_61c64496bf096b321869175021a\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_post\` ADD CONSTRAINT \`FK_ec53026a8521dfa8bc8f4a80efa\` FOREIGN KEY (\`senderId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_post\` DROP FOREIGN KEY \`FK_ec53026a8521dfa8bc8f4a80efa\``);
        await queryRunner.query(`ALTER TABLE \`user_post\` DROP FOREIGN KEY \`FK_61c64496bf096b321869175021a\``);
        await queryRunner.query(`DROP TABLE \`user_post\``);
    }

}

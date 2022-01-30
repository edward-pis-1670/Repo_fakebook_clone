import {MigrationInterface, QueryRunner} from "typeorm";

export class GroupMessage1640340423507 implements MigrationInterface {
    name = 'GroupMessage1640340423507'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`group_message\` (\`id\` int NOT NULL AUTO_INCREMENT, \`message\` tinytext NOT NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` datetime NULL, \`userId\` int NOT NULL, \`groupId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`group_message\` ADD CONSTRAINT \`FK_2b363dbe35f2abc4a88148c759d\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`group_message\` ADD CONSTRAINT \`FK_58500392580a2312a7c8faf313a\` FOREIGN KEY (\`groupId\`) REFERENCES \`group\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`group_message\` DROP FOREIGN KEY \`FK_58500392580a2312a7c8faf313a\``);
        await queryRunner.query(`ALTER TABLE \`group_message\` DROP FOREIGN KEY \`FK_2b363dbe35f2abc4a88148c759d\``);
        await queryRunner.query(`DROP TABLE \`group_message\``);
    }

}

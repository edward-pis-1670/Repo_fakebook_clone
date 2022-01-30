import {MigrationInterface, QueryRunner} from "typeorm";

export class UserMessage1640339558547 implements MigrationInterface {
    name = 'UserMessage1640339558547'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user_message\` (\`id\` int NOT NULL AUTO_INCREMENT, \`message\` tinytext NOT NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` datetime NULL, \`sourceId\` int NOT NULL, \`targetId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user_message\` ADD CONSTRAINT \`FK_4fcc91a95ffaaebdcf2405dbd9c\` FOREIGN KEY (\`sourceId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_message\` ADD CONSTRAINT \`FK_ddceff43123884b70d2f91ef302\` FOREIGN KEY (\`targetId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_message\` DROP FOREIGN KEY \`FK_ddceff43123884b70d2f91ef302\``);
        await queryRunner.query(`ALTER TABLE \`user_message\` DROP FOREIGN KEY \`FK_4fcc91a95ffaaebdcf2405dbd9c\``);
        await queryRunner.query(`DROP TABLE \`user_message\``);
    }

}

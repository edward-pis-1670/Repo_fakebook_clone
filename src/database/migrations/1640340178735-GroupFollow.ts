import {MigrationInterface, QueryRunner} from "typeorm";

export class GroupFollow1640340178735 implements MigrationInterface {
    name = 'GroupFollow1640340178735'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`group_follow\` (\`id\` int NOT NULL AUTO_INCREMENT, \`type\` enum ('like', 'dislike', 'follow') NOT NULL DEFAULT 'like', \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` datetime NULL, \`userId\` int NOT NULL, \`groupId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`group_follow\` ADD CONSTRAINT \`FK_dafa5a372bfd3db8174071f9564\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`group_follow\` ADD CONSTRAINT \`FK_44fdda3b7519398154eebed1731\` FOREIGN KEY (\`groupId\`) REFERENCES \`group\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`group_follow\` DROP FOREIGN KEY \`FK_44fdda3b7519398154eebed1731\``);
        await queryRunner.query(`ALTER TABLE \`group_follow\` DROP FOREIGN KEY \`FK_dafa5a372bfd3db8174071f9564\``);
        await queryRunner.query(`DROP TABLE \`group_follow\``);
    }

}

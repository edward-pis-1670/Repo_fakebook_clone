import {MigrationInterface, QueryRunner} from "typeorm";

export class GroupMember1640340058708 implements MigrationInterface {
    name = 'GroupMember1640340058708'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`group_member\` (\`id\` int NOT NULL AUTO_INCREMENT, \`role\` enum ('admin', 'moderator', 'member') NOT NULL DEFAULT 'member', \`status\` enum ('new', 'rejected', 'active', 'blocked') NOT NULL DEFAULT 'new', \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` datetime NULL, \`notes\` text NOT NULL, \`userId\` int NOT NULL, \`groupId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`group_member\` ADD CONSTRAINT \`FK_9f209c217eef89b8c32bd077903\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`group_member\` ADD CONSTRAINT \`FK_44c8964c097cf7f71434d6d1122\` FOREIGN KEY (\`groupId\`) REFERENCES \`group\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`group_member\` DROP FOREIGN KEY \`FK_44c8964c097cf7f71434d6d1122\``);
        await queryRunner.query(`ALTER TABLE \`group_member\` DROP FOREIGN KEY \`FK_9f209c217eef89b8c32bd077903\``);
        await queryRunner.query(`DROP TABLE \`group_member\``);
    }

}

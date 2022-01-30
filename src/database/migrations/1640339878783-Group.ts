import {MigrationInterface, QueryRunner} from "typeorm";

export class Group1640339878783 implements MigrationInterface {
    name = 'Group1640339878783'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`group\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(75) NOT NULL, \`metaTitle\` varchar(100) NOT NULL, \`slug\` varchar(100) NOT NULL, \`summary\` tinytext NOT NULL, \`profile\` text NOT NULL, \`content\` text NOT NULL, \`status\` enum ('new', 'approved', 'active', 'blocked') NOT NULL DEFAULT 'active', \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` datetime NULL, \`createdBy\` int NOT NULL, \`updatedBy\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`group\` ADD CONSTRAINT \`FK_8ab4d4ef5460ba79729fa3db97e\` FOREIGN KEY (\`createdBy\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`group\` ADD CONSTRAINT \`FK_d6288c2b9f8202782b4bac11bd0\` FOREIGN KEY (\`updatedBy\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`group\` DROP FOREIGN KEY \`FK_d6288c2b9f8202782b4bac11bd0\``);
        await queryRunner.query(`ALTER TABLE \`group\` DROP FOREIGN KEY \`FK_8ab4d4ef5460ba79729fa3db97e\``);
        await queryRunner.query(`DROP TABLE \`group\``);
    }

}

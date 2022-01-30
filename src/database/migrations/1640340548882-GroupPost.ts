import {MigrationInterface, QueryRunner} from "typeorm";

export class GroupPost1640340548882 implements MigrationInterface {
    name = 'GroupPost1640340548882'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`group_post\` (\`id\` int NOT NULL AUTO_INCREMENT, \`message\` tinytext NOT NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` datetime NULL, \`userId\` int NOT NULL, \`groupId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`group_post\` ADD CONSTRAINT \`FK_8939de3614171733234fed30e28\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`group_post\` ADD CONSTRAINT \`FK_b4aa5bdc9931dee5d5bd28cc719\` FOREIGN KEY (\`groupId\`) REFERENCES \`group\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`group_post\` DROP FOREIGN KEY \`FK_b4aa5bdc9931dee5d5bd28cc719\``);
        await queryRunner.query(`ALTER TABLE \`group_post\` DROP FOREIGN KEY \`FK_8939de3614171733234fed30e28\``);
        await queryRunner.query(`DROP TABLE \`group_post\``);
    }

}

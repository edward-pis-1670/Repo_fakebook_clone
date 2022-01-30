import { MigrationInterface, QueryRunner } from 'typeorm';

export class User1640339331782 implements MigrationInterface {
  name = 'User1640339331782';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstName\` varchar(50) NULL, \`middleName\` varchar(50) NULL, \`lastName\` varchar(50) NULL, \`username\` varchar(50) NULL, \`mobile\` varchar(15) NULL, \`email\` varchar(50) NOT NULL, \`passwordHash\` varchar(100) NOT NULL, \`registeredAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`lastLogin\` datetime NULL, \`intro\` tinytext NULL, \`profile\` text NULL, \`RrToken\` varchar(255) NULL, UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`), UNIQUE INDEX \`IDX_29fd51e9cf9241d022c5a4e02e\` (\`mobile\`), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_29fd51e9cf9241d022c5a4e02e\` ON \`user\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` ON \`user\``,
    );
    await queryRunner.query(`DROP TABLE \`user\``);
  }
}

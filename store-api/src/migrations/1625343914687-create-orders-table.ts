import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateOrdersTable1625343914687 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'orders',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'total',
            type: 'double precision',
          },
          {
            name: 'status',
            type: 'varchar',
          },
          {
            name: 'credit_card_number',
            type: 'varchar',
          },
          {
            name: 'credit_card_name',
            type: 'varchar',
          },
          {
            name: 'credit_card_cvv',
            type: 'varchar',
          },
          {
            name: 'credit_card_expiration_month',
            type: 'int',
          },
          {
            name: 'credit_card_expiration_year',
            type: 'int',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('orders');
  }
}

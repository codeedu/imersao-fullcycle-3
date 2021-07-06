import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateInvoicesTable1625441676055 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'invoices',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'amount',
            type: 'double precision',
          },
          {
            name: 'payment_date',
            type: 'timestamp',
          },
          {
            name: 'credit_card_id',
            type: 'uuid',
          },
          {
            name: 'transaction_id',
            type: 'uuid',
          },
          {
            name: 'store',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'text',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'invoices',
      new TableForeignKey({
        name: 'invoices_credit_card_id_foreign_key',
        columnNames: ['credit_card_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'credit_cards',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'invoices',
      'invoices_credit_card_id_foreign_key',
    );
    await queryRunner.dropTable('invoices');
  }
}

import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddCoulunAtInAppointment1600689011249
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'appointment',
      new TableColumn({
        name: 'create_at',
        type: 'timestamp',
        default: 'now()',
      }),
    );

    await queryRunner.addColumn(
      'appointment',
      new TableColumn({
        name: 'update_at',
        type: 'timestamp',
        default: 'now()',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('appointment', 'update_at');

    await queryRunner.dropColumn('appointment', 'create_at');
  }
}

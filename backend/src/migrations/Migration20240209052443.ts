import { Migration } from '@mikro-orm/migrations';

export class Migration20240209052443 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "contact" rename column "organization" to "org";');
    this.addSql('alter table "contact" rename column "organization_type" to "org_type";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "contact" rename column "org" to "organization";');
    this.addSql('alter table "contact" rename column "org_type" to "organization_type";');
  }

}

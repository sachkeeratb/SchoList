import { Migration } from '@mikro-orm/migrations';

export class Migration20240209014357 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');
    this.addSql('alter table "user" add constraint "user_name_unique" unique ("name");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user" drop constraint "user_email_unique";');
    this.addSql('alter table "user" drop constraint "user_name_unique";');
  }

}

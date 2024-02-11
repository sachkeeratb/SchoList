import { Migration } from '@mikro-orm/migrations';

export class Migration20240209014538 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "contact" ("id" serial primary key, "email" text not null, "name" text not null, "phone_num" text null, "organization" text not null, "organization_type" boolean null, "created_at" date not null default \'NOW()\', "updated_at" date not null);');
    this.addSql('alter table "contact" add constraint "contact_email_unique" unique ("email");');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "contact" cascade;');
  }

}

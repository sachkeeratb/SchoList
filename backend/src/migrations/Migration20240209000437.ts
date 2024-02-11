import { Migration } from '@mikro-orm/migrations';

export class Migration20240209000437 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" serial primary key, "email" text not null, "name" text not null, "password" text not null, "created_at" date not null default \'NOW()\', "updated_at" date not null);');

    this.addSql('drop table if exists "User" cascade;');

    this.addSql('drop table if exists "_prisma_migrations" cascade;');

    this.addSql('drop table if exists "post" cascade;');
  }

  async down(): Promise<void> {
    this.addSql('create table "User" ("id" serial primary key, "email" text not null, "name" text not null, "password" text not null, "createdAt" date(0) null, "updatedAt" date(0) null);');

    this.addSql('create table "_prisma_migrations" ("id" varchar(36) not null, "checksum" varchar(64) not null, "finished_at" timestamptz(6) null, "migration_name" varchar(255) not null, "logs" text null, "rolled_back_at" timestamptz(6) null, "started_at" timestamptz(6) not null default now(), "applied_steps_count" int4 not null default 0, constraint "_prisma_migrations_pkey" primary key ("id"));');

    this.addSql('create table "post" ("id" serial primary key, "email" text not null, "name" text not null, "password" text not null, "created_at" date(0) not null, "updated_at" date(0) not null);');

    this.addSql('drop table if exists "user" cascade;');
  }

}

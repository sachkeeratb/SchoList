"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20240209014538 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20240209014538 extends migrations_1.Migration {
    up() {
        return __awaiter(this, void 0, void 0, function* () {
            this.addSql('create table "contact" ("id" serial primary key, "email" text not null, "name" text not null, "phone_num" text null, "organization" text not null, "organization_type" boolean null, "created_at" date not null default \'NOW()\', "updated_at" date not null);');
            this.addSql('alter table "contact" add constraint "contact_email_unique" unique ("email");');
        });
    }
    down() {
        return __awaiter(this, void 0, void 0, function* () {
            this.addSql('drop table if exists "contact" cascade;');
        });
    }
}
exports.Migration20240209014538 = Migration20240209014538;
//# sourceMappingURL=Migration20240209014538.js.map
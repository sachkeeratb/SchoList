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
exports.Migration20240209052443 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20240209052443 extends migrations_1.Migration {
    up() {
        return __awaiter(this, void 0, void 0, function* () {
            this.addSql('alter table "contact" rename column "organization" to "org";');
            this.addSql('alter table "contact" rename column "organization_type" to "org_type";');
        });
    }
    down() {
        return __awaiter(this, void 0, void 0, function* () {
            this.addSql('alter table "contact" rename column "org" to "organization";');
            this.addSql('alter table "contact" rename column "org_type" to "organization_type";');
        });
    }
}
exports.Migration20240209052443 = Migration20240209052443;
//# sourceMappingURL=Migration20240209052443.js.map
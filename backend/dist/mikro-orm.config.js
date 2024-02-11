"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("./entities/User");
const Contact_1 = require("./entities/Contact");
const constants_1 = require("./constants");
const postgresql_1 = require("@mikro-orm/postgresql");
const migrations_1 = require("@mikro-orm/migrations");
exports.default = {
    extensions: [migrations_1.Migrator],
    entities: [User_1.User, Contact_1.Contact],
    dbName: "postgres",
    driver: postgresql_1.PostgreSqlDriver,
    user: "postgres",
    password: "sachkeerat",
    debug: !constants_1.__prod__
};
//# sourceMappingURL=mikro-orm.config.js.map
// Import the entities
import { User } from "./entities/User";
import { Contact } from "./entities/Contact";

import { __prod__ } from "./constants" // Import the constanst
import { MikroORM } from "@mikro-orm/core"; // Import the ORM
import { PostgreSqlDriver } from "@mikro-orm/postgresql"; // Import the driver for PostgresQL

import { Migrator } from '@mikro-orm/migrations' // For migrations

// Export the information
export default {
    extensions: [ Migrator ],
    entities: [ User, Contact ],
    dbName: "postgres",
    driver: PostgreSqlDriver,
    user: "postgres",
    password: "sachkeerat",
    debug: !__prod__
} as Parameters<typeof MikroORM.init>[0];
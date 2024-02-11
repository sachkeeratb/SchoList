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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const core_1 = require("@mikro-orm/core");
const mikro_orm_config_1 = __importDefault(require("./mikro-orm.config"));
const constants_1 = require("./constants");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const user_1 = require("./resolvers/user");
const contact_1 = require("./resolvers/contact");
const cors_1 = __importDefault(require("cors"));
const ioredis_1 = __importDefault(require("ioredis"));
const express_session_1 = __importDefault(require("express-session"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    (0, cors_1.default)({
        origin: "https://stuido.apollographql.com",
        credentials: true,
    });
    const orm = yield core_1.MikroORM.init(mikro_orm_config_1.default);
    yield orm.getMigrator().up();
    const app = (0, express_1.default)();
    const redis = new ioredis_1.default();
    const redisConfig = {
        client: redis,
        disableTouch: true,
    };
    let redisStore = new connect_redis_1.default(redisConfig);
    app.use((0, express_session_1.default)({
        name: "qid",
        store: redisStore,
        cookie: {
            maxAge: 100 * 60 * 60 * 24 * 30 * 6,
            httpOnly: true,
            sameSite: "lax",
            secure: constants_1.__prod__,
        },
        saveUninitialized: false,
        secret: "bequietshhhh",
        resave: false,
    }));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: yield (0, type_graphql_1.buildSchema)({
            resolvers: [user_1.UserResolver, contact_1.ContactResolver],
            validate: false,
        }),
        context: ({ req, res }) => ({ em: orm.em, req, res }),
    });
    yield apolloServer.start();
    apolloServer.applyMiddleware({
        app,
        cors: {
            origin: [process.env.CORS_ORIGIN, "https://studio.apollographql.com"],
            credentials: true,
        },
    });
    app.listen(3001, () => {
        console.log("server started");
    });
});
main();
//# sourceMappingURL=index.js.map
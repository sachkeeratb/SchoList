"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.ContactResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Contact_1 = require("../entities/Contact");
let ContactResolver = class ContactResolver {
    contacts({ em }) {
        return em.find(Contact_1.Contact, {});
    }
    post(id, { em }) {
        return em.findOne(Contact_1.Contact, { id });
    }
    createContact(email, name, phoneNum, org, orgType, createdAt, updatedAt, { em }) {
        return __awaiter(this, void 0, void 0, function* () {
            const contact = em.create(Contact_1.Contact, {
                email,
                name,
                phoneNum,
                org,
                orgType,
                createdAt,
                updatedAt,
            });
            yield em.persistAndFlush(Contact_1.Contact);
            return contact;
        });
    }
    updateContact(id, email, name, phoneNum, org, orgType, createdAt, updatedAt, { em }) {
        return __awaiter(this, void 0, void 0, function* () {
            const contact = yield em.findOne(Contact_1.Contact, {
                id,
                email,
                name,
                phoneNum,
                org,
                orgType,
                createdAt,
                updatedAt,
            });
            if (!contact) {
                return null;
            }
            contact.email = email;
            yield em.persistAndFlush(contact);
            return contact;
        });
    }
    deleteContact(id, { em }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                em.nativeDelete(Contact_1.Contact, { id });
            }
            catch (_a) {
                return false;
            }
            return true;
        });
    }
};
exports.ContactResolver = ContactResolver;
__decorate([
    (0, type_graphql_1.Query)(() => [Contact_1.Contact]),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ContactResolver.prototype, "contacts", null);
__decorate([
    (0, type_graphql_1.Query)(() => Contact_1.Contact, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ContactResolver.prototype, "post", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Contact_1.Contact),
    __param(0, (0, type_graphql_1.Arg)("email")),
    __param(1, (0, type_graphql_1.Arg)("name")),
    __param(2, (0, type_graphql_1.Arg)("phoneNum")),
    __param(3, (0, type_graphql_1.Arg)("org")),
    __param(4, (0, type_graphql_1.Arg)("orgType")),
    __param(5, (0, type_graphql_1.Arg)("createdAt")),
    __param(6, (0, type_graphql_1.Arg)("updatedAt")),
    __param(7, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String,
        String,
        String,
        String,
        Boolean,
        Date,
        Date, Object]),
    __metadata("design:returntype", Promise)
], ContactResolver.prototype, "createContact", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Contact_1.Contact, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Arg)("email")),
    __param(2, (0, type_graphql_1.Arg)("name")),
    __param(3, (0, type_graphql_1.Arg)("phoneNum")),
    __param(4, (0, type_graphql_1.Arg)("org")),
    __param(5, (0, type_graphql_1.Arg)("orgType")),
    __param(6, (0, type_graphql_1.Arg)("createdAt")),
    __param(7, (0, type_graphql_1.Arg)("updatedAt")),
    __param(8, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String,
        String,
        String,
        String,
        Boolean,
        Date,
        Date, Object]),
    __metadata("design:returntype", Promise)
], ContactResolver.prototype, "updateContact", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ContactResolver.prototype, "deleteContact", null);
exports.ContactResolver = ContactResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], ContactResolver);
//# sourceMappingURL=contact.js.map
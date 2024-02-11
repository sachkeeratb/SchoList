import { MyContext } from "src/types"; // import the context
import { Resolver, Query, Ctx, Arg, Mutation } from "type-graphql"; // GraphQL imports
import { Contact } from "../entities/Contact"; // import the contact information

@Resolver()
// To resolve the contact (create, edit, etc.)
export class ContactResolver {
  // To find the contacts
  @Query(() => [Contact])
  contacts(@Ctx() { em }: MyContext): Promise<Contact[]> {
    return em.find(Contact, {});
  }

  // To post the contact
  @Query(() => Contact, { nullable: true })
  post(
    @Arg("id") id: number,
    @Ctx() { em }: MyContext
  ): Promise<Contact | null> {
    return em.findOne(Contact, { id });
  }

  // Create the contact
  @Mutation(() => Contact)
  async createContact(
    @Arg("email") email: String,
    @Arg("name") name: String,
    @Arg("phoneNum") phoneNum: String,
    @Arg("org") org: String,
    @Arg("orgType") orgType: Boolean,
    @Arg("createdAt") createdAt: Date,
    @Arg("updatedAt") updatedAt: Date,
    @Ctx() { em }: MyContext
  ): Promise<Contact> {
    const contact = em.create(Contact, {
      email,
      name,
      phoneNum,
      org,
      orgType,
      createdAt,
      updatedAt,
    });
    await em.persistAndFlush(Contact);
    return contact;
  }

  // Update the contact
  @Mutation(() => Contact, { nullable: true })
  async updateContact(
    @Arg("id") id: number,
    @Arg("email") email: String,
    @Arg("name") name: String,
    @Arg("phoneNum") phoneNum: String,
    @Arg("org") org: String,
    @Arg("orgType") orgType: Boolean,
    @Arg("createdAt") createdAt: Date,
    @Arg("updatedAt") updatedAt: Date,
    @Ctx() { em }: MyContext
  ): Promise<Contact | null> {
    const contact = await em.findOne(Contact, {
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
    await em.persistAndFlush(contact);
    return contact;
  }

  // Delete the contact
  @Mutation(() => Boolean)
  async deleteContact(
    @Arg("id") id: number,
    @Ctx() { em }: MyContext
  ): Promise<boolean> {
    try {
      em.nativeDelete(Contact, { id });
    } catch {
      return false;
    }
    return true;
  }
}

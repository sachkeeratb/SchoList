import { Entity, PrimaryKey, Property } from "@mikro-orm/core"; // ORM inports
import { Field, ObjectType } from "type-graphql"; // GraphQL imports

@ObjectType()
@Entity()

// This class is for the contacts, their information, and their organization
export class Contact {
  // ID as a number
  @PrimaryKey({ type: "int" })
  id!: number;

  // E-mail as a string, visible, unique
  @Field(() => String)
  @Property({ type: "text", unique: true })
  email!: String;

  // Name as a string, visible
  @Field(() => String)
  @Property({ type: "text" })
  name!: String;

  // Phone Number as a string, visible
  @Field(() => String)
  @Property({ type: "text", nullable: true })
  phoneNum!: String;

  // Organization as a string, visible
  @Field(() => String)
  @Property({ type: "text" })
  org!: String;

  // Organization type as a boolean (if it is for-profit or non-profit), visible
  @Field(() => Boolean)
  @Property({ type: "boolean", nullable: true })
  orgType!: Boolean;

  // When the contact was created
  @Field(() => Date)
  @Property({ type: "date", default: "NOW()" })
  createdAt = new Date();

  // When the contact was last updated by the user
  @Field(() => Date)
  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt = new Date();
}

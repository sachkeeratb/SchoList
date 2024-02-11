import { Entity, PrimaryKey, Property } from "@mikro-orm/core"; // ORM imports
import { Field, ObjectType } from "type-graphql"; // GraphQL imprts

@ObjectType()
@Entity()

// This class is for the user and their information
export class User {
  // ID as a number
  @PrimaryKey({ type: "int" })
  id!: number;

  // Email as a string, visible, unique
  @Field(() => String)
  @Property({ type: "text", unique: true })
  email!: string;

  // Name as a string, visible, unique
  @Field(() => String)
  @Property({ type: "text", unique: true })
  name!: string;

  // Password as a string, invisible
  @Property({ type: "text" })
  password!: string;

  // When the account was created
  @Field(() => Date)
  @Property({ type: "date", default: "NOW()" })
  createdAt = new Date();

  // When the account information was last updated
  @Field(() => Date)
  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt = new Date();
}

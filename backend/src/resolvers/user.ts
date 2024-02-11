import { User } from "../entities/User"; // Import the User
import { MyContext } from "src/types"; // Import the context
import {
  Resolver,
  Ctx,
  Arg,
  Mutation,
  Field,
  InputType,
  ObjectType,
  Query,
} from "type-graphql"; // GraphQL imports
import argon2 from "argon2"; // Keeping the password secure (encryption) through Argon 2

// To store what can be inputted into the user
@InputType()
class inputs {
  @Field()
  email: string;
  @Field()
  name: string;
  @Field()
  password: string;
  @Field()
  createdAt: Date;
  @Field()
  updatedAt: Date;
}

// To create the express session
declare module "express-session" {
  export interface SessionData {
    user: { [key: string]: any };
    userId: number;
  }
}

// To output customized errors
@ObjectType()
class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

// To output customized errors
@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

// To resolve the user (get, post, update, etc.)
@Resolver()
export class UserResolver {
  // Query the user
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req, em }: MyContext) {
    // Check if the user is logged in or not
    if (!req.session.userId) {
      return null;
    }

    const user = await em.findOne(User, { id: req.session.userId });
    return user;
  }

  // For the user to sign up
  @Mutation(() => UserResponse)
  async signup(
    @Arg("info") info: inputs,
    @Ctx() { em }: MyContext
  ): Promise<UserResponse> {
    // Return an error if the name is less than 3 characters long
    if (info.name.length < 3) {
      return {
        errors: [
          {
            field: "name",
            message: "Organizational name must be greater than 2.",
          },
        ],
      };
    }

    // Return an error if the password is less than 3 characters long
    if (info.password.length < 3) {
      return {
        errors: [
          {
            field: "password",
            message: "Password must be greater than 2.",
          },
        ],
      };
    }
    const hashPass = await argon2.hash(info.password); // Encrypt the password
    const user = em.create(User, {
      name: info.name,
      email: info.email,
      password: hashPass,
      createdAt: info.createdAt,
      updatedAt: info.updatedAt,
    });
    try {
      await em.persistAndFlush(user);
    } catch (err) {
      // If the name is already taken
      if (err.code === "23505") {
        return {
          errors: [
            {
              field: "name",
              message: "Organizational name already taken.",
            },
          ],
        };
      }
    }
    return { user };
  }

  // For the user to log in
  @Mutation(() => UserResponse)
  async login(
    @Arg("info") info: inputs,
    @Ctx() { em, req }: MyContext
  ): Promise<UserResponse> {
    const user = await em.findOne(User, {
      name: info.name,
      email: info.email,
      password: info.password,
    });

    // If the name is invalid
    if (typeof user?.name == "undefined" || user?.name == null || !user?.name) {
      return {
        errors: [
          {
            field: "name",
            message: "Invalid name.",
          },
        ],
      };
    }

    // If the email is invalid
    if (
      typeof user?.email == "undefined" ||
      user?.email == null ||
      !user?.email
    ) {
      return {
        errors: [
          {
            field: "email",
            message: "Invalid email.",
          },
        ],
      };
    }

    // If the password is invalid
    const valid = await argon2.verify(user.password, info.password); // Compare the original password to the encrypted one
    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "Incorrect password.",
          },
        ],
      };
    }

    // Store the session of the user id
    // Give a cookie to the user
    req.session!.userId = user.id;

    return {
      user,
    };
  }
}

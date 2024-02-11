import { EntityManager, IDatabaseDriver, Connection } from "@mikro-orm/core"; // ORM imports
import { Request, Response } from "express"; // Express imports for requests and responses
import { Session } from "express-session"; // Import the session

export type MyContext = {
  em: EntityManager<IDatabaseDriver<Connection>>;
  req: Request & { session?: Session };
  res: Response;
};

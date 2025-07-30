import { DefaultSession, DefaultUser } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User extends DefaultUser {
    _id: string;
    email: string;
    username: string;
    image: string;
  }
  interface Session extends DefaultSession {
    user: {
      _id: string;

      email: string;
      username: string;
      image: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    _id: string;

    email: string;
    username: string;
    image: string;
  }
}

import { DefaultSession, DefaultUser } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User extends DefaultUser {
    email: string;
    username: string;
    image: string;
  }
  interface Session extends DefaultSession {
    user: {
      email: string;
      username: string;
      image: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    email: string;
    username: string;
    image: string;
  }
}

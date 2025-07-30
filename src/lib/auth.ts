import NextAuth, { NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/usermodel";
import dbConnection from "./dbConnection";
import { Profile } from "next-auth";
const authOptions: NextAuthConfig = {
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.Google_Id,
      clientSecret: process.env.Google_client_secret,
      // authorization: {
      //   params: {
      //     prompt: "consent",
      //     access_type: "offline",
      //     response_type: "code",
      //     // Explicitly enable PKCE
      //     code_challenge_method: "S256",
      //   },
      // },
    }),
  ],

  callbacks: {
    async signIn({ profile }) {
      // check if the user exist
      await dbConnection();

      const existingUser = await User.findOne({
        email: profile?.email,
      });
      if (!existingUser) {
        await User.create({
          email: profile?.email,
          username: profile?.name,
          image: profile?.picture,
        });
      }
      return true;
    },
    async jwt({ token, user, profile }) {
      if (user || profile) {
        token.email = user?.email ?? profile?.email ?? "";
        token.image = user.email;
        token.username = user.username;
      }

      return token;
    },
    async session({ session, token }) {
      await dbConnection();
      const userId = await User.findOne({ email: token.email });
      session.user.id = userId._id.toString();

      if (token) {
        session.user.email = token.email;
        session.user.username = token.username;
        session.user.image = token.image;
      }
      return session;
    },
  },
  // Add cookie configuration
  // cookies: {
  //   pkceCodeVerifier: {
  //     name: "next-auth.pkce.code_verifier",
  //     options: {
  //       httpOnly: true,
  //       sameSite: "lax",
  //       path: "/",
  //       secure: process.env.NODE_ENV === "production",
  //     },
  //   },
  // },
};

// Define or import the handler before exporting
const { handlers, signIn, signOut, auth } = NextAuth(authOptions);

export { handlers };
export { signIn, signOut, auth };

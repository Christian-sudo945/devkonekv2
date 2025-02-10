import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }

  interface User {
    name: any;
    image: any;
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    role?: string;
    skills?: string[];
    emailVerified?: Date | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    userId?: string;
    role?: string;
  }
}

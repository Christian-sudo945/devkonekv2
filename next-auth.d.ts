
import { Session } from "next-auth"
import { JWT } from "next-auth/jwt"
declare module "next-auth" {
  interface Session {
    user: any
    user: any
    accessToken?: string
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string
  }
}

export { JWT }

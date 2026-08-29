import { type NextAuthOptions } from "next-auth"
import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { env } from "@/src/lib/env"

const allowedEmails = [
  "faniryram0@gmail.com",
  // "faniriniaina.ram@smartone.ai",
]

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
      authorization: {
        params: {
          scope: "read:user user:email",
        },
      },
    }),

    GoogleProvider({
      clientId: env.GOOGLE_ID,
      clientSecret: env.GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "login", // 🔥 force le choix du compte
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ user }) {
      console.log("LOGIN:", user.email)

      if (!user.email) return false

      const isAllowed = allowedEmails.includes(user.email)

      if (!isAllowed) {
        console.warn("Unauthorized email:", user.email)
      }

      return isAllowed
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.email = token.email as string
      }
      return session
    },

    async jwt({ token, user }) {
      // 🔥 important pour garder email en session
      if (user) {
        token.email = user.email
      }
      return token
    },
  },

  pages: {
    signIn: "/login", // 🔥 redirection propre
  },

  secret: env.NEXTAUTH_SECRET,
}
// import NextAuth from "next-auth/next";
// import Credentials from "next-auth/providers/credentials";

// const authOptions = {
//   session: {
//     maxAge: 24 * 60 * 60, // 1 hari : 60 detik * 60 * 24
//     strategy: "jwt",
//   },
//   secret: "anjay123",
//   providers: [
//     Credentials({
//       type: "credentials",
//       name: "Credentials",
//       credentials: {
//         email: { label: "email", type: "email" },
//         password: { label: "password", type: "password" },
//       },
//       async authorize(credentials) {
//         const { email, password } = credentials;

//         if (email === "1@gmail.com" && password === "1") {
//           return {
//             id: 1,
//             email: email,
//             username: "anjay",
//             role: "WRITER",
//           };
//         } else {
//           return null;
//         }
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, account, profile, user }) {
//       if (account?.provider === "credentials") {
//         (token.email = user.email),
//           (token.name = user.username),
//           (token.role = user.role);
//       }
//       return token;
//     },

//     async session({ session, token }) {
//       if ("email" in token) {
//         session.user.email = token.email;
//       }

//       if ("role" in token) {
//         session.user.role = token.role;
//       }

//       if ("username" in token) {
//         session.user.username = token.username;
//       }

//       return session;
//     },
//   },
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };

import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";

const authOptions = {
  session: {
    maxAge: 24 * 60 * 60, // 1 hari : 60 detik * 60 * 24
    strategy: "jwt",
  },
  secret: "anjay123",
  providers: [
    Credentials({
      type: "credentials",
      name: "Credentials",
      credentials: {
        userid: { label: "userid", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        const { userid, username, role } = credentials;

        if (userid && role && username) {
          return {
            id: 1,
            userid: userid,
            username: username,
            role: role,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user }) {
      if (account?.provider === "credentials") {
        (token.userid = user.userid),
          (token.username = user.username),
          (token.role = user.role);
      }
      return token;
    },

    async session({ session, token }) {
      if ("userid" in token) {
        session.user.userid = token.userid;
      }

      if ("role" in token) {
        session.user.role = token.role;
      }

      if ("username" in token) {
        session.user.username = token.username;
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

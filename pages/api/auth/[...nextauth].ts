import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
			authorization: {
				params: {
					scope: "https://www.googleapis.com/auth/calendar.readonly profile email",
				},
			},
		}),
	],
	callbacks: {
		async jwt({ token, account }) {
			if (account) {
				token.accessToken = (account as any).access_token;
			}
			return token;
		},
		async session({ session, token }) {
			(session as any).accessToken = (token as any).accessToken;
			return session;
		},
	},
});
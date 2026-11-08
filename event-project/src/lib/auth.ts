import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins";
import { createAuthMiddleware, APIError } from "better-auth/api";

const client = new MongoClient(process.env.MONGO_DB_URL as string);
const db = client.db("project");

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
        autoSignIn: false
    },

    hooks: {
        before: createAuthMiddleware(async (ctx) => {
            if (ctx.path !== "/sign-up/email") return;

            const email = String(ctx.body?.email ?? "").trim().toLowerCase();
            if (!email) return;

            const existing = await ctx.context.internalAdapter.findUserByEmail(email);
            if (existing) {
                throw new APIError("UNPROCESSABLE_ENTITY", {
                    message: "User already exists. Use another email.",
                    code: "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL",
                });
            }
        }),
    },

    plugins: [
        jwt(),
    ],

    session: {
        cookieCache: {
            enabled: true,
            strategy: 'jwt',
            maxAge: 7 * 24 * 60 * 60
        }
    },

    socialProviders: {
        google: { clientId: process.env.GOOGLE_CLIENT_ID as string, clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, },
        github: { clientId: process.env.GITHUB_CLIENT_ID as string, clientSecret: process.env.GITHUB_CLIENT_SECRET as string, },
    },

    database: mongodbAdapter(db, {
        client,
    }),
});
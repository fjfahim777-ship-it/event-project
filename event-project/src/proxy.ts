import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./lib/auth";

export async function proxy(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: request.headers,
    });

    if (!session?.user) {
        const signInUrl = new URL("/sign-in", request.url);

        signInUrl.searchParams.set("message", "login-required");

        return NextResponse.redirect(signInUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/create-event/:path*",
        "/manage-events/:path*",
        "/joined-events/:path*",
        "/edit-event/:path*",
    ],
};
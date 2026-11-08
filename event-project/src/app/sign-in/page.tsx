
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { useEffect, useRef } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";

export default function SignInPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [isGithubLoading, setIsGithubLoading] = useState(false);
    const hasShownToast = useRef(false);

    useEffect(() => {
        if (
            searchParams.get("message") === "login-required" &&
            !hasShownToast.current
        ) {
            toast.info("Please sign in to access this page.");
            hasShownToast.current = true;
        }
    }, [searchParams]);

    const handleGoogleSignIn = async () => {
        setIsGoogleLoading(true);

        try {
            const { error } = await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
            });

            if (error) {
                toast.error(error.message || "Google sign in failed.");
                setIsGoogleLoading(false);
            }
        } catch {
            toast.error("Something went wrong. Please try again.");
            setIsGoogleLoading(false);
        }
    };

    const handleGithubSignIn = async () => {
        setIsGithubLoading(true);

        try {
            const { error } = await authClient.signIn.social({
                provider: "github",
                callbackURL: "/",
            });

            if (error) {
                toast.error(error.message || "GitHub sign in failed.");
                setIsGithubLoading(false);
            }
        } catch {
            toast.error("Something went wrong. Please try again.");
            setIsGithubLoading(false);
        }
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const email = (formData.get("email") as string).trim();
        const password = formData.get("password") as string;

        if (!email || !password) {
            toast.error("Please enter your email and password.");
            return;
        }

        try {
            setIsLoading(true);

            const { error } = await authClient.signIn.email({
                email,
                password,
            });

            if (error) {
                toast.error(error.message || "Invalid email or password.");
                return;
            }

            toast.success("Signed in successfully!");

            router.push("/");
            router.refresh();

        } catch {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="flex min-h-[75vh] items-center justify-center bg-base-100 px-4 py-12">
            <div className="w-full max-w-md rounded-2xl border border-base-300 bg-base-200 p-6 shadow-sm sm:p-8">

                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-base-content">
                        Welcome Back!
                    </h1>

                    <p className="mt-2 text-sm text-base-content/60">
                        Sign in to continue to your Eventify account.
                    </p>
                </div>

                <form onSubmit={onSubmit} noValidate autoComplete="off" className="space-y-5">

                    <div>
                        <label
                            htmlFor="email"
                            className="mb-2 block text-sm font-medium text-base-content/80"
                        >
                            Email Address
                        </label>

                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            autoComplete="off"
                            required
                            disabled={isLoading}
                            className="w-full rounded-lg border-2 border-base-content/20 bg-base-100 px-4 py-3 text-base-content placeholder:text-base-content/40 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="mb-2 block text-sm font-medium text-base-content/80"
                        >
                            Password
                        </label>

                        <div className="relative">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                autoComplete="current-password"
                                required
                                disabled={isLoading}
                                className="w-full rounded-lg border-2 border-base-content/20 bg-base-100 px-4 py-3 pr-20 text-base-content placeholder:text-base-content/40 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-base-content/60 hover:text-base-content"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full rounded-lg bg-[#176B4D] py-3 font-semibold text-white transition hover:bg-[#12583E] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isLoading ? "Signing In..." : "Sign In"}
                    </button>
                </form>

                <div className="my-6 flex items-center gap-4">
                    <div className="h-px flex-1 bg-base-300" />

                    <span className="text-sm text-base-content/50">
                        OR CONTINUE WITH
                    </span>

                    <div className="h-px flex-1 bg-base-300" />
                </div>

                <div className="space-y-3">

                    <button
                        type="button"
                        onClick={handleGoogleSignIn}
                        disabled={isGoogleLoading || isGithubLoading || isLoading}
                        className="w-full rounded-lg border border-base-300 py-3 font-medium text-base-content/80 transition hover:bg-base-300 disabled:opacity-60"
                    >
                        {isGoogleLoading ? "Connecting..." : (
                            <span className="flex items-center justify-center gap-2">
                                <FaGoogle />
                                Continue with Google
                            </span>
                        )}
                    </button>

                    <button
                        type="button"
                        onClick={handleGithubSignIn}
                        disabled={isGithubLoading || isGoogleLoading || isLoading}
                        className="w-full rounded-lg border border-base-300 py-3 font-medium text-base-content/80 transition hover:bg-base-300 disabled:opacity-60"
                    >
                        {isGithubLoading ? "Connecting..." : (
                            <span className="flex items-center justify-center gap-2">
                                <FaGithub />
                                Continue with GitHub
                            </span>
                        )}
                    </button>

                </div>

                <p className="mt-6 text-center text-sm text-base-content/70">
                    Don't have an account?{" "}
                    <Link
                        href="/sign-up"
                        className="font-semibold text-[#176B4D] hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>

            </div>
        </section>
    );
}

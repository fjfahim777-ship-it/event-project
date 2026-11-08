"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { HandCoins } from "lucide-react";

import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

const Navbar = () => {
    const router = useRouter();

    const { data: session, isPending } = authClient.useSession();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem("eventify-theme");

        const theme = savedTheme === "dark" ? "dark" : "light";

        document.documentElement.setAttribute("data-theme", theme);

        setIsDark(theme === "dark");
    }, []);

    const handleThemeChange = () => {
        const newTheme = !isDark;

        setIsDark(newTheme);

        document.documentElement.setAttribute(
            "data-theme",
            newTheme ? "dark" : "light"
        );

        localStorage.setItem(
            "eventify-theme",
            newTheme ? "dark" : "light"
        );
    };

    const handleSignOut = async () => {
        try {
            const { error } = await authClient.signOut();

            if (error) {
                toast.error("Unable to sign out. Please try again.");
                return;
            }

            toast.success("Signed out successfully!");

            setIsProfileOpen(false);
            setIsMenuOpen(false);

            router.push("/");
            router.refresh();
        } catch {
            toast.error("Something went wrong while signing out.");
        }
    };

    return (
        <nav className="sticky top-0 z-50 border-b border-base-300 bg-base-100">
            <div className="navbar mx-auto max-w-7xl px-4">
                {/* Logo */}
                <div className="navbar-start">
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-700 text-white shadow-md transition-transform group-hover:scale-105">
                            <HandCoins className="h-6 w-6" />
                        </div>

                        <span className="text-xl font-bold tracking-tight text-green-800">
                            Eventify
                        </span>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <DesktopNav
                    session={session}
                    isPending={isPending}
                    isDark={isDark}
                    isProfileOpen={isProfileOpen}
                    handleThemeChange={handleThemeChange}
                    setIsProfileOpen={setIsProfileOpen}
                    handleSignOut={handleSignOut}
                />

                {/* Mobile Navigation */}
                <MobileNav
                    session={session}
                    isPending={isPending}
                    isMenuOpen={isMenuOpen}
                    isDark={isDark}
                    handleThemeChange={handleThemeChange}
                    setIsMenuOpen={setIsMenuOpen}
                    handleSignOut={handleSignOut}
                />
            </div>
        </nav>
    );
};

export default Navbar;
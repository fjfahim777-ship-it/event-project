
import Link from "next/link";
import UserProfile from "./UserProfile";

const DesktopNav = ({
    session,
    isPending,
    isDark,
    isProfileOpen,
    handleThemeChange,
    setIsProfileOpen,
    handleSignOut,
}: any) => {
    return (
        <>
            <div className="navbar-center hidden md:flex">
                <Link
                    href="/upcoming-events"
                    className="group flex items-center gap-2 text-sm font-semibold text-green-600 transition hover:text-emerald-600"
                >
                    <svg
                        className="h-4 w-4 text-green-600 transition group-hover:scale-110"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    <span>Upcoming Events</span>
                </Link>
            </div>

            <div className="navbar-end hidden items-center gap-6 md:flex">

                <div className="navbar-end hidden items-center gap-6 md:flex"></div>
                {/* Theme Toggle */}
                <button
                    onClick={handleThemeChange}
                    className="btn btn-ghost btn-circle"
                    aria-label="Toggle theme"
                >
                    {isDark ? "☀️" : "🌙"}
                </button>

                {/* Authentication */}
                {isPending ? (
                    <div className="flex items-center gap-2">
                        <div className="h-9 w-9 animate-pulse rounded-full bg-base-300" />
                        <div className="h-4 w-16 animate-pulse rounded bg-base-300" />
                    </div>
                ) : !session ? (
                    <div className="flex items-center gap-4">
                        <Link
                            href="/sign-in"
                            className="font-medium text-base-content hover:text-emerald-500"
                        >
                            Login
                        </Link>

                        <Link
                            href="/sign-up"
                            className="btn border-none bg-green-700 text-white hover:bg-green-800"
                        >
                            Register
                        </Link>
                    </div>
                ) : (
                    <div className="flex items-center gap-3">
                        <UserProfile
                            user={session.user}
                            isOpen={isProfileOpen}
                            onToggle={() => setIsProfileOpen(!isProfileOpen)}
                            onClose={() => setIsProfileOpen(false)}
                            onSignOut={handleSignOut}
                        />

                        <button
                            type="button"
                            onClick={handleSignOut}
                            className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-rose-600 transition hover:bg-rose-900/20 cursor-pointer"
                        >
                            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-900/10 text-rose-400 text-xs">
                                ➔
                            </span>
                            <span>Logout</span>
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default DesktopNav;

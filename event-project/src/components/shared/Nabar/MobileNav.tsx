import Link from "next/link";
import UserProfile from "./UserProfile";

const MobileNav = ({
    session,
    isPending,
    isMenuOpen,
    isDark,
    handleThemeChange,
    setIsMenuOpen,
    handleSignOut,
}: any) => {
    return (
        <div className="navbar-end md:hidden">
            {/* Mobile Menu Button */}
            <button
                onClick={handleThemeChange}
                className="text-left text-base-content"
            >
                {isDark ? "☀️" : "🌙"}
            </button>
            <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="btn btn-ghost btn-circle text-xl"
                aria-label="Toggle menu"
            >
                ☰
            </button>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <>
                    {/* Outside Click */}
                    <button
                        onClick={() => setIsMenuOpen(false)}
                        className="fixed inset-0 z-40 cursor-default"
                        aria-label="Close menu"
                    />

                    {/* Mobile Menu */}
                    <div className="absolute left-0 top-full z-50 w-full border-t border-base-300 bg-base-100 p-4 md:hidden">
                        <div className="flex flex-col gap-4">
                            {isPending ? (
                                <div className="h-5 w-24 animate-pulse rounded bg-base-300" />
                            ) : !session ? (
                                <>
                                    <Link
                                        href="/sign-in"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Login
                                    </Link>

                                    <Link
                                        href="/sign-up"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="font-semibold text-emerald-500"
                                    >
                                        Register
                                    </Link>
                                </>
                            ) : (
                                <UserProfile
                                    user={session.user}
                                    isOpen={false}
                                    onToggle={() => { }}
                                    onClose={() => setIsMenuOpen(false)}
                                    onSignOut={handleSignOut}
                                    variant="mobile"
                                />
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default MobileNav;
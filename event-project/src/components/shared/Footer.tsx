const Footer = () => {
    return (
        <footer className="border-t border-base-300 bg-base-100">
            <div className="mx-auto max-w-7xl px-4 py-10">

                {/* Main 4-Column Grid */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4 items-start">

                    {/* Column 1: Logo, Description & Location */}
                    <div className="flex flex-col items-start space-y-3">

                        <h2 className="text-xl font-bold leading-none text-green-700">
                            Eventify
                        </h2>

                        <p className="text-sm text-base-content/70">
                            Together, we can make a difference in our community.
                        </p>
                        <div className="flex items-center gap-1.5 text-xs text-base-content/65 pt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            <span>Nationwide Impact</span>
                        </div>
                    </div>

                    {/* Column 2: Explore Platform */}
                    <div className="flex flex-col space-y-3">
                        <h3 className="text-xs font-bold tracking-wider text-base-content uppercase">
                            Explore Platform
                        </h3>
                        <div className="flex flex-col space-y-2 text-sm">
                            <a href="/" className="text-base-content/70 hover:text-emerald-500 transition-colors">
                                Home
                            </a>
                            <a href="/upcoming-events" className="text-base-content/70 hover:text-emerald-500 transition-colors">
                                Upcoming Events
                            </a>
                            <a href="/sign-up" className="text-base-content/70 hover:text-emerald-500 transition-colors">
                                Join Us
                            </a>
                        </div>
                    </div>

                    {/* Column 3: Active Causes */}
                    <div className="flex flex-col space-y-3">
                        <h3 className="text-xs font-bold tracking-wider text-base-content uppercase">
                            Active Causes
                        </h3>
                        <div className="flex flex-col space-y-2 text-sm text-base-content/70">
                            <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-500"></span>Winter Clothes & Blanket Relief</span>
                            <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-500"></span>City Clean-up & Waste Segregation</span>
                            <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-amber-500"></span>Underprivileged Meal Sharing</span>
                        </div>
                    </div>

                    {/* Column 4: Community Spirit & Badge */}
                    <div className="flex flex-col space-y-3">
                        <h3 className="text-xs font-bold tracking-wider text-base-content uppercase">
                            Community Spirit
                        </h3>
                        <p className="text-sm text-base-content/70">
                            Every small action counts. Connect with local volunteers and turn compassion into direct community aid.
                        </p>
                        <div>
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                100% Volunteer Driven
                            </span>
                        </div>
                    </div>

                </div>

                {/* Divider */}
                <div className="mt-8 border-t border-base-200 pt-6"></div>

                {/* Bottom Copyright & Credit Bar */}
                <div className="flex items-center justify-center text-center text-xs text-base-content/60">
                    <p>© 2026 Eventify. All rights reserved.</p>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
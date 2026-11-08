import Link from "next/link";

const Hero = () => {
    return (
        <section className="bg-base-100">
            <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28">

                {/* Hero Content */}
                <div>
                    <span className="inline-block rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-800">
                        Together for a Better Tomorrow
                    </span>

                    <h1 className="mt-6 text-4xl font-bold leading-tight text-base-content md:text-5xl lg:text-6xl">
                        Make a Difference in Your{" "}
                        <span className="text-green-700">
                            Community
                        </span>
                    </h1>

                    <p className="mt-6 max-w-lg text-base leading-7 text-base-content/70 md:text-lg">
                        Join hands with passionate people, participate in
                        meaningful events, and create positive changes in
                        the lives of others.
                    </p>

                    {/* Buttons */}
                    <div className="mt-8 flex flex-wrap gap-4">

                        <Link
                            href="/upcoming-events"
                            className="btn border-none bg-green-700 px-6 text-white hover:bg-green-800"
                        >
                            Explore Events
                        </Link>

                        <Link
                            href="/create-event"
                            className="btn border border-green-700 bg-transparent px-6 text-green-800 hover:bg-green-100"
                        >
                            Create an Event
                        </Link>

                    </div>

                    <p className="mt-8 text-sm text-base-content/60">
                        Small actions. Big impact. Stronger communities.
                    </p>
                </div>

                {/* Hero Visual */}
                <div className="relative">

                    <div className="rounded-3xl bg-green-800 p-8 text-white shadow-xl md:p-12">

                        <div className="text-6xl">🌱</div>

                        <h2 className="mt-8 text-3xl font-bold">
                            Be the Change
                        </h2>

                        <p className="mt-4 leading-7 text-green-100">
                            Every helping hand brings us one step closer
                            to building a healthier, greener, and more
                            supportive community.
                        </p>

                        <div className="mt-10 grid grid-cols-2 gap-4">

                            <div className="flex flex-col items-center justify-center rounded-2xl bg-white/10 p-5 text-center">
                                <h3 className="text-xl font-bold sm:text-2xl">
                                    Together
                                </h3>
                                <p className="mt-1 text-sm text-green-100">
                                    We make impact
                                </p>
                            </div>

                            <div className="flex flex-col items-center justify-center rounded-2xl bg-white/10 p-5 text-center">
                                <h3 className="text-xl font-bold sm:text-2xl">
                                    Every Day
                                </h3>
                                <p className="mt-1 text-sm text-green-100">
                                    We help others
                                </p>
                            </div>

                        </div>

                    </div>

                    <div className="absolute -right-3 -top-4 -z-10 h-full w-full rounded-3xl bg-green-200 md:-right-5 md:-top-5" />

                </div>

            </div>
        </section>
    );
};

export default Hero;
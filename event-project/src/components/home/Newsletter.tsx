
'use client'

export default function Newsletter() {
    return (
        <section className="bg-base-100 px-5 py-20">
            {/* Greenish Tinted Overlay Box */}
            <div className="mx-auto max-w-4xl rounded-3xl bg-base-200 px-6 py-14 text-center border border-base-300 shadow-sm md:px-12">

                {/* Small Top Tag */}
                <p className="mb-3 font-semibold text-green-700 tracking-wide text-sm">
                    STAY CONNECTED
                </p>

                {/* Main Heading */}
                <h2 className="text-3xl font-bold text-base-content md:text-4xl">
                    Be Part of Something Good
                </h2>

                {/* Description */}
                <p className="mx-auto mt-4 max-w-xl text-base-content/70">
                    Get updates about upcoming events, volunteering opportunities,
                    and the positive changes happening in your community.
                </p>

                {/* Form */}
                <form
                    onSubmit={(e) => e.preventDefault()}
                    className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row"
                >
                    <input
                        type="email"
                        placeholder="Enter your email address"
                        required
                        className="min-w-0 flex-1 rounded-xl border border-base-300 bg-base-100 px-5 py-3 text-base-content outline-none placeholder:text-base-content/50 focus:bg-base-100 focus:border-green-600"
                    />

                    <button
                        type="submit"
                        className="rounded-xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800"
                    >
                        Subscribe
                    </button>
                </form>

                {/* Footer Note */}
                <p className="mt-4 text-sm text-base-content/60">
                    Stay inspired. Stay involved. Make a difference.
                </p>

            </div>
        </section>
    );
}

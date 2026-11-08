import Link from "next/link";

const NotFound = () => {
    return (
        <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-8 text-center text-base-content sm:px-6">
            <h1 className="text-5xl font-bold text-[#05893E] sm:text-7xl">
                404
            </h1>

            <h2 className="mt-3 text-xl font-bold sm:mt-4 sm:text-2xl">
                Page not found!
            </h2>

            <p className="mt-3 max-w-md text-sm text-base-content/70 sm:text-base">
                Sorry, the page you are looking for could not be found.
                The link might be incorrect, or the page may have been removed.
            </p>

            <Link
                href="/"
                className="btn mt-5 bg-[#05893E] text-sm text-white sm:mt-6 sm:text-base"
            >
                Return to the home page
            </Link>
        </main>

    );
};

export default NotFound;
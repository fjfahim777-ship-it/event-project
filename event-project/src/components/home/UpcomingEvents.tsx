
import Link from "next/link";

import EventCard from "@/components/events/EventCard";
import type { ApiEvent } from "@/types/type";

async function UpcomingEvents() {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/events/home`,
        {
            cache: "no-store",
        }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch upcoming events");
    }

    const data: ApiEvent[] = await res.json();

    const events = data.map((event) => ({
        id: event._id,
        title: event.title,
        category: event.category,
        date: new Date(event.date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        }),
        location: event.location,
        image: event.image,
    }));

    return (
        <section className="bg-base-100 py-20">
            <div className="mx-auto max-w-7xl px-6">
                {/* Section Heading */}
                <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                    <div className="max-w-2xl">
                        <span className="font-semibold uppercase tracking-wider text-green-700">
                            Make a Difference
                        </span>

                        <h2 className="mt-3 text-3xl font-bold text-base-content md:text-4xl">
                            Upcoming{" "}
                            <span className="text-green-700">
                                Events
                            </span>
                        </h2>

                        <p className="mt-4 leading-7 text-base-content/70">
                            Discover meaningful community activities and
                            find your next opportunity to create a positive
                            impact.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <Link
                            href="/upcoming-events"
                            className="btn border border-green-700 bg-base-200 text-green-800 hover:bg-green-50"
                        >
                            View All Events
                        </Link>

                        <Link
                            href="/create-event"
                            className="btn border-none bg-green-700 text-white hover:bg-green-800"
                        >
                            + Create Event
                        </Link>
                    </div>
                </div>

                {/* Event Cards */}
                {events.length > 0 ? (
                    <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {events.map((event) => (
                            <EventCard
                                key={event.id}
                                {...event}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="mt-12 rounded-2xl border border-dashed border-base-300 py-16 text-center">
                        <h3 className="text-xl font-semibold text-base-content">
                            No upcoming events yet
                        </h3>

                        <p className="mt-2 text-base-content/60">
                            Check back soon for opportunities to make a difference.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );

}

export default UpcomingEvents;


import { Suspense } from "react";

import EventGrid, {
    type EventCardData,
} from "@/components/events/EventGrid";
import type { ApiEvent } from "@/types/type";

async function UpcomingEvents() {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/events`,
        {
            cache: "no-store",
        }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch events");
    }

    const data: ApiEvent[] = await res.json();

    const events: EventCardData[] = data.map((event) => ({
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

    return <EventGrid events={events} />;
}

function EventsLoading() {
    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
                <div
                    key={index}
                    className="h-80 animate-pulse rounded-2xl bg-base-300"
                />
            ))}
        </div>
    );
}

export default function UpcomingEventsPage() {
    return (
        <main className="min-h-screen bg-base-100">
            <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

                <div className="mb-12 text-center">
                    <span className="mb-4 inline-block rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700">
                        Make an Impact
                    </span>

                    <h1 className="text-3xl font-bold text-base-content sm:text-4xl lg:text-5xl">
                        Explore Upcoming Events
                    </h1>

                    <p className="mx-auto mt-4 max-w-2xl text-base-content/70">
                        Discover opportunities to make a difference in your
                        community. Find an event, join the movement, and
                        create positive change together.
                    </p>
                </div>

                <Suspense fallback={<EventsLoading />}>
                    <UpcomingEvents />
                </Suspense>

            </section>
        </main>
    );
}

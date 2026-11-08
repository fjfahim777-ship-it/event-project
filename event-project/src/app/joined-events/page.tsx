
"use client";

import { useEffect, useState } from "react";
import EventCard from "@/components/events/EventCard";
import { authClient } from "@/lib/auth-client";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import type { JoinedEvent } from "@/types/type";

export default function JoinedEventsPage() {
    const { data: session } = authClient.useSession();
    const [joinedEvents, setJoinedEvents] = useState<JoinedEvent[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJoinedEvents = async () => {
            if (!session?.user?.email) {
                setLoading(false);
                return;
            }

            try {
                const token = await getTokenFromClient();

                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/event-joins/${session.user.email}`,
                    {
                        headers: {
                            authorization: `Bearer ${token}`
                        }
                    }
                );

                if (!res.ok) {
                    throw new Error("Failed to fetch joined events");
                }

                const data = await res.json();
                setJoinedEvents(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchJoinedEvents();
    }, [session?.user?.email]);

    return (
        <main className="min-h-screen bg-base-100 px-4 py-12">
            <div className="mx-auto max-w-7xl">
                <h1 className="mb-2 text-3xl font-bold text-base-content">
                    Joined Events
                </h1>

                <p className="mb-8 text-base-content/70">
                    Events you have joined and are looking forward to.
                </p>

                {loading ? (
                    <p className="text-base-content/60">Loading joined events...</p>
                ) : joinedEvents.length === 0 ? (
                    <p className="text-base-content/60">
                        You haven't joined any events yet.
                    </p>
                ) : (
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {joinedEvents.map((event) => (
                            <EventCard
                                key={event._id}
                                id={event.eventId}
                                title={event.eventTitle}
                                category={event.eventCategory}
                                date={new Date(event.eventDate).toLocaleDateString("en-US", {
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric",
                                })}
                                location={event.eventLocation}
                                image={event.eventImage}
                            />
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}

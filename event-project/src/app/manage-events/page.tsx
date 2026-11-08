
"use client";

import { useEffect, useState } from "react";
import ManageEventCard from "@/components/events/ManageEventCard";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import type { ApiEvent } from "@/types/type";

export default function ManageEventsPage() {
    const { data: session } = authClient.useSession();
    const [events, setEvents] = useState<ApiEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

    useEffect(() => {
        const fetchMyEvents = async () => {
            if (!session?.user?.email) {
                setLoading(false);
                return;
            }

            try {
                const token = await getTokenFromClient();
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/my-events/${session.user.email}`,
                    {
                        headers: {
                            authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!res.ok) {
                    throw new Error("Failed to fetch events");
                }

                const data = await res.json();
                setEvents(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchMyEvents();
    }, [session?.user?.email]);

    const handleDelete = (id: string) => {
        setSelectedEventId(id);
    };

    const confirmDelete = async () => {
        if (!selectedEventId) return;

        try {
            const token = await getTokenFromClient();
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/events/${selectedEventId}`,
                {
                    method: "DELETE",
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!res.ok) {
                throw new Error("Failed to delete event");
            }

            setEvents(events.filter((event) => event._id !== selectedEventId));
            toast.success("Event deleted successfully!");
        } catch (error) {
            console.log(error);
            toast.error("Unable to delete event.");
        } finally {
            setSelectedEventId(null);
        }
    };

    return (
        <main className="min-h-screen bg-base-100 px-4 py-12">
            <div className="mx-auto max-w-7xl">
                <h1 className="mb-2 text-3xl font-bold text-base-content">
                    Manage Events
                </h1>

                <p className="mb-8 text-base-content/70">
                    Manage the events you have created.
                </p>

                {loading ? (
                    <p className="text-base-content/60">Loading your events...</p>
                ) : events.length === 0 ? (
                    <p className="text-base-content/60">
                        You haven't created any events yet.
                    </p>
                ) : (
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {events.map((event) => (
                            <ManageEventCard
                                key={event._id}
                                id={event._id}
                                title={event.title}
                                category={event.category}
                                date={new Date(event.date).toLocaleDateString()}
                                location={event.location}
                                image={event.image}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                )}
            </div>

            {selectedEventId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
                    <div className="w-full max-w-md rounded-2xl bg-base-200 p-6 shadow-xl">
                        <h2 className="text-xl font-bold text-base-content">
                            Delete Event?
                        </h2>

                        <p className="mt-3 text-base-content/70">
                            Are you sure you want to delete this event? This
                            action cannot be undone.
                        </p>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={() => setSelectedEventId(null)}
                                className="rounded-lg border border-base-300 px-5 py-2 font-semibold text-base-content/70 hover:bg-base-300 cursor-pointer"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={confirmDelete}
                                className="rounded-lg bg-red-600 px-5 py-2 font-semibold text-white hover:bg-red-700 cursor-pointer"
                            >
                                Confirm Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}

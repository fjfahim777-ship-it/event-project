
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import type { EditEvent } from "@/types/type";


export default function EditEventPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const { data: session } = authClient.useSession();

    const [event, setEvent] = useState<EditEvent | null>(null);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/events/${id}`
                );

                if (!res.ok) {
                    throw new Error("Failed to fetch event");
                }

                const data = await res.json();
                setEvent(data);
            } catch (error) {
                console.log(error);
                toast.error("Unable to load event.");
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [id]);

    const handleUpdateEvent = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        if (!session?.user?.email) {
            toast.error("Please login to update an event.");
            return;
        }

        if (session.user.email !== event?.creatorEmail) {
            toast.error("You cannot update this event.");
            return;
        }

        const formData = new FormData(e.currentTarget);

        const eventData = {
            title: formData.get("title"),
            description: formData.get("description"),
            category: formData.get("category"),
            date: formData.get("date"),
            location: formData.get("location"),
            image: formData.get("image"),
        };

        try {
            setIsSubmitting(true);

            const token = await getTokenFromClient();

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/events/${id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(eventData),
                }
            );

            if (!res.ok) {
                throw new Error("Failed to update event");
            }

            toast.success("Event updated successfully!");
            router.push("/manage-events");
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
            console.log(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <main className="min-h-screen px-4 py-16">
                <p className="text-center text-base-content/60">Loading event...</p>
            </main>
        );
    }

    if (!event) {
        return (
            <main className="min-h-screen px-4 py-16">
                <p className="text-center text-base-content/60">Event not found.</p>
            </main>
        );
    }

    return (
        <main className="min-h-screen px-4 py-16">
            <div className="mx-auto max-w-3xl">
                <div className="mb-10 text-center">
                    <span className="mb-3 inline-block rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-800">
                        Make an Impact
                    </span>

                    <h1 className="mb-3 text-3xl font-bold text-base-content md:text-4xl">
                        Update Community Event
                    </h1>

                    <p className="mx-auto max-w-xl text-base-content/60">
                        Update your event information and keep your community informed.
                    </p>
                </div>

                <div className="rounded-2xl border border-base-300 bg-base-200 p-6 shadow-sm md:p-10">
                    <form onSubmit={handleUpdateEvent} className="space-y-6">
                        <div>
                            <label className="mb-2 block font-medium text-base-content">
                                Event Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                defaultValue={event.title}
                                className="input w-full border-base-300"
                                required
                            />
                        </div>

                        <div>
                            <label className="mb-2 block font-medium text-base-content">
                                Event Description
                            </label>
                            <textarea
                                name="description"
                                defaultValue={event.description}
                                rows={5}
                                className="textarea w-full border-base-300"
                                required
                            />
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            <div>
                                <label className="mb-2 block font-medium text-base-content">
                                    Event Category
                                </label>
                                <select
                                    name="category"
                                    defaultValue={event.category}
                                    className="select w-full border-base-300"
                                    required
                                >
                                    <option value="Cleanup">Cleanup</option>
                                    <option value="Plantation">Plantation</option>
                                    <option value="Donation">Donation</option>
                                    <option value="Awareness">Awareness</option>
                                </select>
                            </div>

                            <div>
                                <label className="mb-2 block font-medium text-base-content">
                                    Event Date
                                </label>
                                <input
                                    type="date"
                                    name="date"
                                    defaultValue={new Date(event.date)
                                        .toISOString()
                                        .split("T")[0]}
                                    min={new Date(
                                        Date.now() -
                                        new Date().getTimezoneOffset() * 60000
                                    )
                                        .toISOString()
                                        .split("T")[0]}
                                    className="input w-full border-base-300"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="mb-2 block font-medium text-base-content">
                                Event Location
                            </label>
                            <input
                                type="text"
                                name="location"
                                defaultValue={event.location}
                                className="input w-full border-base-300"
                                required
                            />
                        </div>

                        <div>
                            <label className="mb-2 block font-medium text-base-content">
                                Event Image URL
                            </label>
                            <input
                                type="url"
                                name="image"
                                defaultValue={event.image}
                                className="input w-full border-base-300"
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-3 border-t border-base-300 pt-6 sm:flex-row">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="btn flex-1 border-none bg-[#176B4D] py-2 text-white hover:bg-[#12563D]"
                            >
                                {isSubmitting ? "Updating..." : "Update Event"}
                            </button>

                            <Link
                                href="/manage-events"
                                className="btn btn-outline border-base-300 py-2 text-base-content/70 hover:bg-base-300"
                            >
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}

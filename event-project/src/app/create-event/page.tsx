
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

export default function CreateEventPage() {
    const router = useRouter();
    const { data: session } = authClient.useSession();

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleCreateEvent = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        if (!session?.user?.email) {
            toast.error("Please login to create an event.");
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
            creatorEmail: session.user.email,
        };

        try {
            setIsSubmitting(true);

            const token = await getTokenFromClient();

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/events`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(eventData),
                }
            );

            if (!res.ok) {
                throw new Error("Failed to create event");
            }

            toast.success("Event created successfully!");
            router.push("/upcoming-events");
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
            console.log(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen px-4 py-16">
            <div className="mx-auto max-w-3xl">
                {/* Heading */}
                <div className="mb-10 text-center">
                    <span className="mb-3 inline-block rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-800">
                        Make an Impact
                    </span>

                    <h1 className="mb-3 text-3xl font-bold text-base-content md:text-4xl">
                        Create a Community Event
                    </h1>

                    <p className="mx-auto max-w-xl text-base-content/60">
                        Bring people together for a meaningful cause. Create
                        an event and inspire your community to make a difference.
                    </p>
                </div>

                {/* Form */}
                <div className="rounded-2xl border border-base-300 bg-base-200 p-6 shadow-sm md:p-10">
                    <form onSubmit={handleCreateEvent} className="space-y-6">

                        {/* Event Title */}
                        <div>
                            <label className="mb-2 block font-medium text-base-content">
                                Event Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                placeholder="e.g. Community Tree Plantation"
                                className="input w-full border-base-300"
                                required
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="mb-2 block font-medium text-base-content">
                                Event Description
                            </label>
                            <textarea
                                name="description"
                                placeholder="Describe your event and its purpose..."
                                rows={5}
                                className="textarea w-full border-base-300"
                                required
                            />
                        </div>

                        {/* Category and Date */}
                        <div className="grid gap-6 md:grid-cols-2">
                            <div>
                                <label className="mb-2 block font-medium text-base-content">
                                    Event Category
                                </label>
                                <select
                                    name="category"
                                    defaultValue=""
                                    className="select w-full border-base-300"
                                    required
                                >
                                    <option value="" disabled>
                                        Select a category
                                    </option>
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

                        {/* Location */}
                        <div>
                            <label className="mb-2 block font-medium text-base-content">
                                Event Location
                            </label>
                            <input
                                type="text"
                                name="location"
                                placeholder="e.g. Comilla, Bangladesh"
                                className="input w-full border-base-300"
                                required
                            />
                        </div>

                        {/* Image URL */}
                        <div>
                            <label className="mb-2 block font-medium text-base-content">
                                Event Image URL
                            </label>
                            <input
                                type="url"
                                name="image"
                                placeholder="https://example.com/event-image.jpg"
                                className="input w-full border-base-300"
                                required
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col gap-3 border-t border-base-300 pt-6 sm:flex-row">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="btn flex-1 border-none bg-[#176B4D] text-white hover:bg-[#12563D]"
                            >
                                {isSubmitting ? "Creating..." : "Create Event"}
                            </button>

                            <Link
                                href="/upcoming-events"
                                className="btn btn-outline border-base-300 text-base-content/70 hover:bg-base-300"
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

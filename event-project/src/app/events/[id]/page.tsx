
import Image from "next/image";

import Link from "next/link";

import { notFound } from "next/navigation";

import JoinEventButton from "@/components/events/JoinEventButton";
import { ArrowLeft } from "lucide-react";
import type { EventDetails } from "@/types/type";

export default async function EventDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/events/${id}`,
        {
            cache: "no-store",
        }
    );

    if (!res.ok) {
        notFound();
    }

    const event: EventDetails = await res.json();

    return (
        <main className="min-h-screen bg-base-100">
            <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
                <Link
                    href="/upcoming-events"
                    className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#176B4D] hover:text-emerald-800"
                >
                    <ArrowLeft className=" w-4" />
                    Back to Upcoming Events
                </Link>

                <div className="overflow-hidden rounded-3xl border border-base-300 bg-base-200 shadow-sm">
                    <div className="relative h-64 w-full sm:h-96">
                        <Image
                            src={event.image}
                            alt={event.title}
                            fill
                            priority
                            sizes="(max-width: 640px) 100vw, 1152px"
                            className="object-cover"
                        />
                    </div>

                    <div className="p-6 sm:p-10">
                        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
                            <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                                {event.category}
                            </span>

                        </div>

                        <h1 className="text-3xl font-bold text-base-content sm:text-4xl">
                            {event.title}
                        </h1>

                        <div className="mt-6 grid gap-4 sm:grid-cols-2">
                            <div className="rounded-xl bg-base-300 p-5">
                                <p className="text-sm text-base-content/60">
                                    Event Date
                                </p>

                                <p className="mt-2 font-semibold text-base-content">
                                    {new Date(event.date).toLocaleDateString(
                                        "en-US",
                                        {
                                            month: "long",
                                            day: "numeric",
                                            year: "numeric",
                                        }
                                    )}
                                </p>
                            </div>

                            <div className="rounded-xl bg-base-300 p-5">
                                <p className="text-sm text-base-content/60">
                                    Location
                                </p>

                                <p className="mt-2 font-semibold text-base-content">
                                    {event.location}
                                </p>
                            </div>
                        </div>

                        <div className="mt-10">
                            <h2 className="text-xl font-bold text-base-content">
                                About This Event
                            </h2>

                            <p className="mt-4 leading-8 text-base-content/70">
                                {event.description}
                            </p>
                        </div>

                        <div className="mt-10 border-t border-base-300 pt-8">
                            <h2 className="text-xl font-bold text-base-content">
                                Be Part of the Change
                            </h2>

                            <p className="mt-2 text-base-content/70">
                                Join this event and contribute to making
                                your community a better place.
                            </p>

                            <JoinEventButton
                                event={{
                                    _id: event._id,
                                    title: event.title,
                                    image: event.image,
                                }}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

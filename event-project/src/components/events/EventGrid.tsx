
"use client";

import { useState } from "react";
import EventCard from "./EventCard";
import { ChevronDown } from "lucide-react";
import type { EventCardProps } from "@/types/type";

export interface EventCardData extends EventCardProps { }
export default function EventGrid({
    events,
}: {
    events: EventCardData[];
}) {
    const [selectedCategory, setSelectedCategory] = useState("All");

    const categories = [
        "All",
        "Cleanup",
        "Plantation",
        "Donation",
        "Awareness",
    ];

    const filteredEvents =
        selectedCategory === "All"
            ? events
            : events.filter((event) => event.category === selectedCategory);

    return (
        <div>
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                <p className="text-base-content/70">
                    Showing{" "}
                    <span className="font-semibold">
                        {filteredEvents.length}
                    </span>{" "}
                    events
                </p>

                <div className="relative">
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full appearance-none rounded-xl border border-base-300 bg-base-200 py-3 pl-4 pr-8 text-sm outline-none focus:border-emerald-600"
                    >
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category === "All" ? "All Categories" : category}
                            </option>
                        ))}
                    </select>

                    <ChevronDown
                        size={16}
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
                    />
                </div>
            </div>

            {filteredEvents.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredEvents.map((event) => (
                        <EventCard key={event.id} {...event} />
                    ))}
                </div>
            ) : (
                <div className="rounded-2xl border border-dashed border-base-300 py-16 text-center">
                    <h3 className="text-xl font-semibold text-base-content">
                        No events found
                    </h3>

                    <p className="mt-2 text-base-content/60">
                        Try selecting a different category.
                    </p>
                </div>
            )}
        </div>
    );
}

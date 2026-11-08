
import { CalendarDays, ArrowRight, MapPin } from "lucide-react";

import Link from "next/link";
import type { EventCardProps } from "@/types/type";

const EventCard = ({
    id,
    title,
    category,
    date,
    location,
    image,
}: EventCardProps) => {
    return (
        <div className="group overflow-hidden rounded-2xl border border-green-100 bg-base-200 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl">

            {/* Event Image */}
            <div className="relative h-52 overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />

                {/* Category Badge (Top Left) */}
                <span className="absolute left-4 top-4 rounded-full bg-white px-4 py-2 text-xs font-semibold text-green-800 shadow">
                    {category}
                </span>

                {/* Date Badge (Bottom Left over Image) */}
                <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-lg bg-black/70 px-3 py-1.5 text-xs font-medium text-white shadow backdrop-blur-sm">
                    <CalendarDays className="h-4 w-4" />
                    <span>{date}</span>
                </div>
            </div>

            {/* Event Information */}
            <div className="p-6">

                {/* Title */}
                <h3 className="text-xl font-bold text-base-content transition group-hover:text-green-700">
                    {title}
                </h3>

                {/* Location */}
                <div className="mt-3 flex items-center gap-2 text-sm text-base-content/70">
                    <MapPin className="h-4 w-4 text-red-500" />
                    <span>{location}</span>
                </div>

                {/* Button Section */}
                <div className="mt-6 border-t border-base-300 pt-4">
                    <Link
                        href={`/events/${id}`}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-700 py-3 text-white font-semibold transition hover:bg-green-800"
                    >
                        <span>View Event</span>
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default EventCard;

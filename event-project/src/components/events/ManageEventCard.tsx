
import Link from "next/link";
import type { ManageEventCardProps } from "@/types/type";

export default function ManageEventCard({
    id,
    title,
    category,
    date,
    location,
    image,
    onDelete,
}: ManageEventCardProps) {
    return (
        <div className="overflow-hidden rounded-2xl border border-base-300 bg-base-200 shadow-sm">
            <div className="relative h-48">
                <img
                    src={image}
                    alt={title}
                    className="h-full w-full object-cover"
                />
            </div>

            <div className="p-5">
                <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-800">
                    {category}
                </span>

                <h3 className="mt-3 text-xl font-bold text-base-content">
                    {title}
                </h3>

                <p className="mt-2 text-sm text-base-content/60">
                    📅 {new Date(date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                    })}
                </p>

                <p className="mt-2 text-sm text-base-content/60">
                    📍 {location}
                </p>

                <div className="mt-5 flex gap-3 border-t border-base-300 pt-4">
                    <Link
                        href={`/edit-event/${id}`}
                        className="flex-1 rounded-lg bg-green-700 px-4 py-2 text-center font-semibold text-white transition hover:bg-green-800"
                    >
                        Edit
                    </Link>

                    <button
                        onClick={() => onDelete(id)}
                        className="flex-1 rounded-lg bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-700"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

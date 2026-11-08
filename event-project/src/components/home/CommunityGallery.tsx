
const galleryImages = [
    {
        image:
            "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800",
        title: "Community Volunteering",
    },
    {
        image:
            "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800",
        title: "Planting for Tomorrow",
    },
    {
        image:
            "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800",
        title: "Helping Each Other",
    },
    {
        image:
            "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800",
        title: "Making a Difference",
    },
];

export default function CommunityGallery() {
    return (
        <section className="bg-base-100 py-20">
            <div className="mx-auto max-w-7xl px-5">
                <div className="mb-12 text-center">
                    <p className="mb-3 font-semibold text-emerald-700">
                        OUR COMMUNITY IN ACTION
                    </p>

                    <h2 className="text-3xl font-bold text-base-content md:text-4xl">
                        Small Actions, Big Impact
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-base-content/70">
                        Every event brings people together to create positive change.
                        Take a look at the moments that make our community special.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {galleryImages.map((item, index) => (
                        <div
                            key={index}
                            className="group relative h-72 overflow-hidden rounded-2xl"
                        >
                            <img
                                src={item.image}
                                alt={item.title}
                                className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                            <h3 className="absolute bottom-5 left-5 text-lg font-semibold text-white">
                                {item.title}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

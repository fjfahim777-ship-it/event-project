
const ImpactStats = () => {
    const stats = [
        {
            number: "1,450+",
            title: "Active Volunteers",
            icon: "🙋",
        },
        {
            number: "180+",
            title: "Events Completed",
            icon: "🎯",
        },
        {
            number: "24,000+",
            title: "Lives Impacted",
            icon: "❤️",
        },
        {
            number: "100%",
            title: "Community Driven",
            icon: "🌱",
        },
    ];

    return (
        <section className="bg-base-100 py-16">
            <div className="mx-auto max-w-7xl px-6">

                <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">

                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="rounded-2xl border border-base-300 bg-base-200 p-6 text-center transition duration-300 hover:-translate-y-2 hover:shadow-lg"
                        >
                            <div className="text-3xl">
                                {stat.icon}
                            </div>

                            <h2 className="mt-4 text-3xl font-bold text-green-800 md:text-4xl">
                                {stat.number}
                            </h2>

                            <p className="mt-2 text-sm font-medium text-base-content/70 md:text-base">
                                {stat.title}
                            </p>
                        </div>
                    ))}

                </div>

            </div>
        </section>
    );
};

export default ImpactStats;

function DashboardCards() {

    const stats = [
        {
            title: "Critical Alerts",
            value: 12,
            color: "text-red-500"
        },
        {
            title: "High Alerts",
            value: 27,
            color: "text-orange-400"
        },
        {
            title: "Medium Alerts",
            value: 54,
            color: "text-yellow-400"
        },
        {
            title: "Healthy Agents",
            value: 8,
            color: "text-green-400"
        }
    ];

    return (

        <div className="grid grid-cols-4 gap-6 mt-10">

            {stats.map((card) => (

                <div
                    key={card.title}
                    className="bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-700"
                >

                    <h3 className="text-slate-400 text-sm">
                        {card.title}
                    </h3>

                    <h1 className={`text-4xl font-bold mt-4 ${card.color}`}>
                        {card.value}
                    </h1>

                </div>

            ))}

        </div>

    );
}

export default DashboardCards;


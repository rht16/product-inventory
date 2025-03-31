const DashboardCards = () => {
  const stats = [
    { icon: "🛒", title: "Order", value: 7 },
    { icon: "📦", title: "Product", value: 3 },
    { icon: "📤", title: "Supplier", value: 2 },
    { icon: "👥", title: "Buyer", value: 2 },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 my-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
          <span className="text-3xl">{stat.icon}</span>
          <div>
            <p className="text-sm text-gray-500">{stat.title}</p>
            <p className="text-xl font-bold">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;
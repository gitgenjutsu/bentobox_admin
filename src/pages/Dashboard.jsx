import { useEffect, useState } from "react";
import api from "../api/axios";

const StatCard = ({ label, value }) => (
  <div className="bg-white rounded shadow p-6">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-2xl font-bold mt-1">{value}</p>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    revenue: 0,
    pending: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      const [productsRes, ordersRes] = await Promise.all([
        api.get("/products?lang=en"),
        api.get("/orders"),
      ]);

      const orders = ordersRes.data;

      setStats({
        products: productsRes.data.length,
        orders: orders.length,
        revenue: orders.reduce((sum, o) => sum + o.totalAmount, 0),
        pending: orders.filter((o) => o.status === "pending").length,
      });
    };

    loadStats();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Products" value={stats.products} />
        <StatCard label="Total Orders" value={stats.orders} />
        <StatCard label="Revenue" value={`₹${stats.revenue}`} />
        <StatCard label="Pending Orders" value={stats.pending} />
      </div>
      <div className="h-[70vh] w-full overflow-hidden mt-8 relative">
        <img
          src="/jay.webp"
          alt="Dashboard"
          className="absolute top-80 left-10 w-56 h-76"
        />
        <img
          src="/bg.webp"
          alt="user"
          className="absolute bottom-0 right-0 w-56 h-76"
        />
      </div>
    </div>
  );
};

export default Dashboard;

import { useEffect, useState } from "react";
import api from "../api/axios";

const statusStyles = {
  pending: "bg-yellow-100 text-yellow-800",
  preparing: "bg-blue-100 text-blue-800",
  delivered: "bg-green-100 text-green-800",
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);

  const loadOrders = async () => {
    try {
      const res = await api.get("/orders");
      setOrders(res.data);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    await api.patch(`/orders/${id}/status`, { status });
    loadOrders();
  };

  useEffect(() => {
    loadOrders();
  }, []);

  if (loading) {
    return <p className="text-gray-500">Loading orders...</p>;
  }

  if (orders.length === 0) {
    return <p className="text-gray-500 text-center mt-20">No orders yet</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Orders</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order._id} className="bg-white border rounded shadow-sm">
            {/* Header */}
            <div
              className="flex justify-between items-center p-4 cursor-pointer"
              onClick={() =>
                setExpanded(expanded === order._id ? null : order._id)
              }
            >
              <div>
                <p className="font-medium">Order #{order._id.slice(-6)}</p>
                <p className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <span
                  className={`px-2 py-1 text-xs rounded capitalize ${
                    statusStyles[order.status]
                  }`}
                >
                  {order.status}
                </span>

                <p className="font-semibold">₹{order.totalAmount}</p>
              </div>
            </div>

            {/* Expanded body */}
            {expanded === order._id && (
              <div className="border-t p-4">
                <ul className="space-y-2 mb-4">
                  {order.items.map((item, idx) => (
                    <li key={idx} className="flex justify-between text-sm">
                      <span>
                        {item.name} × {item.quantity}
                      </span>
                      <span>₹{item.price * item.quantity}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex justify-between items-center">
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                    className="border px-2 py-1 rounded"
                  >
                    <option value="pending">Pending</option>
                    <option value="preparing">Preparing</option>
                    <option value="delivered">Delivered</option>
                  </select>

                  <span className="font-semibold">
                    Total: ₹{order.totalAmount}
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;

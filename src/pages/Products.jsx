import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProducts = async () => {
    try {
      const res = await api.get("/products?lang=en");
      setProducts(res.data);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    if (!confirm("Delete this product?")) return;
    await api.delete(`/products/${id}`);
    loadProducts();
  };

  useEffect(() => {
    loadProducts();
  }, []);

  if (loading) {
    return <p className="text-gray-500">Loading products...</p>;
  }

  if (products.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-20">
        <p className="text-lg">No products found</p>
        <Link
          to="/products/new"
          className="inline-block mt-4 bg-black text-white px-4 py-2 rounded"
        >
          Add your first product
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link
          to="/products/new"
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          + Add Product
        </Link>
      </div>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Product</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t hover:bg-gray-50 transition">
                <td className="p-3 flex items-center gap-3">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-12 h-12 rounded object-cover border"
                  />
                  <div>
                    <p className="font-medium">{p.name}</p>
                    <p className="text-xs text-gray-500 truncate max-w-[200px]">
                      {p.description}
                    </p>
                  </div>
                </td>

                <td className="p-3">
                  <span className="px-2 py-1 text-xs rounded bg-emerald-100 text-emerald-700 capitalize">
                    {p.category}
                  </span>
                </td>

                <td className="p-3 font-medium">₹{p.price}</td>

                <td className="p-3 text-right space-x-3">
                  <Link
                    to={`/products/${p.id}/edit`}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteProduct(p.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;

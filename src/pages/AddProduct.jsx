import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api/axios";
import ProductForm from "../components/ProductForm";
import toast from "react-hot-toast";

const AddProduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCreate = async (data) => {
    try {
      setLoading(true);

      const payload = {
        price: Number(data.price),
        category: data.category,
        image: data.image,
        translations: {
          en: {
            name: data.name,
            description: data.description,
          },
        },
      };

      if (data.jaName?.trim() || data.jaDescription?.trim()) {
        payload.translations.ja = {
          name: data.jaName?.trim() || data.name,
          description: data.jaDescription?.trim() || data.description,
        };
      }

      await api.post("/products", payload);

      toast.success("Product added");
      navigate("/products");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Add Product</h1>
      <ProductForm onSubmit={handleCreate} loading={loading} />
    </>
  );
};

export default AddProduct;

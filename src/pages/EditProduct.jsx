import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import ProductForm from "../components/ProductForm";
import toast from "react-hot-toast";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get(`/products/${id}`).then((res) => {
      const p = res.data;

      setProduct({
        price: p.price,
        category: p.category,
        image: p.image,

        name: p.translations.en.name,
        description: p.translations.en.description,

        jaName: p.translations.ja?.name || "",
        jaDescription: p.translations.ja?.description || "",
      });
    });
  }, [id]);

  const handleUpdate = async (data) => {
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

      await api.put(`/products/${id}`, payload);
      toast.success("Product updated");
      navigate("/products");
    } catch {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
      <ProductForm
        initialData={product}
        onSubmit={handleUpdate}
        loading={loading}
        submitLabel="Update Product"
      />
    </>
  );
};

export default EditProduct;

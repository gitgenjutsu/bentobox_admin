import { useState } from "react";

const ProductForm = ({
  initialData = {},
  onSubmit,
  loading,
  submitLabel = "Save Product",
}) => {
  const [form, setForm] = useState({
    name: initialData.name || "",
    description: initialData.description || "",
    price: initialData.price || "",
    category: initialData.category || "",
    image: initialData.image || "",

    // ✅ Optional Japanese fields
    jaName: initialData.jaName || "",
    jaDescription: initialData.jaDescription || "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Product name is required";
    if (!form.category.trim()) newErrors.category = "Category is required";
    if (!form.price || form.price <= 0)
      newErrors.price = "Price must be greater than 0";
    if (!form.image.trim()) newErrors.image = "Image URL is required";
    if (form.description.length < 10)
      newErrors.description = "Description must be at least 10 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    if (e.target.type === "number") {
      setForm({ ...form, [e.target.name]: Number(e.target.value) });
    } else setForm({ ...form, [e.target.name]: e.target.value });

    // clear error on change
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(form);
  };

  const copyEnToJa = () => {
    setForm((prev) => ({
      ...prev,
      jaName: prev.jaName || prev.name,
      jaDescription: prev.jaDescription || prev.description,
    }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded shadow p-6 space-y-6"
    >
      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Product Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 ${
              errors.name ? "border-red-500" : ""
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 ${
              errors.category ? "border-red-500" : ""
            }`}
          />
          {errors.category && (
            <p className="text-red-500 text-xs mt-1">{errors.category}</p>
          )}
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium mb-1">Price (₹)</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 ${
              errors.price ? "border-red-500" : ""
            }`}
          />
          {errors.price && (
            <p className="text-red-500 text-xs mt-1">{errors.price}</p>
          )}
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-sm font-medium mb-1">Image URL</label>
          <input
            name="image"
            value={form.image}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 ${
              errors.image ? "border-red-500" : ""
            }`}
          />
          {errors.image && (
            <p className="text-red-500 text-xs mt-1">{errors.image}</p>
          )}
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          name="description"
          rows={4}
          value={form.description}
          onChange={handleChange}
          className={`w-full border rounded px-3 py-2 ${
            errors.description ? "border-red-500" : ""
          }`}
        />
        {errors.description && (
          <p className="text-red-500 text-xs mt-1">{errors.description}</p>
        )}
      </div>

      <hr className="my-4" />

      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">
          Japanese Details <span className="text-gray-400">(Optional)</span>
        </h3>

        <button
          type="button"
          onClick={copyEnToJa}
          className="text-xs text-emerald-600 hover:underline"
        >
          Copy English → Japanese
        </button>
        {/* Japanese Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Japanese Product Name
          </label>
          <input
            name="jaName"
            value={form.jaName}
            onChange={handleChange}
            placeholder="例：辛味噌ラーメン"
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Japanese Description */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Japanese Description
          </label>
          <textarea
            name="jaDescription"
            rows={3}
            value={form.jaDescription}
            onChange={handleChange}
            placeholder="日本語の説明（任意）"
            className="w-full border rounded px-3 py-2"
          />
        </div>
      </div>

      {/* Image Preview */}
      {form.image && (
        <div>
          <p className="text-sm text-gray-500 mb-2">Image Preview</p>
          <img
            src={form.image}
            alt="Preview"
            className="w-40 h-40 object-cover rounded border"
          />
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end">
        <button
          type="button"
          className="bg-gray text-black px-6 py-2 mr-2 border rounded hover:bg-gray-200"
          onClick={() => window.history.back()}
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 disabled:opacity-50"
        >
          {loading ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const CreateCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!name.trim()) {
      setError("Category name is required.");
      return;
    }

    try {
      await api.post("/categories", { name: name.trim() });
      setSuccess("Category created successfully.");
      setName("");
      setTimeout(() => navigate("/events/create"), 900);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create category.");
    }
  };

  return (
    <section className="mx-auto max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-slate-800">Create Category</h1>
      <p className="mt-1 text-sm text-slate-600">Admin only page.</p>

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      {success && <p className="mt-3 text-sm text-green-600">{success}</p>}

      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-700">
            Category name
          </label>
          <input
            id="name"
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="e.g. Technology"
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5"
          />
        </div>
        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          Create Category
        </button>
      </form>
    </section>
  );
};

export default CreateCategory;

"use client";

import { useState } from "react";

export default function AdminPlants() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/plants", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        description,
        price: Number(price),
        stock: Number(stock),
        imageUrl,
      }),
    });

    setLoading(false);

    if (res.ok) {
      alert("Plant added");
      setName("");
      setDescription("");
      setPrice("");
      setStock("");
      setImageUrl("");
    } else {
      alert("Failed to add plant");
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-6">Add New Plant</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full border p-2" />
        <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border p-2" />
        <input placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full border p-2" />
        <input placeholder="Stock" value={stock} onChange={(e) => setStock(e.target.value)} className="w-full border p-2" />
        <input placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="w-full border p-2" />

        <button disabled={loading} className="w-full bg-green-800 text-white py-2 rounded">
          {loading ? "Adding..." : "Add Plant"}
        </button>
      </form>
    </div>
  );
}

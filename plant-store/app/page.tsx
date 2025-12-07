"use client";

import { useEffect, useState } from "react";

type Plant = {
  id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  images: { url: string }[];
};

export default function StorePage() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPlants() {
      const res = await fetch("/api/plants");
      const data = await res.json();
      setPlants(data);
      setLoading(false);
    }

    fetchPlants();
  }, []);

  if (loading) {
    return <p className="text-center mt-20">Loading plants...</p>;
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">🌿 Plant Store</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {plants.map((plant) => {
          const outOfStock = plant.stock === 0;

          return (
            <div
              key={plant.id}
              className={`border rounded-lg p-4 transition ${
                outOfStock ? "opacity-50 grayscale" : "hover:shadow-lg"
              }`}
            >
              <img
                src={plant.images[0]?.url || "/placeholder.jpg"}
                alt={plant.name}
                className="w-full h-48 object-cover rounded mb-4"
              />

              <h2 className="text-xl font-semibold">{plant.name}</h2>
              <p className="text-sm text-gray-600 mb-2">
                {plant.description || "No description"}
              </p>

              <p className="font-bold mb-2">${plant.price}</p>

              {outOfStock ? (
                <p className="text-red-600 font-semibold">Out of Stock</p>
              ) : (
                <button
                  className="mt-3 w-full bg-green-800 text-white py-2 rounded hover:bg-green-700"
                >
                  Add to Cart
                </button>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}

"use client";

import { useEffect, useState } from "react";

export default function PlantsList() {
  const [plants, setPlants] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/plants")
      .then(res => res.json())
      .then(data => setPlants(data));
  }, []);

  return (
    <div className="grid grid-cols-3 gap-6">
      {plants.map((plant) => (
        <div key={plant.id} className="border p-4 rounded">
          <img
            src={plant.images[0]?.url || "/placeholder.png"}
            alt={plant.name}
            className={`w-full h-40 object-cover ${plant.stock === 0 ? "grayscale" : ""}`}
          />
          <h2 className="mt-2 font-semibold">{plant.name}</h2>
          <p>${plant.price.toFixed(2)}</p>
          {plant.stock === 0 ? (
            <p className="text-red-600 font-bold">Out of Stock</p>
          ) : (
            <button className="mt-2 w-full bg-green-700 text-white py-1 rounded"
                disabled={plant.stock === 0}
                onClick={async () => {
                    try{
                        const res = await fetch("/api/cart/add", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ plantId: plant.id, quantity: 1 }),
                        });

                        if (!res.ok) throw new Error("Failed to add the plant");
                        alert("Plant added to cart");
                    } catch (err) {
                        alert ("Error adding plant to cart");
                    }
                }}
            >
              {plant.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

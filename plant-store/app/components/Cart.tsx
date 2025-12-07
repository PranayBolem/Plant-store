"use client";
import { useEffect, useState } from "react";

export default function Cart() {
  const [cart, setCart] = useState<any>(null);

  useEffect(() => {
    fetch("/api/cart")
      .then(res => res.json())
      .then(data => setCart(data));
  }, []);

  const total = cart?.items?.reduce((sum: number, item: any) => sum + item.plant.price * item.quantity, 0) || 0;

  return (
    <div className="p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">Your Cart</h2>
      {cart?.items?.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <ul>
          {cart.items.map((item: any) => (
            <li key={item.id} className="flex justify-between mb-2">
              <span>{item.plant.name} x {item.quantity}</span>
              <span>${(item.plant.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-4 font-bold">Total: ${total.toFixed(2)}</p>
    </div>
  );
}

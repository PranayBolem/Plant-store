'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUp() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError("");

        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password }),
        });

        if (!res.ok) {
            setError("Signup failed");
            setLoading(false);
            return;
        }

        router.push("/auth/signIn");
    }

    return (
        <div className="bg-sky-950 content-center p-8 rounded-lg max-w-md mx-auto mt-10">
        <form onSubmit={handleSubmit}>
            <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
            <p>Fill this to create an account!</p>
            <label htmlFor="name" className="block mt-4">
              Name
            </label>
            <input 
                onChange={(e) => setName(e.target.value)}
                type="text"
                id="name"
                name="name"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="input a name"
            />
            <label htmlFor="email" className="block mt-4">
              Email
            </label>
            <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="input an email"
            />
            <label htmlFor="password" className="block mt-4">
              Password
            </label>
            <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
                name="password"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="input a password"
            />

            <button
                disabled={loading}
                type="submit"
                className="mt-6 w-full rounded-md bg-sky-700 px-4 py-2 font-semibold text-white hover:bg-indigo-700"
            >
                {loading ? "Signing Up..." : "Register"}
            </button>

            {error && <p className="mt-4 text-red-600">{error}</p>}  
        </form>
        </div>
    ); 
}
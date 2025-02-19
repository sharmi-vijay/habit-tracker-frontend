"use client"

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleRegister = async () => {
        if (!name || !email || !phone || !password) {
            setError("All fields are required!");
            return;
        }

        try {
            await axios.post("https://backendsa.vercel.app/register", { name, email, phone, password });
            router.push("/login");
        } catch (err) {
            setError("Registration failed. Please try again.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-md rounded-lg p-6 w-96">
            <h2 className="text-2xl font-semibold text-center mb-4">Register</h2>

            {error && <p className="text-red-500 text-center">{error}</p>}

            <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded mb-2"
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded mb-2"
            />
            <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2 border rounded mb-2"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded mb-4"
            />

            <button
                onClick={handleRegister}
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
            >
                Register
            </button>

            <p className="text-center mt-4">
                Already have an account?{" "}
                <a href="/login" className="text-blue-500 hover:underline">
                    Login
                </a>
            </p>
        </div>
    </div>
    );
}

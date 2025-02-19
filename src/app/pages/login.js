"use client"

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = async () => {
        try {
            const res = await axios.post("https://backendsa-git-main-manojkumars-projects-922c9146.vercel.app/login", 
                { email, password },
                { headers: { "Content-Type": "application/json" } } 
            );
    
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user_id", res.data.id);
            localStorage.setItem("email", email);
    
            console.log("Login successful:", res.data);
            router.push("/");
        } catch (error) {
            console.error("Login failed:", error.response?.data?.error || error.message);
            alert(error.response?.data?.error || "Invalid email or password. Please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Login</h2>
                <div className="space-y-4">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Enter your password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        onClick={handleLogin}
                        className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        Login
                    </button>
                    <p className="text-center text-sm text-gray-600">
                        Don't have an account?{" "}
                        <a href="/register" className="text-blue-500 hover:underline">
                            Sign Up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

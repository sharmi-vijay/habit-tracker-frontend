"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const [userId, setUserId] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchUserId = () => {
            setUserId(localStorage.getItem("user_id"));
        };

        fetchUserId();

        window.addEventListener("storage", fetchUserId);
        return () => window.removeEventListener("storage", fetchUserId);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user_id");
        localStorage.removeItem("username");
        localStorage.removeItem("token");

        setUserId(null);
        router.push("/login");


        window.dispatchEvent(new Event("storage"));
    };

    return (
        <nav className="bg-black p-4 text-white flex justify-between items-center">

            <div className="text-2xl font-bold">Habit Tracker</div>


            <button
                className="md:hidden text-white text-2xl"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                ☰
            </button>

            <ul
                className={`absolute md:static top-16 left-0 w-full md:w-auto md:flex md:space-x-6 bg-blue-600 md:bg-transparent transition-all duration-300 ${menuOpen ? "block" : "hidden"
                    } md:flex`}
            >
                {userId ? (
                    <>
                        <li className="p-2 text-center md:p-0">
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 hover:bg-red-700 px-4 py-2 rounded-md text-white transition w-full md:w-auto"
                            >
                                Logout
                            </button>
                        </li>
                    </>
                ) : (
                    <>
                        <li className="p-2 text-center md:p-0">
                            <Link
                                href="/login"
                                className="block w-full md:w-auto bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition"
                            >
                                Login
                            </Link>
                        </li>
                        <li className="p-2 text-center md:p-0">
                            <Link
                                href="/register"
                                className="block w-full md:w-auto bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition"
                            >
                                Register
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}




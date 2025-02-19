"use client";

import { useState, useEffect } from "react";

export default function DarkModeToggle() {
    const [darkMode, setDarkMode] = useState(
        typeof window !== "undefined" && localStorage.getItem("theme") === "dark"
    );

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    return (
        <button
            onClick={() => setDarkMode(!darkMode)}
            className="fixed bottom-4 right-4 p-3 bg-gray-700 dark:bg-yellow-500 text-white dark:text-black rounded-md shadow-lg transition"
        >
            {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>
    );
}

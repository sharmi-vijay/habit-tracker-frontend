"use client";

import { useState, useEffect } from "react";
import HabitList from "./HabitList";

export default function HabitForm() {
    const [habit, setHabit] = useState("");
    const [change, setChange] = useState("add new Habit");
    const [habits, setHabits] = useState([]);
    
   
    const [userId, setUserId] = useState(null);

    // Fetch user ID safely inside useEffect
    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedUserId = localStorage.getItem("user_id");
            setUserId(storedUserId ? parseInt(storedUserId, 10) : null);
        }
    }, []);

    console.log("User ID:", userId);

    const addHabit = async () => {
        if (!habit.trim()) {
            alert("Please enter a habit.");
            return;
        }

        if (!userId) {
            alert("User not logged in.");
            return;
        }

        try {

            console.log("Sending habit data:", { user_id: userId, name: habit });

            const response = await fetch("https://backendsa-git-main-manojkumars-projects-922c9146.vercel.app/habits", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user_id: userId, name: habit }),
            });

            const data = await response.json();
            console.log("Response from server:", data);

            if (!response.ok) throw new Error(data.error || "Failed to add habit");

            setHabit("");
            fetchHabits();
        } catch (error) {
            console.error("Error adding habit:", error);
            alert("Failed to add habit. Please try again.");
        }
    };

    const fetchHabits = async () => {
        if (!userId) return;

        try {
            const response = await fetch(`https://backendsa-git-main-manojkumars-projects-922c9146.vercel.app/habits/${userId}`, { method: "GET" });

            if (!response.ok) throw new Error("Failed to fetch habits");

            const data = await response.json();
            console.log("Fetched habits:", data);
            setHabits(data);
        } catch (error) {
            console.error("Error fetching habits:", error);
        }
    };

    useEffect(() => {
        fetchHabits();
    }, [userId]);

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                    {change === "add new Habit" ? "Add a New Habit" : "Habit List"}
                </h2>
                <button
                    onClick={() => setChange(change === "add new Habit" ? "list habit" : "add new Habit")}
                    className="px-4 py-2 text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
                >
                    {change === "add new Habit" ? "View Habit List" : "Back to Add Habit"}
                </button>
            </div>

            {change === "add new Habit" ? (
                <div className="bg-white shadow-md p-6 rounded-md max-w-md mx-auto w-full">
                <input
                    value={habit}
                    onChange={(e) => setHabit(e.target.value)}
                    className="border p-3 w-full mb-4 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter new habit"
                />
                <button 
                    onClick={addHabit} 
                    className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
                >
                    Add Habit
                </button>
            </div>
            ) : (
                <HabitList habits={habits} />
            )}
        </div>
    );
}


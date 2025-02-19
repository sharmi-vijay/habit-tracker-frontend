"use client"

import HabitForm from "../components/HabitForm";
import HabitList from "../components/HabitList";
import Navbar from "../components/Navbar";
import DarkModeToggle from "../components/DarkModeToggle";

export default function Home() {
    return (
        <div>
            <Navbar />
            <div className="container text-center flex ">
                <h1>Habit Tracker</h1>
                <p>Track your daily habits and build streaks.</p>
            </div>
            <HabitForm />
            <HabitList />
            <DarkModeToggle />
        </div>
    );
}

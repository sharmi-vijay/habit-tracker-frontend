"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import HabitForm from "../components/HabitForm";
import Navbar from "../components/Navbar";
import DarkModeToggle from "../components/DarkModeToggle";

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);  
    const [error, setError] = useState(null);  

    return (
        <div>
            <Navbar />
            <HabitForm />
            <DarkModeToggle/>
           
        </div>
    );
}

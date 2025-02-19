"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function HabitList() {
    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editMode, setEditMode] = useState(null); 
    const [updatedName, setUpdatedName] = useState("");
    const [refresh, setRefresh] = useState(false);

    const userId = localStorage.getItem("user_id");

    const fetchHabits = async () => {
        if (!userId) {
            setError("User not logged in.");
            setLoading(false);
            return;
        }

        try {
            const res = await axios.get(`http://localhost:5000/habits/${userId}`);
            setHabits(res.data);
            setLoading(false);
        } catch (err) {
            setError("Failed to fetch habits. Please try again later.");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHabits();
    }, [userId, refresh]); // Refresh list when needed

    // Handle habit deletion
    const handleDelete = async (habitId) => {
        try {
            const res = await axios.delete(`http://localhost:5000/habits/${habitId}`);
            console.log("Habit deleted:", res.data);
            setRefresh(prev => !prev);
        } catch (err) {
            console.error("Error deleting habit:", err);
        }
    };

    // Handle habit editing
    const handleEdit = async (habitId) => {
        try {
            const res = await axios.put(`http://localhost:5000/habits/${habitId}`, { name: updatedName });
            console.log("habit updated:", res.data)
            setRefresh(prev => !prev);
        } catch (err) {
            console.error("Error updating habit:", err);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4 w-full max-w-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Your Habits</h2>
            <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6">
                {error ? (
                    <div className="text-red-600 text-center">{error}</div>
                ) : (
                    <ul className="space-y-4">
                        {habits.length > 0 ? (
                            habits.map((habit) => (
                                <li
                                    key={habit.id}
                                    className="flex flex-col sm:flex-row justify-between items-center p-4 bg-gray-50 rounded-md shadow-sm hover:bg-gray-100 transition"
                                >
                                    {editMode === habit.id ? (
                                        <input
                                            type="text"
                                            value={updatedName}
                                            onChange={(e) => setUpdatedName(e.target.value)}
                                            className="border border-gray-300 rounded-md px-2 py-1 w-full sm:w-auto"
                                        />
                                    ) : (
                                        <span className="text-lg font-medium text-gray-800 text-center sm:text-left">
                                            {habit.name}
                                        </span>
                                    )}

                                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 mt-2 sm:mt-0">
                                        {editMode === habit.id ? (
                                            <button
                                                onClick={() => handleEdit(habit.id)}
                                                className="bg-green-500 text-white px-4 py-2 rounded-md w-full sm:w-auto"
                                            >
                                                Save
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => {
                                                    setEditMode(habit.id);
                                                    setUpdatedName(habit.name);
                                                }}
                                                className="bg-yellow-500 text-white px-4 py-2 rounded-md w-full sm:w-auto"
                                            >
                                                Edit
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleDelete(habit.id)}
                                            className="bg-red-500 text-white px-4 py-2 rounded-md w-full sm:w-auto"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <li className="text-center text-gray-500">No habits found. Add one!</li>
                        )}
                    </ul>
                )}
            </div>
        </div>

    );
}




// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function HabitList({ refresh }) {
//     const [habits, setHabits] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     const userId = localStorage.getItem("user_id");

//     const fetchHabits = async () => {
//         if (!userId) {
//             setError("User not logged in.");
//             setLoading(false);
//             return;
//         }

//         try {
//             const res = await axios.get(`http://localhost:5000/habits/${userId}`);
//             setHabits(res.data);
//             setLoading(false);
//         } catch (err) {
//             setError("Failed to fetch habits. Please try again later.");
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchHabits();
//     }, [userId, refresh]); // Update when userId or refresh flag changes

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className="container mx-auto p-4">
//             <h2 className="text-2xl font-semibold text-gray-800 mb-6">Your Habits</h2>
//             <div className="bg-white shadow-lg rounded-lg p-6">
//                 {error ? (
//                     <div className="text-red-600 text-center">{error}</div>
//                 ) : (
//                     <ul className="space-y-4">
//                         {habits.length > 0 ? (
//                             habits.map((habit) => (
//                                 <li
//                                     key={habit.id}
//                                     className="flex justify-between items-center p-4 bg-gray-50 rounded-md shadow-sm hover:bg-gray-100 transition"
//                                 >
//                                     <div className="flex items-center space-x-3">
//                                         <span className="text-lg font-medium text-gray-800">{habit.name}</span>
//                                     </div>
//                                     <span className="text-blue-600 font-semibold">
//                                         Streak: {habit.streak || 0}
//                                     </span>
//                                 </li>
//                             ))
//                         ) : (
//                             <li className="text-center text-gray-500">No habits found. Add one!</li>
//                         )}
//                     </ul>
//                 )}
//             </div>
//         </div>
//     );
// }






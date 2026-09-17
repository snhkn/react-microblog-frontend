import { useState } from "react";
import api from "../api/api";
import { Link } from "react-router-dom";

const ExplorePage = () => {
    const[query, setQuery] = useState("");
    const[users, setUsers] = useState([]);
    const[hasSearched, setHasSearched] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();

        const trimmedQuery = query.trim();

        if (!trimmedQuery) {
            setUsers([]);
            setHasSearched(false);
            return;
        }

        api
          .get(`/profile/users/search?query=${encodeURIComponent(query)}`)
          .then((response) => {
            setUsers(response.data);
            setHasSearched(true);
          })
          .catch((error) => {
            console.error("Error searching users:", error);
          });

    };

    return (
        <main className="pt-20 max-w-2xl mx-auto px-4 text-gray-100">
            <h1 className="text-2xl font-bold mb-6">Explore</h1>

            <form onSubmit={handleSearch} className="flex gap-3 mb-8">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search users..."
                    className="flex-1 px-4 py-2 rounded-md bg-gray-800 text-gray-100
                            border border-gray-600
                            focus:outline-none focus:border-blue-500
                        placeholder-gray-500"
                />

                <button
                    type="submit"
                    className="px-5 py-2 bg-blue-500 hover:bg-blue-600
                        text-white font-medium rounded-md transition"
                >
                Search
                </button>
            </form>

            <section>
            {users.length > 0 ? (
                <>
                <h2 className="text-xl font-semibold mb-4">Results</h2>

                <div className="space-y-3">
                    {users.map((user) => (
                    <div
                        key={user.id}
                        className="flex items-center justify-between
                                p-4 rounded-lg
                                bg-[rgba(255,255,255,0.05)]
                                border border-gray-700
                                hover:border-gray-500
                                transition"
                    >
                        <div className="flex items-center gap-3">
                        {user.gravatarUrl && (
                            <img
                            src={user.gravatarUrl}
                            alt={`${user.username}'s avatar`}
                            className="w-10 h-10 rounded-full"
                            />
                        )}

                        <div>
                            <Link
                            to={`/profile/${user.id}`}
                            className="font-semibold text-blue-400 hover:text-blue-300"
                            >
                            {user.username}
                            </Link>

                            <p className="text-sm text-gray-400">
                            {user.followersCount} followers ·{" "}
                            {user.followingCount} following
                            </p>
                        </div>
                        </div>

                        <Link
                        to={`/profile/${user.id}`}
                        className="px-3 py-1.5 text-sm border border-blue-400/50
                                    text-blue-400 rounded-md
                                    hover:bg-blue-400/10 transition"
                        >
                        View profile
                        </Link>
                    </div>
                    ))}
                </div>
                </>
            ) : hasSearched ? (
                    <p className="text-gray-400">No users found.</p>
                ) : (
                    <p className="text-gray-400">
                    Search for a user to get started.
                    </p>
                )
            }
            </section>
        </main>
);
};
export default ExplorePage;

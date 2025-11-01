import { useEffect, useState } from "react";
import api from "../api/api";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const res = await api.get("/profile/users/me");
        setUser(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch user info. Please login again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <p className="text-center mt-10 text-gray-400">Loading...</p>;
  if (!user) return <p className="text-center mt-10 text-gray-400">No user data available.</p>;

  return (
    <main className="pt-20 max-w-3xl mx-auto px-4 text-white">
      <div className="bg-[rgba(255,255,255,0.05)] p-6 rounded-lg shadow-lg flex flex-col sm:flex-row gap-6 items-center sm:items-start">
        {/* Avatar */}
        <img
          src={user.avatarUrl || user.gravatarUrl || "https://via.placeholder.com/150"}
          alt="User avatar"
          className="w-32 h-32 rounded-full border-4 border-gray-600 object-cover"
        />

        {/* User info */}
        <div className="flex-1 space-y-3">
          <h1 className="text-2xl font-bold text-blue-400">User: {user.username}</h1>
          <p className="text-gray-300">{user.email}</p>
          <p className="text-gray-400 italic">{user.aboutMe || "No bio yet."}</p>
          <p className="text-gray-400">
            Last seen on:{" "}
            <span className="font-medium text-gray-200">
              {user?.lastseen
                ? new Date(user.lastseen).toLocaleString()
                : "N/A"}
            </span>
          </p>
          <p className="text-gray-400">
            <span className="font-semibold text-white">0</span> followers,{" "}
            <span className="font-semibold text-white">0</span> following
          </p>

          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow mt-2"
          >
            Edit your profile
          </button>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;

import { useEffect, useState } from "react";
import api from "../api/api";
import toast from "react-hot-toast";
import Post from "../components/shared/Post";
import ProfileEditor from "./ProfileEditor";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const { userId } = useParams(); // undefined if own profile
  const { user: currentUser } = useSelector((state) => state.auth);

  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  const isOwnProfile = !userId || currentUser?.id === Number(userId);
  const resolvedUserId = isOwnProfile ? currentUser?.id : Number(userId);

  // Fetch user, posts, and counts
  useEffect(() => {
    if (!currentUser) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        const userEndpoint = isOwnProfile
          ? "/profile/users/me"
          : `/profile/users/${userId}`;

        const [userRes, postsRes] = await Promise.all([
          api.get(userEndpoint),
          api.get(`${userEndpoint}/posts`),
        ]);

        setUser(userRes.data);
        setUserPosts(postsRes.data);

        await refreshFollowCounts(resolvedUserId);

        // Check if logged-in user follows this profile
        if (!isOwnProfile) {
          const statusRes = await api.get(`/follow/following/${currentUser.id}`);
          const isFollowed = statusRes.data.some(
            (u) => u.id === Number(userId)
          );
          setIsFollowing(isFollowed);
        }
      } catch (err) {
        console.error("Error loading profile:", err);
        toast.error("Failed to fetch user info. Please login again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, currentUser]);

  // Refresh follow counts
  const refreshFollowCounts = async (targetUserId = resolvedUserId) => {
    if (!targetUserId) return;

    try {
      const [followersRes, followingRes] = await Promise.all([
        api.get(`/follow/followers/${targetUserId}`),
        api.get(`/follow/following/${targetUserId}`),
      ]);

      setFollowersCount(followersRes.data.length);
      setFollowingCount(followingRes.data.length);
    } catch (err) {
      console.error("Error refreshing follow counts:", err);
    }
  };

  //  Follow / Unfollow handler
  const handleFollow = async () => {
    try {
      if (!userId) {
        toast.error("Invalid user ID");
        return;
      }

      if (isFollowing) {
        await api.delete(`/follow/${userId}`);
        setIsFollowing(false);
        setFollowersCount((prev) => Math.max(prev - 1, 0));
      } else {
        await api.post(`/follow/${userId}`);
        setIsFollowing(true);
        setFollowersCount((prev) => prev + 1);
      }
    } catch (err) {
      console.error("Follow action failed:", err);
      toast.error("Follow action failed");
    }
  };

  const handleProfileUpdate = (updatedData) => {
    setUser((prev) => ({
      ...prev,
      ...updatedData,
    }));
  };

  if (loading)
    return <p className="text-center mt-10 text-gray-400">Loading...</p>;
  if (!user)
    return (
      <p className="text-center mt-10 text-gray-400">No user data available.</p>
    );

  return (
    <main className="pt-20 max-w-3xl mx-auto px-4 text-white">
      <div className="bg-[rgba(255,255,255,0.05)] p-6 rounded-lg shadow-lg flex flex-col sm:flex-row gap-6 items-center sm:items-start">
        {/* Avatar */}
        <img
          src={
            user.avatarUrl ||
            user.gravatarUrl ||
            "https://via.placeholder.com/150"
          }
          alt="User avatar"
          className="w-32 h-32 rounded-full border-4 border-gray-600 object-cover"
        />

        {/* User info */}
        <div className="flex-1 space-y-3">
          <h1 className="text-2xl font-bold text-blue-400">
            User: {user.username}
          </h1>
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

          {/* Follower/Following counts */}
          <div className="text-gray-400 flex gap-4">
            <span>
              <strong className="text-gray">{followersCount}</strong>{" "}
              followers
            </span>
            <span>
              <strong className="text-gray">{followingCount}</strong>{" "}
              following
            </span>
          </div>

          {/* Follow / Edit button */}
          {isOwnProfile ? (
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow mt-2"
              onClick={() => setIsEditing(true)}
            >
              Edit your profile
            </button>
          ) : (
            <button
              onClick={handleFollow}
              className={`px-4 py-2 rounded-lg font-semibold mt-2 ${
                isFollowing
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-blue-500 hover:bg-blue-600"
              } text-white`}
            >
              {isFollowing ? "Unfollow" : "Follow"}
            </button>
          )}
        </div>
      </div>

      {/* Posts */}
      <section>
        <h2 className="text-xl font-bold mb-4 text-gray-200">
          Posts by {user.username}
        </h2>
        {userPosts.length > 0 ? (
          <div className="space-y-4">
            {userPosts.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No posts yet.</p>
        )}
      </section>

      {/* Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-lg relative">
            <button
              onClick={() => setIsEditing(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl"
            >
              ✕
            </button>
            <ProfileEditor
              user={user}
              onClose={() => setIsEditing(false)}
              onUpdate={handleProfileUpdate}
            />
          </div>
        </div>
      )}
    </main>
  );
};

export default ProfilePage;

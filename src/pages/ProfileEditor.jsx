import { useState } from "react";
import api from "../api/api";
import toast from "react-hot-toast";

const ProfileEditor = ({ user, onClose, onUpdate}) => {
  const [formData, setFormData] = useState({
    aboutMe: user.aboutMe || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put("/profile/users/me", formData);
      toast.success("Profile updated successfully!");
      onUpdate(formData);
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-50 transition-all duration-300">
        <div className="bg-white text-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4 relative">
            <button
                onClick={onClose}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
            ✕
            </button>

             <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Edit Your Profile
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        About Me
                    </label>
                     <textarea
                        name="aboutMe"
                        value={formData.aboutMe}
                        onChange={handleChange}
                        rows="4"
                        className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white"
                        placeholder="Tell something about yourself..."
                    />
                </div>

                <div className="flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium"
                    >
                    Cancel
                    </button>
                    <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium shadow"
                    >
                    Save
                    </button>
                </div>
            </form>
        </div>
    </div>

  );
};

export default ProfileEditor;
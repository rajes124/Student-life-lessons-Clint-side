import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { useAuth } from "../../contexts/AuthContext";

export default function ProfileUpdate() {
  const { user, setUser } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPhotoURL(user.photoURL || "");
    }
  }, [user]);

  const handleSave = (e) => {
    e.preventDefault();
    if (!name || !email) {
      toast.error("Name & Email required!");
      return;
    }

    setLoading(true);
    setUser({ ...user, name, email, photoURL });

    setTimeout(() => {
      setLoading(false);
      toast.success("Profile updated successfully!");
    }, 400);
  };

  return (
    <div className="w-full flex justify-center py-12 px-4 bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, type: "spring" }}
        className="w-full max-w-lg"
      >
        <form
          onSubmit={handleSave}
          className="p-8 rounded-3xl shadow-2xl border border-gray-300 bg-white backdrop-blur-xl relative overflow-hidden"
        >
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-200 rounded-full blur-3xl opacity-40"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-200 rounded-full blur-3xl opacity-40"></div>

          <motion.h2
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-extrabold text-center mb-8 text-gray-800"
          >
            Update Profile
          </motion.h2>

          {/* Photo URL */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-5"
          >
            <label className="text-sm font-bold text-gray-700">Photo URL</label>
            <input
              type="text"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              className="w-full mt-1 p-3 border rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
              placeholder="Enter photo URL"
            />
            {photoURL && (
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                src={photoURL}
                alt="Preview"
                className="mt-4 w-28 h-28 rounded-full object-cover shadow-lg border mx-auto"
              />
            )}
          </motion.div>

          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-5"
          >
            <label className="text-sm font-bold text-gray-700">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 p-3 border rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
              placeholder="Enter full name"
            />
          </motion.div>

          {/* Email */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-6"
          >
            <label className="text-sm font-bold text-gray-700">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-3 border rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
              placeholder="Enter email"
            />
          </motion.div>

          {/* Save Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-2xl font-semibold text-lg shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90 active:scale-95 transition-all"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
}

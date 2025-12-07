import React, { useState } from "react";
import { auth, googleProvider } from "../../firebase/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
} from "firebase/auth";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const validatePassword = (pwd) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    return re.test(pwd);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) {
      return toast.error("All fields are required!");
    }

    if (!validatePassword(password)) {
      return toast.error(
        "Password must include uppercase + lowercase + minimum 6 characters!"
      );
    }

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(res.user, {
        displayName: name,
        photoURL: photoURL || null,
      });

      toast.success("Registration successful!");
      navigate("/login");
    } catch (error) {
      toast.error(error.code || "Registration failed!");
    }
  };

  const handleGoogleRegister = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Google authentication successful!");
      navigate("/");
    } catch (error) {
      toast.error(error.code || "Google auth failed!");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100 px-4 overflow-hidden">
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/src/assets/background.mp4" type="video/mp4" />
      </video>

      <div className="absolute top-0 left-0 w-full h-full bg-black/40 backdrop-blur-sm z-10"></div>

      <div className="relative z-20 w-full max-w-md bg-white/80 shadow-2xl rounded-2xl p-8 animate-[slideUp_0.6s_ease]">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">
          Register
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="text"
            placeholder="Photo URL"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>

        <button
          onClick={handleGoogleRegister}
          className="w-full mt-4 flex items-center justify-center gap-2 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition"
        >
          <FcGoogle size={24} /> Register / Login with Google
        </button>

        <p className="text-center mt-4 text-white">
          Already have an account? {" "}
          <Link to="/login" className="text-blue-400 font-semibold">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

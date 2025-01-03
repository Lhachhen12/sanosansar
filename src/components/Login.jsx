import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const { login } = useAuth();
  const navigate = useNavigate();

  const showToast = (type, message) => {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: type,
      title: message,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === "shreejanlama@gmail.com" && password === "Test@12345") {
      login(username);
      showToast("success", "Login successful!");
      navigate("/");
    } else {
      showToast("error", "Invalid email or password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="box">
        <div className="relative z-10 w-full max-w-md bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
            Login
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label className="block text-gray-600 text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-6 relative">
              <label className="block text-gray-600 text-sm font-medium mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                  placeholder="Enter your password"
                />
                <i
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer ${
                    showPassword ? "fa fa-eye" : "fa fa-eye-slash"
                  }`}
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

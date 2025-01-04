import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import Swal from "sweetalert2";
import { Eye, EyeOff } from "lucide-react";
import "sweetalert2/dist/sweetalert2.min.css";

const ParticleBackground = ({ isDark }) => {
  useEffect(() => {
    const canvas = document.getElementById("login-particle-canvas");
    const ctx = canvas.getContext("2d");
    let particles = [];
    let animationFrameId;

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      particles = [];
      for (let i = 0; i < 100; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5,
          vx: Math.random() * 0.5 - 0.25,
          vy: Math.random() * 0.5 - 0.25,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Particles are white with reduced opacity in light mode, gray in dark mode
      ctx.fillStyle = isDark
        ? "rgba(156, 163, 175, 0.8)"
        : "rgba(255, 255, 255, 0.8)";
      ctx.strokeStyle = isDark
        ? "rgba(156, 163, 175, 0.1)"
        : "rgba(255, 255, 255, 0.1)";

      particles.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();

        particles.forEach((particle2, j) => {
          if (i !== j) {
            const dx = particle.x - particle2.x;
            const dy = particle.y - particle2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(particle2.x, particle2.y);
              ctx.stroke();
            }
          }
        });
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => {
      init();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  return (
    <canvas
      id="login-particle-canvas"
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const showToast = (type, message) => {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: type,
      title: message,
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      background: isDark ? "#1F2937" : "#FFFFFF",
      color: isDark ? "#F3F4F6" : "#1F2937",
      customClass: {
        popup: "mt-16",
      },
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
    <>
      {/* Background with conditional gradient */}
      <div
        className={`fixed inset-0 ${
          isDark
            ? "bg-gradient-to-b from-gray-900 to-gray-800"
            : "bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600"
        }`}
      />

      <ParticleBackground isDark={isDark} />

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div
            className={`rounded-xl shadow-2xl p-8 ${
              isDark
                ? "bg-gray-800/80 backdrop-blur-md"
                : "bg-white/20 backdrop-blur-md"
            }`}
          >
            <h2
              className={`text-3xl font-bold text-center mb-8 ${
                isDark ? "text-gray-100" : "text-white"
              }`}
            >
              Login
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? "text-gray-300" : "text-white"
                  }`}
                >
                  Email
                </label>
                <input
                  type="email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-2 ${
                    isDark
                      ? "bg-gray-700/50 border-gray-600 text-gray-100 placeholder-gray-400 focus:ring-blue-500"
                      : "bg-white/10 border-white/30 text-white placeholder-white/60 focus:ring-white/50"
                  }`}
                  required
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? "text-gray-300" : "text-white"
                  }`}
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-2 ${
                      isDark
                        ? "bg-gray-700/50 border-gray-600 text-gray-100 placeholder-gray-400 focus:ring-blue-500"
                        : "bg-white/10 border-white/30 text-white placeholder-white/60 focus:ring-white/50"
                    }`}
                    required
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors ${
                      isDark
                        ? "text-gray-400 hover:text-gray-200"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                  isDark
                    ? "bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                    : "bg-white text-blue-600 hover:bg-blue-50 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
                }`}
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

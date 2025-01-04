import React, { useEffect, useContext } from "react";
import { useAuth } from "../context/AuthContext";
import Profile34 from "../Assets/photo1.png";
import { ThemeContext } from "../context/ThemeContext";

const ParticleBackground = ({ isDark }) => {
  useEffect(() => {
    const canvas = document.getElementById("profile-particle-canvas");
    const ctx = canvas.getContext("2d");
    let particles = [];
    let animationFrameId;

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      particles = [];
      for (let i = 0; i < 50; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2,
          vx: Math.random() * 2 - 1,
          vy: Math.random() * 2 - 1,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particleColor = isDark
        ? "rgba(156, 163, 175, 0.5)"
        : "rgba(66, 153, 225, 0.5)";
      const lineColor = isDark
        ? "rgba(156, 163, 175, 0.1)"
        : "rgba(66, 153, 225, 0.1)";

      ctx.fillStyle = particleColor;
      ctx.strokeStyle = lineColor;

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

            if (distance < 150) {
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
      id="profile-particle-canvas"
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

const Profile = () => {
  const { user } = useAuth();
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  return (
    <div
      className={`relative min-h-full overflow-hidden ${
        isDark
          ? "bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100"
          : "bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900"
      }`}
    >
      <ParticleBackground isDark={isDark} />

      <div className="relative flex items-center justify-center py-20 px-4">
        <div
          className={`w-full max-w-lg mx-auto rounded-xl shadow-xl overflow-hidden ${
            isDark
              ? "bg-gray-800/80 backdrop-blur-sm"
              : "bg-white/80 backdrop-blur-sm"
          }`}
        >
          <div className="p-8">
            <div className="flex flex-col items-center">
              <img
                src={Profile34}
                alt="Profile"
                className="h-24 w-24 rounded-full border-4 border-blue-500 mb-4 shadow-xl"
                width={96}
                height={96}
              />
              <h2
                className={`text-2xl font-semibold mb-1 ${
                  isDark ? "text-gray-100" : "text-gray-800"
                }`}
              >
                Lhachhen Wanjyu Lama
              </h2>
              <p
                className={`mb-6 ${isDark ? "text-gray-400" : "text-gray-500"}`}
              >
                {user?.username || "Email not set"}
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <label
                  className={`font-medium ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Full Name:
                </label>
                <p
                  className={`font-semibold ${
                    isDark ? "text-gray-100" : "text-gray-800"
                  }`}
                >
                  Lhachhen Wanjyu Lama
                </p>
              </div>

              <div className="flex items-center justify-between">
                <label
                  className={`font-medium ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Email:
                </label>
                <p
                  className={`font-semibold ${
                    isDark ? "text-gray-100" : "text-gray-800"
                  }`}
                >
                  {user?.username || "N/A"}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <label
                  className={`font-medium ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Phone Number:
                </label>
                <p
                  className={`font-semibold ${
                    isDark ? "text-gray-100" : "text-gray-800"
                  }`}
                >
                  9860607898
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

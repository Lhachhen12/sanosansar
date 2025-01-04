import React from "react";

const AnimatedProfileRing = ({ imageSrc, imageAlt }) => {
  return (
    <div className="relative w-[200px] h-[200px]">
      {/* Rotating ring container */}
      <div className="absolute inset-0 rounded-full">
        {/* Gradient ring with rotation animation */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "linear-gradient(to right, #3B82F6, #8B5CF6, #EC4899, #3B82F6)",
            backgroundSize: "400% 100%",
            animation: "rotate-gradient 3s linear infinite",
            padding: "4px",
            maskImage:
              "radial-gradient(circle at center, transparent 66%, black 66.5%)",
            WebkitMaskImage:
              "radial-gradient(circle at center, transparent 66%, black 66.5%)",
          }}
        />
      </div>

      {/* Profile image container */}
      <div className="absolute inset-0 rounded-full p-[4px]">
        <div className="w-full h-full rounded-full overflow-hidden bg-white">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </div>

      {/* Define the keyframe animation */}
      <style jsx>{`
        @keyframes rotate-gradient {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 400% 50%;
          }
        }
      `}</style>
    </div>
  );
};

export default AnimatedProfileRing;

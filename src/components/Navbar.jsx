import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

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

  const handleLogout = () => {
    logout();
    showToast("success", "Logout successful!");
  };

  return (
    <nav className="bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="font-bold text-xl">
              Sano_Sansaar
            </Link>
          </div>

          {/* Hamburger Icon */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-blue-700 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center">
            {user ? (
              <>
                <Link to="/" className="px-3 py-2 rounded-md hover:bg-blue-700">
                  Home
                </Link>
                <Link
                  to="/profile"
                  className="px-3 py-2 rounded-md hover:bg-blue-700"
                >
                  Profile
                </Link>
                <Link
                  to="/test"
                  className="px-3 py-2 rounded-md hover:bg-blue-700"
                >
                  Test
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 rounded-md hover:bg-blue-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="px-3 py-2 rounded-md hover:bg-blue-700"
              >
                Login
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="bg-blue-600 space-y-1 px-4 pt-2 pb-4">
              {user ? (
                <>
                  <Link
                    to="/"
                    className="block px-3 py-2 rounded-md hover:bg-blue-700"
                    onClick={() => setIsOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    to="/profile"
                    className="block px-3 py-2 rounded-md hover:bg-blue-700"
                    onClick={() => setIsOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/test"
                    className="block px-3 py-2 rounded-md hover:bg-blue-700"
                    onClick={() => setIsOpen(false)}
                  >
                    Test
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md hover:bg-blue-700"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md hover:bg-blue-700"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

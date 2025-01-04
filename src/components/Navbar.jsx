import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import { Menu, X, Sun, Moon } from "lucide-react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);
  const isDark = theme === "dark";

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "Logout successful!",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      background: isDark ? "#1F2937" : "#FFFFFF",
      color: isDark ? "#F3F4F6" : "#1F2937",
      customClass: { popup: "mt-16" },
    });
  };

  const NavLink = ({ to, children, onClick }) => (
    <Link
      to={to}
      onClick={onClick}
      className={`px-4 py-2 rounded-md text-sm transition-colors duration-200 ${
        isDark
          ? "text-gray-100 hover:bg-gray-700"
          : "text-white hover:bg-blue-700"
      }`}
    >
      {children}
    </Link>
  );

  const NavButton = ({ onClick, children }) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md text-sm transition-colors duration-200 ${
        isDark
          ? "text-gray-100 hover:bg-gray-700"
          : "text-white hover:bg-blue-700"
      }`}
    >
      {children}
    </button>
  );

  return (
    <nav
      className={`fixed top-0 w-full z-50 ${
        isDark ? "bg-gray-800" : "bg-blue-600"
      } shadow-lg`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="font-bold text-xl text-white hover:opacity-90 transition-opacity"
          >
            Sano_Sansaar
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-2">
            {user ? (
              <>
                <NavLink to="/" onClick={() => setIsOpen(false)}>
                  Home
                </NavLink>
                <NavLink to="/profile" onClick={() => setIsOpen(false)}>
                  Profile
                </NavLink>
                <NavButton onClick={toggleTheme}>
                  {isDark ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </NavButton>
                <NavButton onClick={handleLogout}>Logout</NavButton>
              </>
            ) : (
              <>
                <NavLink to="/login" onClick={() => setIsOpen(false)}>
                  Login
                </NavLink>
                <NavButton onClick={toggleTheme}>
                  {isDark ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </NavButton>
              </>
            )}
          </div>

          {/* Mobile Menu Icons */}
          <div className="flex md:hidden items-center space-x-4">
            <button
              onClick={() => {
                toggleTheme();
              }}
              className="p-2 rounded-md text-white hover:bg-blue-700 transition-colors"
            >
              {isDark ? (
                <Sun className="w-6 h-6" />
              ) : (
                <Moon className="w-6 h-6" />
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-white hover:bg-blue-700 transition-colors"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div
            className={`md:hidden absolute left-0 right-0 pt-2 pb-3 px-4 space-y-1 shadow-lg ${
              isDark ? "bg-gray-800" : "bg-blue-600"
            }`}
          >
            {user ? (
              <>
                <NavLink to="/" onClick={() => setIsOpen(false)}>
                  Home
                </NavLink>
                <NavLink to="/profile" onClick={() => setIsOpen(false)}>
                  Profile
                </NavLink>
                <NavButton
                  onClick={() => {
                    toggleTheme();
                    setIsOpen(false);
                  }}
                >
                  {isDark ? "Light Mode" : "Dark Mode"}
                </NavButton>
                <NavButton onClick={handleLogout}>Logout</NavButton>
              </>
            ) : (
              <>
                <NavLink to="/login" onClick={() => setIsOpen(false)}>
                  Login
                </NavLink>
                <NavButton
                  onClick={() => {
                    toggleTheme();
                    setIsOpen(false);
                  }}
                >
                  {isDark ? "Light Mode" : "Dark Mode"}
                </NavButton>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

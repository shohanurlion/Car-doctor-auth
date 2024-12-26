import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Logoimg from "../../../public/images/banner/Group 2.svg";
import { AuthContext } from "../../Providers/AuthProviders";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, singOutuser } = useContext(AuthContext);

  const singouthandelr = () => {
    // Show confirmation dialog
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log me out!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Log the user out only if they confirm
        singOutuser()
          .then(() => {
            Swal.fire("Logged Out!", "You have been logged out.", "success");
          })
          .catch((error) => console.log("ERROR", error.message));
      }
    });
  };

  return (
    <nav className="flex items-center justify-between py-4 px-8 bg-white shadow">
      {/* Logo Section */}
      <div className="flex items-center space-x-2">
        <img
          src={Logoimg}
          alt="Car Doctor Logo"
          className="w-[60px] h-[60px]"
        />
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex space-x-6">
        <Link to="/" className="text-gray-600 hover:text-orange-500 font-medium">
          Home
        </Link>
        <Link
          to="/about"
          className="text-gray-600 hover:text-orange-500 font-medium"
        >
          About
        </Link>
        <Link
          to="/service"
          className="text-gray-600 hover:text-orange-500 font-medium"
        >
          Services
        </Link>
        <Link
          to="/blog"
          className="text-gray-600 hover:text-orange-500 font-medium"
        >
          Blog
        </Link>
        <Link
          to="/contact"
          className="text-gray-600 hover:text-orange-500 font-medium"
        >
          Contact
        </Link>
      </div>

      {/* Icons and Button */}
      <div className="flex items-center space-x-4">
        <div>
          {user ? (
            <>
              <span>{user.email}</span>
              <Link to='/booking'>
              <button className="btn cursor-pointer ml-4">Booking</button>
              </Link>
              <a onClick={singouthandelr} className="btn cursor-pointer ml-4">
                Sign Out
              </a>
            </>
          ) : (
            <Link to="/loging">Login</Link>
          )}
        </div>
        <button className="px-4 py-2 text-orange-500 border border-orange-500 rounded hover:bg-orange-500 hover:text-white">
          Appointment
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

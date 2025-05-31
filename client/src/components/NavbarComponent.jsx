import React from "react";
import LogoImg from "../assets/logo.png";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import toast from "react-hot-toast";
import axios from "axios";

const NavbarComponent = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      toast.success('Logged out successfully!');
      navigate('/signin');
    } catch (error) {
      toast.error(error);
    }
  };

  const getUserInfo = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.refresh_token;
    if (!token) throw new Error("No token found");
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.get(API_URL + "/user-infor", config);
    return response.data;
  }

  return (
    <nav className="flex w-full justify-between items-center bg-green-100 shadow-md py-3 px-10">
      {/* Logo */}
      <Link to="/">
        <div className="flex gap-1 justify-center items-center cursor-pointer">
          <img src={LogoImg} alt="logo-image" className="h-6 w-6" />
          <p className="text-lg font-semibold text-green-600 hover:text-green-700 transition ease-in-out">
            ToDoSome
          </p>
        </div>
      </Link>

      {/* Navigation Menu */}
      <div className="flex gap-6 justify-center items-center text-green-900 font-semibold">
        <Link to="/" className="text-sm hover:underline">
          My ToDo
        </Link>
        {user ? (
          <div className="flex items-center gap-3">
            <a
              href="/user-info"
              className="bg-green-200 text-green-900 text-sm py-2 px-4 rounded-md hover:bg-green-300 transition ease-in-out"
            >
              My Profile
            </a>
            {user.photoURL ? (
              <img
                src={user?.photoURL}
                alt="profile"
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-green-800 text-white flex items-center justify-center font-semibold">
                {user && user.email ? user.email.charAt(0).toUpperCase() : ''}
              </div>
            )}
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white text-sm py-2 px-4 rounded-md hover:bg-red-500 transition ease-in-out"
            >
              Logout
            </button>
          </div>
        ) : (
          <a
            href="/signin"
            className="bg-green-800 text-white text-sm py-2 px-6 rounded-md hover:bg-green-700 transition ease-in-out"
          >
            Login
          </a>
        )}
      </div>
    </nav>
  );
};

export default NavbarComponent;

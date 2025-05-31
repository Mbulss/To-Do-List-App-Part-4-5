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
    <div className="navbar bg-base-100 shadow-md px-4">
      <div className="flex-1 flex items-center gap-2">
        <img src={LogoImg} alt="logo-image" className="h-6 w-6" />
        <span className="font-bold text-xl text-green-900">ToDoSome</span>
      </div>
      <div className="flex-none flex items-center gap-2">
        <Link to="/" className="bg-green-600 text-white p-2 rounded-md hover:bg-green-700 transition font-medium">My ToDo</Link>
        {user ? (
          <>
            <Link to="/user-info" className="bg-green-600 text-white p-2 rounded-md hover:bg-green-700 transition font-medium">My Profile</Link>
            {user.photoURL ? (
              <div className="avatar">
                <div className="w-8 rounded-full">
                  <img src={user?.photoURL} alt="profile" />
                </div>
              </div>
            ) : (
              <div className="avatar placeholder">
                <div className="bg-neutral text-neutral-content rounded-full w-8">
                  <span className="text-xs">{user && user.email ? user.email.charAt(0).toUpperCase() : ''}</span>
                </div>
              </div>
            )}
            <button
              onClick={handleLogout}
              className="btn btn-outline btn-error btn-sm ml-2"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/signin" className="bg-green-600 text-white p-2 rounded-md hover:bg-green-700 transition">Login</Link>
        )}
      </div>
    </div>
  );
};

export default NavbarComponent;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../features/auth/authSlice";

const UserInfoComponent = () => {
  const dispatch = useDispatch();
  const { user, isLoading, isError, message } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  if (isLoading) return <div>Loading user info...</div>;
  if (isError) return <div className="text-red-500">Error: {message}</div>;
  if (!user) return <div>No user info available.</div>;

  return (
    <div className="bg-white rounded-md shadow-md p-6 max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">User Information</h2>
      <div className="flex flex-col gap-2">
        <div><strong>Name:</strong> {user.name}</div>
        <div><strong>Email:</strong> {user.email}</div>
        <div><strong>Personal ID:</strong> {user.personal_id}</div>
        <div><strong>Address:</strong> {user.address}</div>
        <div><strong>Phone Number:</strong> {user.phone_number}</div>
      </div>
    </div>
  );
};

export default UserInfoComponent; 
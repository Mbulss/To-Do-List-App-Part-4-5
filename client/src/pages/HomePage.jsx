import React from "react";
import AddTaskComponent from "../components/AddTaskComponent";
import MyTaskComponent from "../components/MyTaskComponent";

const HomePage = () => {
  return (
    <div className="min-h-[90vh] flex items-center justify-center">
      <div className="card w-full max-w-6xl bg-base-100 shadow-2xl p-8 border border-base-200">
        <div className="flex flex-col md:flex-row gap-8 w-full bg-green-100 rounded-xl p-8">
          {/* add task component */}
          <AddTaskComponent />

          {/* my task component */}
          <div className="flex flex-col gap-3 flex-1">
            <h1 className="text-green-900 font-semibold text-lg mb-2">My Tasks</h1>
            <MyTaskComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

import React, { useState } from "react";
import toast from "react-hot-toast";
import { useTodo } from "../context/TodoContext";

const AddTaskComponent = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const { addTodo } = useTodo();

  const handleAddTask = async (e) => {
    e.preventDefault();
    
    if (!taskTitle.trim()) {
      toast.error("Please enter a task title");
      return;
    }

    try {
      setLoading(true);
      const todoData = {
        todo_name: taskTitle,
        todo_desc: taskDesc,
        todo_image: `https://api.dicebear.com/9.x/icons/svg?seed=${taskTitle}`,
        todo_status: "active"
      };

      await addTodo(todoData);
      toast.success("Task added successfully!");
      setTaskTitle("");
      setTaskDesc("");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card w-full max-w-xs bg-base-100 shadow-xl border border-base-200">
      <div className="card-body">
        <h1 className="card-title text-green-900">Add Your Task</h1>
        <form onSubmit={handleAddTask} className="flex flex-col gap-3 mt-2">
          <input
            type="text"
            id="taskTitle"
            placeholder="Task Title..."
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            className="input input-bordered w-full"
          />

          <textarea
            id="taskDesc"
            cols="30"
            rows="6"
            value={taskDesc}
            onChange={(e) => setTaskDesc(e.target.value)}
            className="textarea textarea-bordered w-full"
            placeholder="Write your task here..."
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white p-2 rounded-md hover:bg-green-700 transition w-full mt-2"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTaskComponent;

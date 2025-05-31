import React, { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import toast from "react-hot-toast";
import { useTodo } from "../context/TodoContext";

const MyTaskComponent = () => {
  const { tasks, loading, updateTodo, deleteTodo } = useTodo();
  const [selectedTask, setSelectedTask] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");

  const handleEdit = (task) => {
    setSelectedTask(task);
    setUpdatedTitle(task.todo_name);
    setUpdatedDescription(task.todo_desc);
    document.getElementById("update-modal").showModal();
  };

  const handleUpdateTask = async () => {
    try {
      if (!selectedTask) return;

      const updatedData = {
        todo_name: updatedTitle,
        todo_desc: updatedDescription,
        todo_image: selectedTask.todo_image,
        todo_status: selectedTask.todo_status
      };

      await updateTodo(selectedTask._id, updatedData);
      toast.success("Task updated successfully!");
      document.getElementById("update-modal").close();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await deleteTodo(taskId);
      toast.success("Task deleted successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      {loading && <p className="text-gray-600">Loading tasks...</p>}

      {!loading && tasks.length === 0 && (
        <p className="text-gray-500">No tasks available.</p>
      )}

      {!loading &&
        tasks.map((task) => (
          <div
            key={task._id}
            className="flex flex-col gap-2 mt-2 p-3 text-white bg-green-700 rounded-md shadow-md"
          >
            <h1 className="text-xl font-semibold mb-2">{task.todo_name}</h1>
            <p className="text-sm text-gray-100">{task.todo_desc}</p>

            <div className="flex w-full justify-end items-center gap-4 mt-4">
              <button
                className="btn btn-primary text-white flex gap-1 px-3"
                onClick={() => handleEdit(task)}
              >
                <FaRegEdit className="text-base" />
                Edit
              </button>

              <button
                className="btn btn-error bg-red-600 text-white flex gap-1 px-3"
                onClick={() => handleDelete(task._id)}
              >
                <MdDeleteOutline className="text-lg" />
                Delete
              </button>
            </div>
          </div>
        ))}

      {/* Modal Popup for Update Task (DaisyUI component) */}
      <dialog id="update-modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Update Task</h3>
          <div className="py-4">
            <label className="block text-gray-700 font-medium">Title</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />

            <label className="block text-gray-700 font-medium mt-3">
              Description
            </label>
            <textarea
              className="textarea textarea-bordered w-full"
              value={updatedDescription}
              onChange={(e) => setUpdatedDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="modal-action">
            <button
              className="btn btn-primary text-white"
              onClick={handleUpdateTask}
            >
              Save Changes
            </button>
            <button
              className="btn"
              onClick={() => document.getElementById("update-modal").close()}
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MyTaskComponent;

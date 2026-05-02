import Sidebar from "../components/Sidebar";

import { useEffect, useState } from "react";

import {
  getTasks,
  createTask,
} from "../services/authService";

function Tasks() {
  const workspace = JSON.parse(
    localStorage.getItem("workspace")
  );

  const [tasks, setTasks] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignedTo: "",
    priority: "Medium",
  });

  const fetchTasks = async () => {
    try {
      const data = await getTasks();

      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();

    try {
      const taskData = {
        ...formData,
        workspaceName: workspace?.name,
      };

      await createTask(taskData);

      setShowForm(false);

      setFormData({
        title: "",
        description: "",
        assignedTo: "",
        priority: "Medium",
      });

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const updateTaskStatus = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task._id === taskId) {
        return {
          ...task,
          status:
            task.status === "Pending"
              ? "In Progress"
              : task.status === "In Progress"
              ? "Completed"
              : "Completed",
        };
      }

      return task;
    });

    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter(
    (task) =>
      task.workspaceName === workspace?.name
  );

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-8 bg-gray-100 min-h-screen">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">
              {workspace?.name} Tasks
            </h1>

            <p className="text-gray-500 mt-2">
              Role: {workspace?.role}
            </p>
          </div>

          {workspace?.role === "Admin" && (
            <button
              onClick={() =>
                setShowForm(!showForm)
              }
              className="bg-gray-900 text-white px-5 py-3 rounded-xl hover:bg-black transition"
            >
              + Add Task
            </button>
          )}
        </div>

        {showForm && (
          <form
            onSubmit={handleCreateTask}
            className="bg-white p-6 rounded-2xl shadow mb-8 space-y-4"
          >
            <input
              type="text"
              name="title"
              placeholder="Task Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl"
            />

            <textarea
              name="description"
              placeholder="Task Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl"
            />

            <input
              type="text"
              name="assignedTo"
              placeholder="Assigned To"
              value={formData.assignedTo}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl"
            />

            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl"
            >
              <option>Low</option>

              <option>Medium</option>

              <option>High</option>
            </select>

            <button className="bg-black text-white px-5 py-3 rounded-xl">
              Create Task
            </button>
          </form>
        )}

        <div className="grid gap-6">
          {filteredTasks.map((task) => (
            <div
              key={task._id}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-semibold">
                    {task.title}
                  </h2>

                  <p className="text-gray-500 mt-2">
                    {task.description}
                  </p>
                </div>

                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                  {task.status}
                </span>
              </div>

              <div className="flex items-center justify-between mt-6">
                <div>
                  <p className="text-sm text-gray-500">
                    Assigned To
                  </p>

                  <h4 className="font-medium">
                    {task.assignedTo}
                  </h4>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Priority
                  </p>

                  <h4 className="font-medium text-red-500">
                    {task.priority}
                  </h4>
                </div>
              </div>

              <button
                onClick={() =>
                  updateTaskStatus(task._id)
                }
                className="mt-6 bg-black text-white px-4 py-2 rounded-xl"
              >
                Update Status
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Tasks;
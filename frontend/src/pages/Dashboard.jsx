import Sidebar from "../components/Sidebar";

import { useEffect, useState } from "react";

import { getTasks } from "../services/authService";

function Dashboard() {
  const workspace = JSON.parse(
    localStorage.getItem("workspace")
  );

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await getTasks();

      const filteredTasks = data.filter(
        (task) =>
          task.workspaceName === workspace?.name
      );

      setTasks(filteredTasks);
    } catch (error) {
      console.log(error);
    }
  };

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  );

  const pendingTasks = tasks.filter(
    (task) => task.status !== "Completed"
  );

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-8 bg-gray-100 min-h-screen">
        <h1 className="text-4xl font-bold mb-2">
          {workspace?.name} Dashboard
        </h1>

        <p className="text-gray-500 mb-8">
          Role: {workspace?.role}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-gray-500">
              Total Tasks
            </h2>

            <p className="text-4xl font-bold mt-4">
              {tasks.length}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-gray-500">
              Completed
            </h2>

            <p className="text-4xl font-bold mt-4 text-green-600">
              {completedTasks.length}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-gray-500">
              Pending
            </h2>

            <p className="text-4xl font-bold mt-4 text-red-500">
              {pendingTasks.length}
            </p>
          </div>
        </div>

        <div className="bg-white mt-10 p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-semibold mb-5">
            Recent Tasks
          </h2>

          <div className="space-y-4">
            {tasks.slice(0, 5).map((task) => (
              <div
                key={task._id}
                className="flex items-center justify-between border-b pb-3"
              >
                <div>
                  <h3 className="font-semibold">
                    {task.title}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {task.priority} Priority
                  </p>
                </div>

                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                  {task.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
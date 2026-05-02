import { useState, useEffect } from "react";

import Sidebar from "../components/Sidebar";

import { useNavigate } from "react-router-dom";

import {
  FaUsers,
  FaTasks,
  FaPlus,
} from "react-icons/fa";

function Workspaces() {
  const navigate = useNavigate();

  const [workspaces, setWorkspaces] = useState([]);

  const [workspaceName, setWorkspaceName] =
    useState("");

  useEffect(() => {
    const savedWorkspaces =
      JSON.parse(
        localStorage.getItem("workspaces")
      ) || [];

    setWorkspaces(savedWorkspaces);
  }, []);

  const createWorkspace = () => {
    if (!workspaceName) return;

    const newWorkspace = {
      name: workspaceName,
      role: "Admin",
      tasks: 0,
      members: 1,
    };

    const updatedWorkspaces = [
      ...workspaces,
      newWorkspace,
    ];

    setWorkspaces(updatedWorkspaces);

    localStorage.setItem(
      "workspaces",
      JSON.stringify(updatedWorkspaces)
    );

    setWorkspaceName("");
  };

  const openWorkspace = (workspace) => {
    localStorage.setItem(
      "workspace",
      JSON.stringify(workspace)
    );

    navigate("/dashboard");
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-8 bg-gray-100 min-h-screen">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-bold">
              Workspaces
            </h1>

            <p className="text-gray-500 mt-2">
              Manage your teams and projects
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow mb-10">
          <div className="flex items-center gap-3 mb-5">
            <FaPlus />

            <h2 className="text-2xl font-semibold">
              Create Workspace
            </h2>
          </div>

          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Workspace Name"
              value={workspaceName}
              onChange={(e) =>
                setWorkspaceName(e.target.value)
              }
              className="flex-1 border p-3 rounded-xl"
            />

            <button
              onClick={createWorkspace}
              className="bg-black text-white px-6 rounded-xl"
            >
              Create
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {workspaces.map((workspace, index) => (
            <div
              key={index}
              onClick={() =>
                openWorkspace(workspace)
              }
              className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition cursor-pointer border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">
                  {workspace.name}
                </h2>

                <span className="bg-black text-white text-sm px-3 py-1 rounded-full">
                  {workspace.role}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-gray-100 p-4 rounded-xl">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaTasks />

                    <p className="text-sm">
                      Tasks
                    </p>
                  </div>

                  <h3 className="text-2xl font-bold mt-2">
                    {workspace.tasks}
                  </h3>
                </div>

                <div className="bg-gray-100 p-4 rounded-xl">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaUsers />

                    <p className="text-sm">
                      Members
                    </p>
                  </div>

                  <h3 className="text-2xl font-bold mt-2">
                    {workspace.members}
                  </h3>
                </div>
              </div>
            </div>
          ))}

          {workspaces.length === 0 && (
            <div className="bg-white p-10 rounded-2xl shadow text-center col-span-full">
              <h2 className="text-2xl font-bold">
                No Workspaces Yet
              </h2>

              <p className="text-gray-500 mt-3">
                Create your first workspace
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Workspaces;
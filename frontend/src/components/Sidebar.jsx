import { Link, useLocation } from "react-router-dom";

import {
  FaTasks,
  FaChartPie,
  FaSignOutAlt,
  FaLayerGroup,
} from "react-icons/fa";

function Sidebar() {
  const location = useLocation();

  const workspace = JSON.parse(
    localStorage.getItem("workspace")
  );

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const menuItems = [
    {
      name: "Workspaces",
      path: "/workspaces",
      icon: <FaLayerGroup />,
    },
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaChartPie />,
    },
    {
      name: "Tasks",
      path: "/tasks",
      icon: <FaTasks />,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    localStorage.removeItem("workspace");

    window.location.href = "/";
  };

  return (
    <div className="w-64 min-h-screen bg-gray-950 text-white p-6">
      <h1 className="text-3xl font-bold mb-10 tracking-wide">
        TaskFlow
      </h1>

      <div className="bg-gray-900 p-4 rounded-2xl mb-8">
        <h2 className="font-semibold text-lg">
          {workspace?.name || "No Workspace"}
        </h2>

        <p className="text-gray-400 text-sm mt-1">
          {workspace?.role}
        </p>

        <div className="mt-4 border-t border-gray-700 pt-4">
          <p className="text-sm text-gray-400">
            Logged In As
          </p>

          <h3 className="font-medium mt-1">
            {user?.name}
          </h3>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
              location.pathname === item.path
                ? "bg-white text-black"
                : "hover:bg-gray-800"
            }`}
          >
            {item.icon}

            <span>{item.name}</span>
          </Link>
        ))}

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-800 transition mt-8 text-left"
        >
          <FaSignOutAlt />

          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
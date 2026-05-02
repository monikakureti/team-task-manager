import axios from "axios";

const AUTH_API =
  "https://team-task-manager-production-f53f.up.railway.app/api/auth";

const TASK_API =
  "https://team-task-manager-production-f53f.up.railway.app/api/tasks";

export const registerUser = async (userData) => {
  const response = await axios.post(
    `${AUTH_API}/register`,
    userData
  );

  return response.data;
};

export const loginUser = async (userData) => {
  const response = await axios.post(
    `${AUTH_API}/login`,
    userData
  );

  return response.data;
};

export const createTask = async (
  taskData,
  token
) => {
  const response = await axios.post(
    TASK_API,
    taskData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getTasks = async (token) => {
  const response = await axios.get(TASK_API, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
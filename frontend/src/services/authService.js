import axios from "axios";

const AUTH_API = "http://localhost:5000/api/auth";

const TASK_API = "http://localhost:5000/api/tasks";

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

export const getTasks = async () => {
  const response = await axios.get(TASK_API);

  return response.data;
};

export const createTask = async (taskData) => {
  const response = await axios.post(
    TASK_API,
    taskData
  );

  return response.data;
};
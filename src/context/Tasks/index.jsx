import { createContext, useContext, useState } from "react";
import {
  createTaskRequest,
  completeTaskRequest,
  deleteTaskRequest,
  getTaskRequest,
  getTasksRequest,
  updateTaskRequest,
} from "../../api/tasks";
const TaskContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useTasks = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTask must be used within a TaskProvider");
  }
  return context;
};

// eslint-disable-next-line react/prop-types
export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [tasksCopy, setTasksCopy] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const createTask = async (task) => {
    try {
      createTaskRequest(task);
    } catch (error) {
      throw new Error(error.response.data);
    }
  };

  const getCategories = async () => {
    try {
      setIsLoading(true);
      const res = await getTasks();

      const categoriesArray = Array.from(
        new Set(res?.map((task) => task.category))
      );

      setCategories([...categoriesArray]);
      setIsLoading(false);
      return;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const getTasks = async () => {
    try {
      setIsLoading(true);
      const res = await getTasksRequest();

      setTasks(res.data?.sort((a, b) => a.isCompleted - b.isCompleted));
      setTasksCopy(res.data?.sort((a, b) => a.isCompleted - b.isCompleted));
      setIsLoading(false);
      return res.data;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const getTaskById = async (id) => {
    try {
      const res = await getTaskRequest(id);
      return res.data;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const completeTask = async (id) => {
    try {
      setIsLoading(true);
      await completeTaskRequest(id);
      const res = await getTasksRequest();

      setTasks(res.data);
      setIsLoading(false);
      return;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      setIsLoading(true);
      await deleteTaskRequest(id);
      const res = await getTasksRequest();

      setTasks(res.data);
      setIsLoading(false);
      return;
    } catch (error) {
      throw new Error(error.response.data);
    }
  };

  const updateTask = async (id, task) => {
    try {
      await updateTaskRequest(id, task);
      return;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const logTaskOut = () => {
    setCategories([]);
    setTasksCopy([]);
    setTasks([]);
    return;
  };

  const filterTasks = async (category) => {
    const copy = tasks.filter((task) => task.category === category);

    return setTasksCopy(category === "All" ? tasks : copy);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        createTask,
        getTasks,
        completeTask,
        deleteTask,
        getTaskById,
        updateTask,
        logTaskOut,
        setCategories,
        categories,
        getCategories,
        filterTasks,
        tasksCopy,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

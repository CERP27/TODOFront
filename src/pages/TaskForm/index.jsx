/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useTasks } from "../../context";

export const TaskForm = () => {
  const { register, handleSubmit, setValue } = useForm();

  const { createTask, getTaskById, updateTask, isLoading } = useTasks();

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const loadTask = async () => {
      if (id) {
        const task = await getTaskById(id);

        setValue("title", task.title);
        setValue("description", task.description);
        setValue("category", task.category);
      }
    };
    loadTask();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    if (id) {
      await updateTask(id, data);
    } else {
      await createTask(data);
    }
    !isLoading && navigate("/tasks");
  });

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-8 rounded-md">
        <h1 className="flex text-4xl font-bold py-2 justify-center">
          New Task
        </h1>

        <form onSubmit={onSubmit}>
          <label htmlFor="title" className=" text-lg">
            Title
          </label>
          <input
            type="text"
            placeholder="Title"
            {...register("title")}
            autoFocus
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          />

          <label htmlFor="description" className=" text-lg">
            Description
          </label>
          <textarea
            rows="3"
            placeholder="Description"
            {...register("description")}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          ></textarea>

          <label htmlFor="category" className=" text-lg">
            Category
          </label>
          <input
            type="text"
            {...register("category")}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          />

          <button className=" bg-indigo-500 px-3 py-2 rounded-md">Save</button>
        </form>
      </div>
    </div>
  );
};

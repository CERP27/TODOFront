/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { useTasks } from "../../context";
import { Link } from "react-router-dom";

export const TaskCard = ({ task }) => {
  const { _id, title, description, category, isCompleted } = task;
  const { deleteTask, completeTask } = useTasks();

  const handleDelete = (_event, id) => {
    deleteTask(id);
  };

  const handleComplete = (_event, id) => {
    completeTask(id);
  };
  const completedClassName = isCompleted
    ? "bg-blue-500 max-w-md w-full text-bold  p-10 rounded-lg"
    : "bg-red-200 text-black text-bold max-w-md w-full  p-10 rounded-lg";

  return (
    <div className={completedClassName}>
      <header className="flex justify-between gap-x-12">
        <h1 className=" text-xl text-justify font-bold">
          {title[0].toUpperCase() + title.slice(1)}
        </h1>
        <div>
          <form className="grid grid-cols-3 gap 2">
            <button
              onClick={(event) => {
                handleDelete(event, _id);
              }}
              className=" rounded-md p-1"
            >
              ❌
            </button>
            <button
              onClick={(event) => {
                handleComplete(event, _id);
              }}
              className=" rounded-md p-1"
            >
              ✅
            </button>
            <Link to={`/edit/${task._id}`} className=" rounded-md p-1">
              ✏️
            </Link>
          </form>
        </div>
      </header>
      <p className=" font-bold">
        {description[0].toUpperCase() + description.slice(1)}
      </p>
      <p className=" font-bold">
        Catergory: {category[0].toUpperCase() + category.slice(1)}
      </p>
      <p className=" font-bold">{isCompleted ? "Completed" : "Uncompleted"}</p>
    </div>
  );
};

import { useEffect } from "react";
import { useTasks } from "../../context";
import { TaskCard } from "../../components";

export const Tasks = () => {
  const { tasksCopy, getCategories, isLoading } = useTasks();

  useEffect(() => {
    getCategories();
  }, []);

  if (isLoading === false && tasksCopy.length === 0)
    return (
      <div>
        <h1 className="text-4xl">No tasks registered</h1>
      </div>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2  gap-4 lg:grid-cols-3  ">
      {tasksCopy?.map((task) => (
        <div key={task.id}>
          <TaskCard task={task} key={task.id} />
        </div>
      ))}
    </div>
  );
};

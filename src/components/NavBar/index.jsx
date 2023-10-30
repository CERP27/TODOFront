import { Link, useLocation } from "react-router-dom";
import { useAuth, useTasks } from "../../context";

export const NavBar = () => {
  const { isAuthenticated, logOut, user } = useAuth();
  const { getTasks, logTaskOut, categories, filterTasks } = useTasks();
  const { pathname } = useLocation();

  const handleSelect = async (event) => {
    event.target.value === "All"
      ? await getTasks()
      : await filterTasks(event.target.value);
  };

  return (
    <nav className=" bg-zinc-700 my-3 flex flex-col gap-y-5 md:grid grid-cols-4 gap-x-20  items-center py-4 px-10 rounded-lg">
      <h1 className=" text-2xl font-bold">TODO App</h1>
      {isAuthenticated ? (
        <p className="text-xl font-bold">
          Welcome {user.username[0].toUpperCase() + user.username.slice(1)}
        </p>
      ) : null}

      <div>
        <ul>
          {isAuthenticated ? (
            <div className="flex items-center gap-x-2">
              <li></li>
              {!pathname.includes("add") && !pathname.includes("edit") ? (
                <>
                  <li>
                    <Link
                      to={"/add-task"}
                      className=" bg-amber-300 px-4 py-2 rounded-md"
                    >
                      ➕
                    </Link>
                  </li>
                  <li>
                    <div>
                      {categories.length > 0 ? (
                        <select
                          onChange={handleSelect}
                          name="Categories"
                          className=" text-black px-2 py-2 rounded-md"
                        >
                          <option selected disabled>
                            Filter by categories
                          </option>
                          {categories.map((category, i) => (
                            <option value={category} key={i}>
                              {category[0].toUpperCase() + category.slice(1)}
                            </option>
                          ))}
                          <option value="All">All</option>
                        </select>
                      ) : null}
                    </div>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      to={"/tasks"}
                      className=" bg-indigo-500 px-4 py-2 rounded-md"
                    >
                      📝
                    </Link>
                  </li>
                </>
              )}
              <li>
                <Link
                  to={"/"}
                  onClick={() => {
                    logOut();
                    logTaskOut();
                  }}
                  className=" bg-sky-500 px-4 py-2 rounded-md"
                >
                  🔓
                </Link>
              </li>
            </div>
          ) : null}
        </ul>
      </div>
    </nav>
  );
};

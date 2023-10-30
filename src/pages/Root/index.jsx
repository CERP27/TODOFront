import { Outlet } from "react-router-dom";
import { NavBar } from "../../components";
// import { NavBar } from "../../components";

export const Root = () => {
  return (
    <main className="container mx-auto p-5">
      <NavBar />
      <div>
        <Outlet />
      </div>
    </main>
  );
};

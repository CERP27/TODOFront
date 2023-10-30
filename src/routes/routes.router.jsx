import { createBrowserRouter } from "react-router-dom";

import {
  Root,
  Register,
  Login,
  NoRoute,
  TaskForm,
  Tasks,
  ProtectedRoute,
} from "../pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NoRoute />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/tasks",
            element: <Tasks />,
          },
          {
            path: "/add-task",
            element: <TaskForm />,
          },
          {
            path: "/edit/:id",
            element: <TaskForm />,
          },
        ],
      },
    ],
  },
]);

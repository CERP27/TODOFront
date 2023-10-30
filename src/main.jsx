// import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { router } from "./routes/routes.router";
import { RouterProvider } from "react-router-dom";
import { AuthProvider, TaskProvider } from "./context";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <TaskProvider>
      <RouterProvider router={router} />
    </TaskProvider>
  </AuthProvider>
);

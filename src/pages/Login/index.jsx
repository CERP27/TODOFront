import { useForm } from "react-hook-form";
import { useAuth } from "../../context";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const { signin, errors: LoginErrors, isAuthenticated } = useAuth();

  const onSubmit = handleSubmit(async (data) => {
    await signin(data);
  });

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated, navigate]);

  return (
    <div className=" flex h-[calc(100vh-100px)] items-center justify-center">
      <div className=" bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <h1 className=" text-4xl my-1 font-bold">Login</h1>
        {LoginErrors.map((error, i) => (
          <div
            key={i}
            className=" bg-red-500 p-2 my-2 text-white text-center rounded-md"
          >
            {error}
          </div>
        ))}
        <form onSubmit={onSubmit}>
          <input
            type="email"
            {...register("email", { required: true })}
            className=" w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Email"
          />
          {errors.email && <p className=" text-red-500">Email is required</p>}
          <input
            type="password"
            {...register("password", { required: true })}
            className=" w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Password"
          />
          {errors.password && (
            <p className=" text-red-500">password is required</p>
          )}

          <button type="submit" className=" my-2 p-2 bg-indigo-500 rounded-md">
            Login
          </button>
        </form>
        <p className="my-8 flex gap-x-2 justify-between">
          Don&apos;t have an account?{" "}
          <Link to="/register" className=" text-indigo-500">
            Sign Up
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

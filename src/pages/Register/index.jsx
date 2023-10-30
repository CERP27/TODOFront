import { useForm } from "react-hook-form";

import { useAuth } from "../../context";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, isAuthenticated, errors: RegisterErrors } = useAuth();

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated, navigate]);

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  return (
    <div className=" flex h-[calc(100vh-100px)] items-center justify-center">
      <div className=" bg-zinc-800 max-w-md  my-10 p-10 rounded-md">
        <h1 className=" text-4xl my-1 font-bold">Register</h1>
        {RegisterErrors.map((error, i) => (
          <div key={i} className=" bg-red-500 p-2 my-2 text-white rounded-md">
            {error}
          </div>
        ))}
        <form onSubmit={onSubmit}>
          <input
            type="text"
            {...register("username", { required: true })}
            className=" w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Username"
          />
          {errors.username && (
            <p className=" text-red-500">Username is required</p>
          )}

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
            Create account
          </button>
        </form>
        <p className="my-8 flex gap-x-2 justify-between">
          Already have an account?{" "}
          <Link to="/" className=" text-indigo-500">
            Sign In
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button, Loading, Textbox } from "../components";
import {
  useLoginMutation,
  useRegisterMutation,
} from "../redux/slices/api/authApiSlice";
import { setCredentials } from "../redux/slices/authSlice";
import { useEffect } from "react";

const Register = () => {
  const { user } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [createAccount, { isLoading }] = useRegisterMutation();

  const handleOnSubmit = async (data) => {
    try {
      const newData = {
        ...data,
        title: "Admin",
        role: "Admin",
        isAdmin: false,
      };
      console.log(data, newData);
      const res = await createAccount(newData).unwrap();

      dispatch(setCredentials(res));
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    user && navigate("/dashboard");
  }, [user]);

  return (
    <div className="w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6] dark:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#302943] via-slate-900 to-black">
      <div className="flex flex-col items-center justify-center w-full gap-0 md:w-auto md:gap-40 md:flex-row">
        <div className="flex flex-col items-center justify-center w-full h-full lg:w-2/3">
          <div className="flex flex-col items-center justify-center w-full gap-5 md:max-w-lg 2xl:max-w-3xl md:gap-y-10 2xl:-mt-20">
            <span className="flex gap-1 px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded-full md:text-base dark:border-gray-700 dark:text-blue-400">
              Manage all your task in one place!
            </span>
            <p className="flex flex-col gap-0 text-4xl font-black text-center text-blue-700 md:gap-4 md:text-6xl 2xl:text-7xl dark:text-gray-400">
              <span>Cloud-based</span>
              <span>Task Manager</span>
            </p>

            <div className="cell">
              <div className="circle rotate-in-up-left"></div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center w-full p-4 md:w-1/3 md:p-1">
          <form
            onSubmit={handleSubmit(handleOnSubmit)}
            className="form-container w-full md:w-[400px] flex flex-col gap-y-8 bg-white dark:bg-slate-900 px-10 py-8"
          >
            <div>
              <p className="text-3xl font-bold text-center text-blue-600">
                Create Account
              </p>
              <p className="text-base text-center text-gray-700 dark:text-gray-500">
                Create account to continue
              </p>
            </div>
            <div className="flex flex-col gap-y-3">
              <Textbox
                placeholder="you@example.com"
                type="text"
                name="name"
                label="Full Name"
                className="w-full rounded-lg"
                register={register("name", {
                  required: "Name is required!",
                })}
                error={errors.name ? errors.name.message : ""}
              />
              <Textbox
                placeholder="you@example.com"
                type="email"
                name="email"
                label="Email Address"
                className="w-full rounded-lg"
                register={register("email", {
                  required: "Email Address is required!",
                })}
                error={errors.email ? errors.email.message : ""}
              />
              <Textbox
                placeholder="password"
                type="password"
                name="password"
                label="Password"
                className="w-full rounded-lg"
                register={register("password", {
                  required: "Password is required!",
                })}
                error={errors.password ? errors.password?.message : ""}
              />
            </div>
            {isLoading ? (
              <Loading />
            ) : (
              <Button
                type="submit"
                label="Register"
                className="w-full h-10 text-white bg-blue-700 rounded-lg"
              />
            )}

            <div className="text-center">
              <span className="text-base text-gray-600">
                Already have an account?{" "}
              </span>
              <Link to="/log-in" className="font-semibold">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

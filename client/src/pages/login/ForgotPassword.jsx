import { useState } from "react";
import AuthLayout from "../../components/authLayout/AuthLayout";
import { useForm} from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export const ForgotPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const submitHandler = (data) => {
    const { password, confirmPassword } = data;
    // mutate({ email, password });
  };

  const password = watch("password");

  return (
    <AuthLayout>
      <div className=" mx-auto my-10 bg-white p-12 rounded-2xl shadow-lg max-w-2xl lg:max-w-3xl font-roboto">
        <div>
          <h2 className=" text-2xl sm:text-3xl mb-1  font-semibold font-roboto text-center">
            Enter Your New Password
          </h2>
          <p className="text-xs text-[#959595] font-roboto mx-auto text-center">
            please choose the new password
          </p>
        </div>

        <form onSubmit={handleSubmit(submitHandler)} className="my-8 mx-4 ">
          <div className="flex flex-col space-y-5">
            <div>
              <div className="relative">
                <label
                  htmlFor="password"
                  className="block text-gray-700 text-sm font-semibold"
                >
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Password is required",
                    },
                    minLength: {
                      value: 6,
                      message: "Password length must be at least 6 characters",
                    },
                  })}
                  placeholder="Enter Password"
                  className={`font-roboto text-sm placeholder:text-sm placeholder:font-roboto w-full pl-4 pr-9 py-3 rounded-lg bg-gray-200 mt-2 border
                    focus:bg-white focus:outline-none ${
                      errors.password ? "border-red-500" : "border-[#c3cad9]"
                    } `}
                />
                {errors.password?.message && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.password?.message}
                  </p>
                )}
                <div
                  className="icon_button absolute right-2 top-[38px] opacity-80"
                  onClick={handleShowPassword}
                >
                  {showPassword ? (
                    <AiOutlineEye className="h-7 text-2xl text-gray-500 font-extralight" />
                  ) : (
                    <AiOutlineEyeInvisible className="h-7 text-2xl text-gray-500 font-extralight" />
                  )}
                </div>
              </div>
              {/* ---------------------- */}
              <div className="mt-4 relative">
                <label
                  htmlFor="confirmPassword"
                  className="block text-gray-700 text-sm font-semibold"
                >
                  Confirm Password
                </label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  {...register("confirmPassword", {
                    required: {
                      value: true,
                      message: "Confirm password is required",
                    },
                    validate: (value) => {
                      if (value !== password) {
                        return "Passwords do not match";
                      }
                    },
                  })}
                  placeholder="Enter Confirm Password"
                  className={`font-roboto text-sm placeholder:text-sm placeholder:font-roboto w-full pl-4 pr-9 py-3 rounded-lg bg-gray-200 mt-2 border
                    focus:bg-white focus:outline-none ${
                      errors.confirmPassword
                        ? "border-red-500"
                        : "border-[#c3cad9]"
                    } `}
                />
                {errors.confirmPassword?.message && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.confirmPassword?.message}
                  </p>
                )}
                <div
                  className="icon_button absolute right-2 top-[38px] opacity-80"
                  onClick={handleShowConfirmPassword}
                >
                  {showConfirmPassword ? (
                    <AiOutlineEye className="h-7 text-2xl text-gray-500 font-extralight" />
                  ) : (
                    <AiOutlineEyeInvisible className="h-7 text-2xl text-gray-500 font-extralight" />
                  )}
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={!isValid}
              className={`w-full py-3 font-medium text-white bg-[#0062AD] rounded-lg ${
                isValid ? "focus:bg-blue-800 hover:bg-blue-800" : ""
              } hover:shadow inline-flex space-x-2 items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed`}
            >
              <span>Save New Password</span>
            </button>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

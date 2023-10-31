import { Link } from "react-router-dom";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useForm } from "react-hook-form";
import EmblaCarousel from "../../components/EmblaCarousel/EmblaCarousel";
import AuthLayout from "../../components/authLayout/AuthLayout";

// ----------Carousel Transition part specific---------
const autoplayOptions = {
  delay: 4000,
  stopOnInteraction: false,
};
const SLIDE_COUNT = 4;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());
//------------------------------------------------------

const RegisterPage = () => {
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
    formState: { errors, isValid },
    watch,
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const submitHandler = (data) => {
    const { firstName, lastName, email, password, confirmPassword } = data;
    // mutate({ name, email, password });
  };

  const password = watch("password");

  return (
    <AuthLayout>
      <div className="bg-gray-100 py-12 sm:p-4 flex justify-around rounded-2xl shadow-lg max-w-2xl lg:max-w-3xl ">
        <div className="sm:w-1/2 px-10 sm:px-3 sm:py-3 md:py-5">
          <div className=" text-center mb-8 sm:mb-4 px-8">
            <h2 className="text-3xl mb-1 font-semibold font-roboto ">
              Welcome
            </h2>
            <p className="text-xs text-[#959595] font-roboto">
              Register to create your first account and unlock a world of event
              possibilities!
            </p>
          </div>
          <form className="mt-6" onSubmit={handleSubmit(submitHandler)}>
            <div className="flex flex-row justify-between items-start gap-x-4">
              <div className="w-1/2">
                <label
                  htmlFor="firstName"
                  className="block text-gray-700 text-sm  font-semibold"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  {...register("firstName", {
                    minLength: {
                      value: 1,
                      message: "First Name length must be at least 1 character",
                    },
                    required: {
                      value: true,
                      message: "First Name is required",
                    },
                  })}
                  placeholder="Enter First Name"
                  className={`font-roboto text-sm placeholder:text-sm placeholder:font-roboto w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:bg-white focus:outline-none ${
                    errors.firstName ? "border-red-500" : "border-[#c3cad9]"
                  }`}
                />
                {errors.firstName?.message && (
                  <p className="text-red-500 text-xs  mt-1">
                    {errors.firstName?.message}
                  </p>
                )}
              </div>
              <div className="w-1/2">
                <label
                  htmlFor="lastName"
                  className="block text-gray-700 text-sm  font-semibold"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  {...register("lastName", {
                    minLength: {
                      value: 1,
                      message: "Last Name length must be at least 1 character",
                    },
                    required: {
                      value: true,
                      message: "Last Name is required",
                    },
                  })}
                  placeholder="Enter Last Name"
                  className={`font-roboto text-sm placeholder:text-sm placeholder:font-roboto w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:bg-white focus:outline-none ${
                    errors.lastName ? "border-red-500" : "border-[#c3cad9]"
                  }`}
                />
                {errors.lastName?.message && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.lastName?.message}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm  font-semibold"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                {...register("email", {
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Enter a valid email",
                  },
                  required: {
                    value: true,
                    message: "Email is required",
                  },
                })}
                placeholder="Enter Email Address"
                className={`font-roboto text-sm placeholder:text-sm placeholder:font-roboto w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:bg-white focus:outline-none ${
                  errors.email ? "border-red-500" : "border-[#c3cad9]"
                }`}
              />
              {errors.email?.message && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email?.message}
                </p>
              )}
            </div>

            <div className="mt-4 relative">
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
            {/* ------------------------------------------- */}

            <button
              type="submit"
              disabled={!isValid}
              className={`w-full block bg-[#0062AD]   ${
                isValid ? "focus:bg-blue-800 hover:bg-blue-800" : ""
              }  text-white font-semibold rounded-lg
                  px-4 py-3 my-4 md:my-3  disabled:opacity-70 disabled:cursor-not-allowed`}
            >
              Register
            </button>
          </form>

          <p className=" text-xs lg:text-sm text-center font-semibold text-gray-700 ">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary  hover:text-blue-800 focus:text-blue-800"
            >
              Login now
            </Link>
          </p>
        </div>

        <div className="w-1/2 sm:block hidden sm:pl-3 ">
          <EmblaCarousel slides={SLIDES} autoplayOptions={autoplayOptions} />
        </div>
      </div>
    </AuthLayout>
  );
};

export default RegisterPage;

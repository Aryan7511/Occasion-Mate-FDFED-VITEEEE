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

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const submitHandler = (data) => {
    const { email, password } = data;
    // mutate({ email, password });
  };

  return (
    <AuthLayout>
      <div className="bg-gray-100 py-12 sm:p-4 flex justify-around rounded-2xl shadow-lg max-w-2xl lg:max-w-3xl ">
        <div className="md:w-1/2 px-10 sm:px-3 sm:py-3 md:py-5">
          <div className=" text-center mb-10 px-8">
            <h2 className="text-3xl mb-1 font-semibold font-roboto ">
              Welcome Back
            </h2>
            <p className="text-xs text-[#959595] font-roboto">
              Our vendors eagerly await you!
            </p>
          </div>
          <form className="mt-6" onSubmit={handleSubmit(submitHandler)}>
            <div>
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
              <label className="block text-gray-700 text-sm font-semibold">
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

            <div className="text-right mt-3">
              <Link
                to="/password-reset"
                className="text-sm font-semibold text-primary  hover:text-blue-800 focus:text-blue-800"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={!isValid}
              className={`w-full block bg-[#0062AD]   ${
                isValid ? "focus:bg-blue-800 hover:bg-blue-800" : ""
              }  text-white font-semibold rounded-lg
                px-4 py-3 my-4 md:my-6  disabled:opacity-70 disabled:cursor-not-allowed`}
            >
              Log In
            </button>
          </form>

          <p className=" text-xs lg:text-sm text-center font-semibold text-gray-700 ">
            Don&rsquo;t have an account?{" "}
            <Link
              to="/register"
              className="text-primary  hover:text-blue-800 focus:text-blue-800"
            >
              Register now
            </Link>
          </p>
        </div>
        {/* 
          <div className="w-1/2  sm:block hidden sm:pl-3 ">
            <img
              src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="rounded-2xl h-full object-cover"
              alt="page img"
            />
          </div> */}
        <div className="w-1/2 sm:block hidden sm:pl-3  ">
          <EmblaCarousel slides={SLIDES} autoplayOptions={autoplayOptions} />
        </div>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;

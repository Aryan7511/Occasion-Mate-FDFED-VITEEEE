import { Link } from "react-router-dom";
import AuthLayout from "../../components/authLayout/AuthLayout";
import { useForm } from "react-hook-form";

const PasswordReset = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  });

  const submitHandler = (data) => {
    const { email } = data;
    // mutate({ email, password });
  };

  return (
    <AuthLayout>
      <div className=" mx-auto my-10 bg-white p-12  rounded-2xl shadow-lg max-w-2xl lg:max-w-3xl font-roboto">
        <div >
          <h2 className=" text-2xl sm:text-3xl mb-1  font-semibold font-roboto text-center">
            Reset password
          </h2>
          <p className="text-xs text-[#959595] font-roboto mx-auto text-center">
            Fill up the form to reset the password
          </p>
        </div>

        <form onSubmit={handleSubmit(submitHandler)} className="my-8 mx-4 ">
          <div className="flex flex-col space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm  font-medium mb-1"
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

            <button type="submit" disabled={!isValid} className={`w-full py-3 font-medium text-white bg-[#0062AD] rounded-lg ${
                isValid ? "focus:bg-blue-800 hover:bg-blue-800" : ""
              } hover:shadow inline-flex space-x-2 items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                />
              </svg>
              <span>Reset password</span>
            </button>

            <p className="text-center font-semibold text-xs lg:text-sm text-gray-700">
              Not registered yet?{" "} 
              <Link
                to="/register"
                className="text-primary  hover:text-blue-800 focus:text-blue-800 font-medium inline-flex space-x-1 items-center"
              >
                <span>Register now</span>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </span>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default PasswordReset;

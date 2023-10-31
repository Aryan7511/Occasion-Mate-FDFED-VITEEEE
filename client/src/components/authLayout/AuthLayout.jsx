import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div className="max-h-screen w-full">
      <section className=" bg-gray-200 min-h-screen w-full flex items-center justify-center">
        {children}
      </section>
    </div>
  );
};

export default AuthLayout;

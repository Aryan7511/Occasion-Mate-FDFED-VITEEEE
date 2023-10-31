import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import RegisterPage from "./pages/register/RegisterPage";
import LoginPage from "./pages/login/LoginPage";
import HomePage from "./pages/home/HomePage";

import "./App.css";
import Error from "./components/Error";
import PasswordReset from "./pages/login/PasswordReset";
import { ForgotPassword } from "./pages/login/ForgotPassword";

const App = () => {
  return (
    <div className="App font-opensans">
      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/password-reset" element={<PasswordReset />} />
        <Route path="/forgotpassword/:id/:token" element={<ForgotPassword />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default App;

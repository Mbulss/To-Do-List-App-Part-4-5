import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { TodoProvider } from './context/TodoContext';
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ActivationPage from "./pages/ActivationPage";
import SignupConfirmationPage from "./pages/SignupConfirmationPage";
import UserInfoComponent from "./components/UserInfoComponent";
import NavbarComponent from "./components/NavbarComponent";

function App() {
  return (
    <TodoProvider>
      <div className="min-h-screen bg-gray-100">
        <Toaster position="top-right" />
        <NavbarComponent />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/user/activate/:token?" element={<ActivationPage />} />
          <Route path="/signup-success" element={<SignupConfirmationPage />} />
          <Route path="/user-info" element={<UserInfoComponent />} />
          <Route path="*" element={<Navigate to="/signin" />} />
        </Routes>
      </div>
    </TodoProvider>
  );
}

export default App;

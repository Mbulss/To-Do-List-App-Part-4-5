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
      <div data-theme="light" className="min-h-screen bg-base-100">
        <Toaster position="top-right" />
        <NavbarComponent />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signin" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/user/activate/:token?" element={<ActivationPage />} />
            <Route path="/signup-success" element={<SignupConfirmationPage />} />
            <Route path="/user-info" element={<UserInfoComponent />} />
            <Route path="*" element={<Navigate to="/signin" />} />
          </Routes>
        </main>
      </div>
    </TodoProvider>
  );
}

export default App;

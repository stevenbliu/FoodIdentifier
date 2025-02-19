import { useState } from "react";
import { useUser } from "../context/UserContext"; 
import { loginUser, registerUser } from "../utils/authUtils"; 
import { useNavigate } from "react-router-dom";

export function useAuth() {
  const { login } = useUser();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // 🔹 Login Function
  const authenticateUser = async (email, password, setSuccessImage) => {
    if (!email || !password) {
      setError("Both fields are required.");
      return;
    }

    try {
      setIsLoading(true);
      setError("");
      setSuccessMessage("");

      console.log("Logging in...");
      const user = await loginUser(email, password);
      login(user);

      if (setSuccessImage) {
        setSuccessImage("success-image-url"); 
      }

      navigate("/dashboard");
    } catch (error) {
      setError(`Failed to login. ${error.message || "An unexpected error occurred"}`);
    } finally {
      setIsLoading(false);
    }
  };

  // 🔹 Register Function
  const registerNewUser = async (email, password, addMessage) => {
    try {
      setError("");
      setSuccessMessage("");
      setIsLoading(true);

      const response = await registerUser(email, password);
      setSuccessMessage("Registration successful!");
      // addMessage("Registration successful!", "success");

      console.log("Registration successful:", response);
    } catch (error) {

      // addMessage(error.message, "error");
      // console.error("Registration error:", error.message);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { authenticateUser, registerNewUser, error, isLoading, successMessage };
}

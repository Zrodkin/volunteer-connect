import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setAuthenticated, setUserRole }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { email, password } = formData;

    if (!email || !password) {
      setError("Please enter both email and password");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || "Login failed");
      }

      // Save role in localStorage
      localStorage.setItem("userRole", data.role);

      // Set the authentication state and user role
      setAuthenticated(true);
      setUserRole(data.role);

      // Redirect to the message board based on user role
      navigate(`/message-board/${data.role}`);

    } catch (err) {
      console.error("Login error:", err);
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start px-4 py-4">
      <div className="text-center mb-6 mt-8">
        <h1 className="text-3xl font-bold text-blue-700">Welcome Back</h1>
        <p className="text-gray-600">Log in to your ShlichusLinks account</p>
      </div>

      <form
        onSubmit={onSubmit}
        className="bg-white w-full max-w-md p-6 rounded-xl shadow-md space-y-6"
      >
        <div>
          <label className="block mb-1 font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {error && (
          <p className="text-sm text-red-600 bg-red-100 p-2 rounded">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
        >
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-6">
        Don't have an account?{" "}
        <a href="/signup" className="text-blue-600 hover:underline">Sign up</a>
      </p>
    </div>
  );
}

export default Login;

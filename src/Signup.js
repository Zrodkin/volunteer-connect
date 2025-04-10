import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate from react-router-dom

function Signup({ setAuthenticated }) {
  const navigate = useNavigate();  // Initialize the navigate function
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    fullName: "",
    referenceName: "",
    referenceContact: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "password" || name === "confirmPassword") {
      if (
        name === "password" &&
        formData.confirmPassword &&
        value !== formData.confirmPassword
      ) {
        setPasswordError("Passwords do not match");
      } else if (
        name === "confirmPassword" &&
        formData.password &&
        value !== formData.password
      ) {
        setPasswordError("Passwords do not match");
      } else {
        setPasswordError("");
      }
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const {
      email,
      password,
      confirmPassword,
      role,
      fullName,
      referenceName,
      referenceContact,
      phoneNumber,
    } = formData;

    // Check if all required fields are filled
    if (
      !email ||
      !password ||
      !confirmPassword ||
      !role ||
      !fullName ||
      !referenceName ||
      !referenceContact ||
      !phoneNumber
    ) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    // Sending request to the backend
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          role,
          fullName,
          referenceName,
          referenceContact,
          phoneNumber,
        }),
      });

      const data = await response.json();

      // Check if response is successful or error
      if (!response.ok || data.error) {
        throw new Error(data.error || "Registration failed - please try again");
      }

      // If registration is successful, set user as authenticated
      setAuthenticated(true); // Mark the user as authenticated

      // Redirect to the message board after successful registration
      navigate("/message-board");

    } catch (err) {
      console.error("Registration error:", err);
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Brand Header */}
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold text-blue-700">Ker a Velt Haynt</h1>
        <p className="text-gray-600 mt-2">A platform to connect Bochurim & Girls with Shluchim worldwide.</p>
      </div>

      {/* Signup Form */}
      <div className="flex justify-center px-4">
        <form
          onSubmit={onSubmit}
          className="bg-white w-full max-w-xl p-8 rounded-xl shadow-md space-y-6"
        >
          <h2 className="text-2xl font-bold text-center text-blue-800">
            Create Your Account
          </h2>

          <div>
            <label className="block mb-1 font-medium text-gray-700">I am a:</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select your role</option>
              <option value="shliach">Shliach</option>
              <option value="bochur">Bochur</option>
              <option value="girl">Girl</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

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
            <label className="block mb-1 font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
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

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {passwordError && (
              <p className="text-sm text-red-500 mt-1">{passwordError}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Reference Name
            </label>
            <input
              type="text"
              name="referenceName"
              value={formData.referenceName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Reference Phone Number
            </label>
            <input
              type="tel"
              name="referenceContact"
              value={formData.referenceContact}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-100 p-2 rounded">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>
      </div>

      <p className="text-center text-sm text-gray-600 mt-6">
        Already have an account?{" "}
        <a href="/login" className="text-blue-600 hover:underline">Log in</a>
      </p>
    </div>
  );
}

export default Signup;

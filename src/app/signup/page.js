"use client";
import React, { useState } from "react";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  UserCheck,
  Shield,
  Crown,
  Sparkles
} from "lucide-react";
import axios from "axios";
const Main = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState("user");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: ""
  });

  const roleIcons = {
    user: <UserCheck className="w-5 h-5" />,
    manager: <Shield className="w-5 h-5" />,
    admin: <Crown className="w-5 h-5" />
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setFormData({
      ...formData,
      role: selectedRole
    });
    console.log("Form Data:", formData);
    const payload = {
      email: formData.email,
      password: formData.password,
      name: formData.username,
      role: selectedRole
    };

    try {
      const response = await axios.post(
        `http://localhost:3001/api/auth/signup`,
        payload,
        {
          headers: {
           'Content-Type': 'application/json'
          }
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      console.log("Success:", data);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting the form. Please try again.");
    }

    console.log("Form submitted");
  };

  return (
    <section className="flex min-h-screen">
      <div className="flex-1 bg-gray-700 relative overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gray-600/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gray-600/20 rounded-full blur-3xl" />

        <div className="flex flex-col items-center justify-center h-full text-center relative z-10 px-12">
          <h1 className="text-5xl font-bold text-white mb-6">
            Welcome to Our Platform
          </h1>
          <p className="text-xl text-gray-300 max-w-md leading-relaxed">
            Join thousands of users in our amazing community. Start your journey
            today!
          </p>
          <div className="mt-12 flex space-x-4">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" />
            <div
              className="w-3 h-3 bg-gray-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            />
            <div
              className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            />
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-lg bg-white flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Create Account
            </h2>
            <p className="text-gray-600">Fill in your details to get started</p>
          </div>

          <div className="space-y-6">
            {/* Username Input */}
            <div className="relative group">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" />
              <input
                type="text"
                onChange={e =>
                  setFormData({ ...formData, username: e.target.value })}
                placeholder="Username"
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white hover:bg-white"
              />
            </div>

            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" />
              <input
                type="email"
                onChange={e =>
                  setFormData({ ...formData, email: e.target.value })}
                placeholder="Email Address"
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white hover:bg-white"
              />
            </div>

            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" />
              <input
                type={showPassword ? "text" : "password"}
                onChange={e =>
                  setFormData({ ...formData, password: e.target.value })}
                placeholder="Password"
                className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white hover:bg-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors duration-200"
              >
                {showPassword
                  ? <EyeOff className="w-5 h-5" />
                  : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white hover:bg-white"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors duration-200"
              >
                {showConfirmPassword
                  ? <EyeOff className="w-5 h-5" />
                  : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Choose your role
              </label>
              <div className="grid grid-cols-3 gap-3">
                {["user", "manager", "admin"].map(role =>
                  <label key={role} className="relative cursor-pointer">
                    <input
                      type="radio"
                      name="role"
                      value={role}
                      checked={selectedRole === role}
                      onChange={e => {
                        setSelectedRole(e.target.value);
                        setFormData({ ...formData, role: e.target.value });
                      }}
                      className="sr-only"
                    />
                    <div
                      className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all duration-200 ${selectedRole ===
                      role
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300 hover:bg-gray-100"}`}
                    >
                      {roleIcons[role]}
                      <span className="text-sm font-medium mt-2 capitalize">
                        {role}
                      </span>
                    </div>
                  </label>
                )}
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            >
              Create Account
            </button>

            <div className="text-center">
              <p className="text-gray-600">
                Already have an account?
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-700 font-medium ml-1 hover:underline"
                >
                  Sign In
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Main;

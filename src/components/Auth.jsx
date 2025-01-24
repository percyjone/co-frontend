import React, { useState } from "react";
import "./Auth.css";

const Auth = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoginMode) {
      console.log("Logging in:", formData);
    } else {
      console.log("Registering:", formData);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>{isLoginMode ? "Login" : "Signup"}</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder={isLoginMode ? "Password" : "Create password"}
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          {!isLoginMode && (
            <div className="form-group">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </div>
          )}
          {isLoginMode && <a href="#" className="forgot-password">Forgot password?</a>}
          <button type="submit" className="primary-btn">
            {isLoginMode ? "Login" : "Sign up"}
          </button>
        </form>
        <p className="toggle-mode">
          {isLoginMode
            ? "Don't have an account? "
            : "Already have an account? "}
          <a
            href="#"
            onClick={(e) => {
              console.log()
              e.preventDefault();
              setIsLoginMode((prevMode) => !prevMode);
            }}
          >
            {isLoginMode ? "Signup" : "Login"}
          </a>
        </p>
      
      </div>
    </div>
  );
};

export default Auth;

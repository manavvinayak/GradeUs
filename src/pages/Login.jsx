"use client"

import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import "./Auth.css"

const Login = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      setIsLoading(true)

      // Simulate API call
      setTimeout(() => {
        // For demo purposes, we'll just create a user
        const userData = {
          name: "Demo User",
          email: formData.email,
          id: Date.now().toString(),
        }

        localStorage.setItem("user", JSON.stringify(userData))
        setIsAuthenticated(true)
        toast.success("Logged in successfully!")
        navigate("/dashboard")
        setIsLoading(false)
      }, 1000)
    }
  }

  const handleGoogleSignIn = () => {
    setIsLoading(true)

    // Simulate Google Sign In
    setTimeout(() => {
      const userData = {
        name: "Google User",
        email: "google.user@example.com",
        id: "google-" + Date.now().toString(),
      }

      localStorage.setItem("user", JSON.stringify(userData))
      setIsAuthenticated(true)
      toast.success("Signed in with Google!")
      navigate("/dashboard")
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <h1>Welcome Back</h1>
          <p className="auth-subtitle">Log in to access  </p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={`form-control ${errors.email ? "error" : ""}`}
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
              {errors.email && <div className="form-error">{errors.email}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className={`form-control ${errors.password ? "error" : ""}`}
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter strong password"
              />
              {errors.password && <div className="form-error">{errors.password}</div>}
            </div>

            <div className="form-group form-checkbox">
              <div className="checkbox-wrapper">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Remember me</label>
              </div>
              <Link to="#" className="forgot-password">
                Forgot password?
              </Link>
            </div>

            <button type="submit" className="btn btn-primary btn-block" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Log In"}
            </button>
          </form>

          <div className="auth-divider">
            <span>OR</span>
          </div>

          <button className="btn btn-google" onClick={handleGoogleSignIn} disabled={isLoading}>
            <img src="/google_icon.png" alt="Google" className="google-icon" />
            <span> Log in with Google </span>
          </button>

          <p className="auth-footer">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login

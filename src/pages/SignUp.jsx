"use client"

import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import "./Auth.css"

const SignUp = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
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

    // Clear error when user types
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
        // Store user data in localStorage
        const userData = {
          name: formData.name,
          email: formData.email,
          id: Date.now().toString(),
        }

        localStorage.setItem("user", JSON.stringify(userData))
        setIsAuthenticated(true)
        toast.success("Account created successfully!")
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
          <h1>Create an Account</h1>
          <p className="auth-subtitle">Track your academic progress with GPA & Credit Tracker</p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className={`form-control ${errors.name ? "error" : ""}`}
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
              />
              {errors.name && <div className="form-error">{errors.name}</div>}
            </div>

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
                placeholder="user@gmail.com"
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
                placeholder="Create a strong password"
              />
              {errors.password && <div className="form-error">{errors.password}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className={`form-control ${errors.confirmPassword ? "error" : ""}`}
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && <div className="form-error">{errors.confirmPassword}</div>}
            </div>

            <button type="submit" className="btn btn-primary btn-block" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          <div className="auth-divider">
            <span>OR</span>
          </div>

          <button className=" btn-google" onClick={handleGoogleSignIn} disabled={isLoading}>
            <img src="/google_icon.png" alt="Google" className="google-icon" />
            Sign up with Google
          </button>

          <p className="auth-footer">
            Already have an account? <Link to="/login">Log In</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignUp

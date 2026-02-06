"use client"

import React, { useState } from "react"
import "./CourseForm.css"

const CourseForm = ({ onAddCourse, initialValues = null, onCancel = null }) => {
  const [formData, setFormData] = useState(
    initialValues || {
      name: "",
      credits: "",
      grade: "",
      semester: "Current",
    },
  )
  const [errors, setErrors] = useState({})

  const gradeOptions = [
    { label: "A+ (10)", value: "10" },
    { label: "A (9)", value: "9" },
    { label: "B+ (8)", value: "8" },
    { label: "B (7)", value: "7" },
    { label: "C+ (6)", value: "6" },
    { label: "C (5)", value: "5" },
    { label: "D (4)", value: "4" },
    { label: "F (0)", value: "0" },
  ]

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Course name is required"
    }

    if (!formData.credits) {
      newErrors.credits = "Credits are required"
    } else if (isNaN(formData.credits) || formData.credits <= 0) {
      newErrors.credits = "Credits must be a positive number"
    }

    if (!formData.grade) {
      newErrors.grade = "Grade is required"
    }

    if (!formData.semester) {
      newErrors.semester = "Semester is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: name === "credits" ? value.replace(/[^0-9.]/g, "") : value,
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
      onAddCourse({
        ...formData,
        credits: Number.parseFloat(formData.credits),
      })

      // Reset form if not editing
      if (!initialValues) {
        setFormData({
          name: "",
          credits: "",
          grade: "",
          semester: "Current",
        })
      } else if (onCancel) {
        onCancel()
      }
    }
  }

  return (
    <div className="course-form">
      <h2>{initialValues ? "Edit Course" : "Add New Course"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Course Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className={`form-control ${errors.name ? "error" : ""}`}
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Computer Networks"
          />
          {errors.name && <div className="form-error">{errors.name}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="credits" className="form-label">
            Credits
          </label>
          <input
            type="text"
            id="credits"
            name="credits"
            className={`form-control ${errors.credits ? "error" : ""}`}
            value={formData.credits}
            onChange={handleChange}
            placeholder="e.g. 3"
          />
          {errors.credits && <div className="form-error">{errors.credits}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="grade" className="form-label">
            Grade
          </label>
          <select
            id="grade"
            name="grade"
            className={`form-control ${errors.grade ? "error" : ""}`}
            value={formData.grade}
            onChange={handleChange}
          >
            <option value="">Select Grade</option>
            {gradeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.grade && <div className="form-error">{errors.grade}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="semester" className="form-label">
            Semester
          </label>
          <input
            type="text"
            id="semester"
            name="semester"
            className={`form-control ${errors.semester ? "error" : ""}`}
            value={formData.semester}
            onChange={handleChange}
            placeholder="e.g. Fall 2023"
          />
          {errors.semester && <div className="form-error">{errors.semester}</div>}
        </div>

        <div className="form-actions">
          {initialValues && onCancel && (
            <button type="button" className="btn btn-outline" onClick={onCancel}>
              Cancel
            </button>
          )}
          <button type="submit" className="btn btn-primary">
            {initialValues ? "Update Course" : "Add Course"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CourseForm

"use client"

import React, { useState, useEffect } from "react"
import "./CreditTracker.css"

const CreditTracker = ({ courses, totalCreditsRequired, onUpdateTotalCredits }) => {
  const [creditsEarned, setCreditsEarned] = useState(0)
  const [creditsRemaining, setCreditsRemaining] = useState(totalCreditsRequired)
  const [completionPercentage, setCompletionPercentage] = useState(0)
  const [isEditing, setIsEditing] = useState(false)
  const [newTotalCredits, setNewTotalCredits] = useState(totalCreditsRequired.toString())

  useEffect(() => {
    // Calculate credits earned
    const earned = courses.reduce((total, course) => {
      // Only count courses with passing grades (grade > 0)
      return Number.parseFloat(course.grade) > 0 ? total + course.credits : total
    }, 0)

    setCreditsEarned(earned)

    // Calculate credits remaining
    const remaining = Math.max(0, totalCreditsRequired - earned)
    setCreditsRemaining(remaining)

    // Calculate completion percentage
    const percentage = totalCreditsRequired > 0 ? (earned / totalCreditsRequired) * 100 : 0
    setCompletionPercentage(Math.min(100, percentage))
  }, [courses, totalCreditsRequired])

  const handleEditToggle = () => {
    setIsEditing(!isEditing)
    setNewTotalCredits(totalCreditsRequired.toString())
  }

  const handleTotalCreditsChange = (e) => {
    // Only allow numbers
    const value = e.target.value.replace(/[^0-9]/g, "")
    setNewTotalCredits(value)
  }

  const handleTotalCreditsSubmit = (e) => {
    e.preventDefault()

    const newTotal = Number.parseInt(newTotalCredits) || 0
    if (newTotal > 0) {
      onUpdateTotalCredits(newTotal)
      setIsEditing(false)
    }
  }

  return (
    <div className="credit-tracker">
      <div className="credit-summary">
        <div className="credit-card">
          <h3>Credits Earned</h3>
          <div className="credit-value">{creditsEarned.toFixed(1)}</div>
        </div>

        <div className="credit-card">
          <h3>Credits Remaining</h3>
          <div className="credit-value">{creditsRemaining.toFixed(1)}</div>
        </div>

        <div className="credit-card">
          <h3>Total Credits Required</h3>
          {isEditing ? (
            <form onSubmit={handleTotalCreditsSubmit} className="edit-credits-form">
              <input
                type="text"
                value={newTotalCredits}
                onChange={handleTotalCreditsChange}
                className="form-control"
                autoFocus
              />
              <div className="edit-credits-actions">
                <button type="submit" className="btn btn-primary btn-sm">
                  Save
                </button>
                <button type="button" className="btn btn-outline btn-sm" onClick={handleEditToggle}>
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="credit-value">{totalCreditsRequired}</div>
              <button className="edit-credits-btn" onClick={handleEditToggle} aria-label="Edit total credits required">
                <i className="bi bi-pencil-square"></i>
              </button>
            </>
          )}
        </div>
      </div>

      <div className="progress-section">
        <h3>Degree Progress</h3>
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${completionPercentage}%` }}></div>
        </div>
        <div className="progress-label">{completionPercentage.toFixed(1)}% Complete</div>
      </div>

      <div className="credit-info">
        <h3>Credit Information</h3>
        <div className="info-card">
          <p>
            Your academic progress is tracked based on the credits you've earned from courses with passing grades. The
            default graduation requirement is set to {totalCreditsRequired} credits, but you can adjust this to match
            your specific program requirements.
          </p>
          <p>
            <strong>Tip:</strong> Most undergraduate programs require between 120-130 total credits for graduation,
            while graduate programs typically require 30-60 credits.
          </p>
        </div>
      </div>
    </div>
  )
}

export default CreditTracker

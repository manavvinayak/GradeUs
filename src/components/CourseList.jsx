"use client"

import React, { useState } from "react"
import CourseForm from "./CourseForm"
import "./CourseList.css"

const CourseList = ({ courses, onUpdateCourse, onDeleteCourse }) => {
  const [editingCourse, setEditingCourse] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)

  const handleEdit = (course) => {
    setEditingCourse(course)
  }

  const handleCancelEdit = () => {
    setEditingCourse(null)
  }

  const handleUpdate = (updatedCourse) => {
    onUpdateCourse(updatedCourse)
    setEditingCourse(null)
  }

  const handleDeleteClick = (course) => {
    setDeleteTarget(course)
  }

  const handleConfirmDelete = () => {
    if (deleteTarget) {
      onDeleteCourse(deleteTarget.id)
      setDeleteTarget(null)
    }
  }

  const handleCancelDelete = () => {
    setDeleteTarget(null)
  }

  return (
    <div className="course-list">
      <h2>Your Courses</h2>

      {courses.length === 0 ? (
        <div className="course-list-empty">
          <p>No courses added yet. Add your first course to get started!</p>
        </div>
      ) : (
        <div>
          <table className="course-table">
            <thead>
              <tr>
                <th>Course Name</th>
                <th>Credits</th>
                <th>Grade</th>
                <th>Semester</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id}>
                  <td data-label="Course">{course.name}</td>
                  <td data-label="Credits">{course.credits}</td>
                  <td data-label="Grade">{course.grade}</td>
                  <td data-label="Semester">{course.semester}</td>
                  <td data-label="Actions">
                    <div className="course-actions">
                      <button
                        className="course-action-btn edit"
                        onClick={() => handleEdit(course)}
                        aria-label="Edit course"
                      >
                        <i className="bi bi-pen"></i>
                      </button>
                      <button
                        className="course-action-btn delete"
                        onClick={() => handleDeleteClick(course)}
                        aria-label="Delete course"
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {editingCourse && (
            <div className="edit-form-container">
              <CourseForm initialValues={editingCourse} onAddCourse={handleUpdate} onCancel={handleCancelEdit} />
            </div>
          )}
        </div>
      )}

      {deleteTarget && (
        <div className="delete-overlay" onClick={handleCancelDelete}>
          <div className="delete-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="delete-dialog-icon">
              <i className="bi bi-exclamation-triangle"></i>
            </div>
            <h3>Delete Course</h3>
            <p>
              Are you sure you want to delete <strong>{deleteTarget.name}</strong>? This action cannot be undone.
            </p>
            <div className="delete-dialog-actions">
              <button className="btn btn-outline" onClick={handleCancelDelete}>
                Cancel
              </button>
              <button className="btn btn-danger" onClick={handleConfirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CourseList

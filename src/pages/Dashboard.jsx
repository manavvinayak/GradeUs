"use client"

import React, { useState, useEffect, useRef } from "react"
import toast from "react-hot-toast"
import { jsPDF } from "jspdf"
import autoTable from "jspdf-autotable"
import * as XLSX from "xlsx"
import CourseForm from "../components/CourseForm"
import CourseList from "../components/CourseList"
import GpaCalculator from "../components/GpaCalculator"
import CreditTracker from "../components/CreditTracker"
import "./Dashboard.css"

const Dashboard = () => {
  const [courses, setCourses] = useState([])
  const [totalCreditsRequired, setTotalCreditsRequired] = useState(120)
  const [user, setUser] = useState(null)
  const [activeTab, setActiveTab] = useState("courses")

  useEffect(() => {
    // Load user data
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }

    // Load courses from localStorage
    const savedCourses = localStorage.getItem("courses")
    if (savedCourses) {
      setCourses(JSON.parse(savedCourses))
    }

    // Load total credits required
    const savedTotalCredits = localStorage.getItem("totalCreditsRequired")
    if (savedTotalCredits) {
      setTotalCreditsRequired(Number.parseInt(savedTotalCredits))
    }
  }, [])

  // Save courses to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("courses", JSON.stringify(courses))
  }, [courses])

  // Save total credits required to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("totalCreditsRequired", totalCreditsRequired.toString())
  }, [totalCreditsRequired])

  const handleAddCourse = (course) => {
    const newCourse = {
      ...course,
      id: Date.now().toString(),
    }
    setCourses([...courses, newCourse])
    toast.success("Course added successfully!")
  }

  const handleUpdateCourse = (updatedCourse) => {
    setCourses(courses.map((course) => (course.id === updatedCourse.id ? updatedCourse : course)))
    toast.success("Course updated successfully!")
  }

  const handleDeleteCourse = (courseId) => {
    setCourses(courses.filter((course) => course.id !== courseId))
    toast.success("Course deleted successfully!")
  }

  const handleUpdateTotalCredits = (newTotal) => {
    setTotalCreditsRequired(newTotal)
    toast.success("Total credits updated!")
  }

  const [exportOpen, setExportOpen] = useState(false)
  const [exportState, setExportState] = useState("idle") // idle | loading | done
  const [exportProgress, setExportProgress] = useState(0)
  const exportRef = useRef(null)

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (exportRef.current && !exportRef.current.contains(e.target)) {
        setExportOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const downloadFile = (format) => {
    const headers = ["Course Name", "Credits", "Grade", "Semester"]

    if (format === "csv") {
      const csvContent = [
        headers.join(","),
        ...courses.map((c) => [c.name, c.credits, c.grade, c.semester].join(",")),
      ].join("\n")
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = "gpa_tracker_courses.csv"
      link.style.visibility = "hidden"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }

    if (format === "excel") {
      const data = courses.map((c) => ({
        "Course Name": c.name,
        Credits: c.credits,
        Grade: c.grade,
        Semester: c.semester,
      }))
      const ws = XLSX.utils.json_to_sheet(data)
      // Set column widths
      ws["!cols"] = [{ wch: 25 }, { wch: 10 }, { wch: 10 }, { wch: 15 }]
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, "Courses")
      XLSX.writeFile(wb, "gpa_tracker_courses.xlsx")
    }

    if (format === "pdf") {
      const doc = new jsPDF()
      // Title
      doc.setFontSize(18)
      doc.setTextColor(67, 97, 238)
      doc.text("GPA & Credit Tracker", 14, 20)
      doc.setFontSize(12)
      doc.setTextColor(100)
      doc.text("Course Report", 14, 28)

      // Table
      const tableData = courses.map((c) => [c.name, c.credits, c.grade, c.semester])
      autoTable(doc, {
        head: [headers],
        body: tableData,
        startY: 35,
        theme: "grid",
        headStyles: {
          fillColor: [67, 97, 238],
          textColor: 255,
          fontStyle: "bold",
          halign: "center",
        },
        bodyStyles: {
          halign: "center",
        },
        alternateRowStyles: {
          fillColor: [240, 243, 255],
        },
        styles: {
          cellPadding: 4,
          fontSize: 11,
          lineColor: [200, 200, 200],
          lineWidth: 0.5,
        },
        margin: { left: 14, right: 14 },
      })

      doc.save("gpa_tracker_courses.pdf")
    }
  }

  const handleExport = (format) => {
    setExportOpen(false)
    setExportState("loading")
    setExportProgress(0)

    // Animate progress to 90% first, then finish after download
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 20 + 8
      if (progress >= 90) {
        progress = 90
        clearInterval(interval)

        // Now actually download
        try {
          downloadFile(format)
          setExportProgress(100)
          setExportState("done")
          toast.success(`Exported as ${format.toUpperCase()} successfully!`)
        } catch (err) {
          console.error("Export error:", err)
          toast.error(`Failed to export as ${format.toUpperCase()}`)
          setExportState("idle")
        }

        // Reset after 2 seconds
        setTimeout(() => {
          setExportState("idle")
          setExportProgress(0)
        }, 2000)
      }
      setExportProgress(Math.min(progress, 90))
    }, 300)
  }

  return (
    <div className="dashboard-page">
      <div className="container">
        <div className="dashboard-header">
          <h1>Welcome, {user?.name || "Student"}</h1>
          <p>Track your academic progress and calculate your GPA</p>
        </div>

        <div className="dashboard-tabs">
          <button
            className={`tab-button ${activeTab === "courses" ? "active" : ""}`}
            onClick={() => setActiveTab("courses")}
          >
            Courses
          </button>
          <button className={`tab-button ${activeTab === "gpa" ? "active" : ""}`} onClick={() => setActiveTab("gpa")}>
            GPA Calculator
          </button>
          <button
            className={`tab-button ${activeTab === "credits" ? "active" : ""}`}
            onClick={() => setActiveTab("credits")}
          >
            Credit Tracker
          </button>
        </div>

        <div className="dashboard-content">
          {activeTab === "courses" && (
            <div className="courses-tab">
              <div className="dashboard-grid">
                <div className="course-form-container">
                  <CourseForm onAddCourse={handleAddCourse} />
                </div>
                <div className="course-list-container">
                  <CourseList
                    courses={courses}
                    onUpdateCourse={handleUpdateCourse}
                    onDeleteCourse={handleDeleteCourse}
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "gpa" && (
            <div className="gpa-tab">
              <GpaCalculator courses={courses} />
            </div>
          )}

          {activeTab === "credits" && (
            <div className="credits-tab">
              <CreditTracker
                courses={courses}
                totalCreditsRequired={totalCreditsRequired}
                onUpdateTotalCredits={handleUpdateTotalCredits}
              />
            </div>
          )}
        </div>

        <div className="dashboard-actions">
          <div className="export-wrapper" ref={exportRef}>
            <button
              className={`export-btn ${exportState}`}
              onClick={() => exportState === "idle" && setExportOpen(!exportOpen)}
              disabled={exportState === "loading"}
            >
              {exportState === "idle" && (
                <>
                  <span className="export-label">EXPORT</span>
                  <span className="export-arrow">
                    <i className={`bi bi-caret-${exportOpen ? "up" : "down"}-fill`}></i>
                  </span>
                </>
              )}
              {exportState === "loading" && (
                <div className="export-progress-wrapper">
                  <div className="export-progress-bar" style={{ width: `${exportProgress}%` }}></div>
                  <span className="export-progress-text">{Math.round(exportProgress)}%</span>
                </div>
              )}
              {exportState === "done" && (
                <span className="export-done">
                  <i className="bi bi-check-lg"></i>
                </span>
              )}
            </button>

            {exportOpen && (
              <div className="export-dropdown">
                <button className="export-option" onClick={() => handleExport("excel")}>
                  EXCEL
                </button>
                <button className="export-option" onClick={() => handleExport("pdf")}>
                  PDF
                </button>
                <button className="export-option" onClick={() => handleExport("csv")}>
                  CSV
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

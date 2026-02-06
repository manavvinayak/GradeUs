"use client"

import React, { useState, useEffect } from "react"
import "./GpaCalculator.css"

const GpaCalculator = ({ courses }) => {
  const [semesterGpa, setSemesterGpa] = useState({})
  const [cumulativeGpa, setCumulativeGpa] = useState(0)
  const [percentageManav, setPercentageManav] = useState(0)
  const [percentageGeneric, setPercentageGeneric] = useState(0)
  const [selectedSemester, setSelectedSemester] = useState("Current")
  const [semesters, setSemesters] = useState(["Current"])

  useEffect(() => {
    // Extract unique semesters from courses
    const uniqueSemesters = [...new Set(courses.map((course) => course.semester))]
    setSemesters(uniqueSemesters.length > 0 ? uniqueSemesters : ["Current"])

    // Calculate GPA for each semester
    const semesterGpas = {}
    uniqueSemesters.forEach((semester) => {
      const semesterCourses = courses.filter((course) => course.semester === semester)
      semesterGpas[semester] = calculateSemesterGpa(semesterCourses)
    })
    setSemesterGpa(semesterGpas)

    // Calculate cumulative GPA
    if (Object.keys(semesterGpas).length > 0) {
      const cgpa = calculateCumulativeGpa(semesterGpas)
      setCumulativeGpa(cgpa)

      // Calculate percentages
      setPercentageManav(calculateManavPercentage(cgpa))
      setPercentageGeneric(calculateGenericPercentage(cgpa))
    } else {
      setCumulativeGpa(0)
      setPercentageManav(0)
      setPercentageGeneric(0)
    }
  }, [courses])

  // Calculate Semester GPA: SGPA = ∑(creditᵢ × gradePointᵢ) / ∑(creditᵢ)
  const calculateSemesterGpa = (semesterCourses) => {
    if (semesterCourses.length === 0) return 0

    const totalCredits = semesterCourses.reduce((sum, course) => sum + course.credits, 0)
    const weightedGradePoints = semesterCourses.reduce(
      (sum, course) => sum + course.credits * Number.parseFloat(course.grade),
      0,
    )

    return totalCredits > 0 ? weightedGradePoints / totalCredits : 0
  }

  // Calculate Cumulative GPA: CGPA = ∑(SGPAₖ) / Nₛₑₘₑₛₜₑᵣₛ
  const calculateCumulativeGpa = (semesterGpas) => {
    const semesterValues = Object.values(semesterGpas)
    const nonZeroValues = semesterValues.filter((value) => value > 0)

    if (nonZeroValues.length === 0) return 0

    const sumGpa = nonZeroValues.reduce((sum, gpa) => sum + gpa, 0)
    return sumGpa / nonZeroValues.length
  }

  // Calculate Manav Rachna percentage: Percentage = 10 × CGPA
  const calculateManavPercentage = (cgpa) => {
    return cgpa * 10
  }

  // Calculate Generic percentage: Percentage = 9.5 × CGPA
  const calculateGenericPercentage = (cgpa) => {
    return cgpa * 9.5
  }

  return (
    <div className="gpa-calculator">
      <div className="gpa-cards">
        <div className="gpa-card">
          <h3>Current Semester GPA</h3>
          <div className="gpa-value">
            {semesterGpa[selectedSemester] ? semesterGpa[selectedSemester].toFixed(2) : "0.00"}
          </div>
          <div className="semester-selector">
            <label htmlFor="semester-select">Select Semester:</label>
            <select id="semester-select" value={selectedSemester} onChange={(e) => setSelectedSemester(e.target.value)}>
              {semesters.map((semester) => (
                <option key={semester} value={semester}>
                  {semester}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="gpa-card">
          <h3>Cumulative GPA</h3>
          <div className="gpa-value">{cumulativeGpa.toFixed(2)}</div>
          <div className="gpa-info">Based on all semesters</div>
        </div>
      </div>

      <div className="gpa-conversion">
        <h3>GPA to Percentage Conversion</h3>
        <div className="conversion-cards">
          <div className="conversion-card">
            <h4>Normal Formula</h4>
            <div className="conversion-formula">Percentage = 10 × CGPA</div>
            <div className="conversion-result">{percentageManav.toFixed(2)}%</div>
          </div>

          <div className="conversion-card">
            <h4>Generic 10-point Formula</h4>
            <div className="conversion-formula">Percentage = 9.5 × CGPA</div>
            <div className="conversion-result">{percentageGeneric.toFixed(2)}%</div>
          </div>
        </div>
      </div>

      <div className="grade-table">
        <h3>Grade Point Reference</h3>
        <table>
          <thead>
            <tr>
              <th>Letter Grade</th>
              <th>Grade Points</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>A+</td>
              <td>10</td>
            </tr>
            <tr>
              <td>A</td>
              <td>9</td>
            </tr>
            <tr>
              <td>B+</td>
              <td>8</td>
            </tr>
            <tr>
              <td>B</td>
              <td>7</td>
            </tr>
            <tr>
              <td>C+</td>
              <td>6</td>
            </tr>
            <tr>
              <td>C</td>
              <td>5</td>
            </tr>
            <tr>
              <td>D</td>
              <td>4</td>
            </tr>
            <tr>
              <td>F</td>
              <td>0</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default GpaCalculator

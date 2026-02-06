import React from "react"
import "./HowToUse.css"

const HowToUse = () => {
  return (
    <div className="howtouse-page">
      <section className="howtouse-hero">
        <div className="container">
          <h1>How to Use GradeUs</h1>
          <p className="howtouse-subtitle">
            Follow these simple steps to start tracking your GPA and credits effortlessly.
          </p>
        </div>
      </section>

      <section className="howtouse-steps">
        <div className="container">
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3>Create Your Account</h3>
              <p>
                Sign up with your name, email, and password. It only takes a few seconds to get started.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">2</div>
              <h3>Set Your Credit Goal</h3>
              <p>
                Enter the total number of credits required for your degree so we can track your progress.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">3</div>
              <h3>Add Your Courses</h3>
              <p>
                Add each course with its name, credit hours, and the grade you received. You can add courses from any semester.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">4</div>
              <h3>View Your GPA</h3>
              <p>
                Your cumulative GPA is calculated automatically based on the courses and grades you've entered.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">5</div>
              <h3>Track Credit Progress</h3>
              <p>
                See how many credits you've completed and how many remain to reach your graduation goal.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">6</div>
              <h3>Manage & Update</h3>
              <p>
                Edit or remove courses anytime. Your GPA and credit totals update instantly as you make changes.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="howtouse-tips">
        <div className="container">
          <h2 className="section-title">Tips for Best Results</h2>
          <div className="tips-grid">
            <div className="tip-item">
              <div className="tip-icon">📝</div>
              <div className="tip-content">
                <h4>Keep It Updated</h4>
                <p>Add new courses as soon as you receive your grades to keep your GPA accurate.</p>
              </div>
            </div>
            <div className="tip-item">
              <div className="tip-icon"><i className="bi bi-file-bar-graph"></i></div>
              <div className="tip-content">
                <h4>Set Realistic Goals</h4>
                <p>Use the tracker to plan what grades you need in upcoming courses to reach your target GPA.</p>
              </div>
            </div>
            <div className="tip-item">
              <div className="tip-icon"> <i className="bi bi-eye"></i></div>
              <div className="tip-content">
                <h4>Review Regularly</h4>
                <p>Check your dashboard often to stay on top of your academic progress and credit count.</p>
              </div>
            </div>
            <div className="tip-item">
              <div className="tip-icon"><i className="bi bi-cloud-arrow-down"></i></div>
              <div className="tip-content">
                <h4>Data Stored Locally</h4>
                <p>Your data is saved in your browser's local storage—no server needed, fully private.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HowToUse

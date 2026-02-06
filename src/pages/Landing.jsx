import React from "react"
import { Link } from "react-router-dom"
import "./Landing.css"

const Landing = () => {
  return (
    <div className="landing-page">
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1>Track Your Academic Progress with Ease</h1>
              <p>
                Gradus helps you monitor your academic performance, calculate your GPA, and track your
                progress toward graduation.
              </p>
              <div className="hero-buttons">
                <Link to="/dashboard" className="btn btn-primary">
                  Get Started
                </Link>
                <Link to="/how-to-use" className="btn btn-outline">
                  How to Use
                </Link>
              </div>
            </div>
            <div className="hero-image">
              <img src="https://plus.unsplash.com/premium_photo-1680807868955-805266ef99f0?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Students tracking GPA" />
            </div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Key Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🗿</div>
              <h3>GPA Calculator</h3>
              <p>Calculate your semester and cumulative GPA with our easy-to-use tool.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><i className="bi bi-calendar2-check"></i></div>
              <h3>Course Management</h3>
              <p>Add, edit, and remove courses to keep track of your academic journey.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎓</div>
              <h3>Credit Tracker</h3>
              <p>Monitor your progress toward graduation by tracking earned and remaining credits.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💾</div>
              <h3>Data Persistence</h3>
              <p>Your data is saved locally,just export it as excell</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Track Your Academic Progress?</h2>
            <p>Join thousands of students who are using GPA & Credit Tracker to stay on top of their academic goals.</p>
            <div className="cta-buttons">
              <Link to="/signup" className="btn btn-primary">
                Sign Up - It's Free
              </Link>
              <Link to="/login" className="btn btn-secondary">
                Login
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Landing

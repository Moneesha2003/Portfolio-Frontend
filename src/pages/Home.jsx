import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import MoneeshaImage from "../assets/images/Moneesha.jpg";
import MoneeshaGImage from "../assets/images/MoneeshaG.jpg";
import ProjectCard from "../components/ProjectCard";
import ContactForm from "../components/ContactForm";

// Modern Project Card Component
function ProjectCardModern({ project }) {
    const renderImage = () => {
        if (project.coverImage?.data) {
            return (
                <img
                    src={`data:${project.coverImage.contentType};base64,${project.coverImage.data}`}
                    alt={project.title}
                    className="project-image-modern"
                />
            );
        }
        return (
            <div className="project-image-modern" style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '1.2rem'
            }}>
                {project.title}
            </div>
        );
    };

    return (
        <div className="project-card-modern" role="article">
            <div className="project-media-modern">
                {renderImage()}
                <div className="project-overlay">
                    <div className="overlay-content">
                    </div>
                </div>
            </div>

            <div className="project-body-modern">
                <h3 className="project-title-modern">{project.title}</h3>
                <p className="project-desc-modern">{project.description}</p>

                <div className="project-footer">
                    <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="github-btn github-btn--outline"
                    >
                        View Code
                    </a>
                    <span style={{
                        color: 'var(--warm-gray)',
                        fontSize: '0.9rem',
                        fontWeight: '600'
                    }}>
                        ★ Featured
                    </span>
                </div>
            </div>
        </div>
    );
}

// Projects Section Component
function ProjectsSection() {
    const [featuredProjects, setFeaturedProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFeaturedProjects();
    }, []);

    const fetchFeaturedProjects = async () => {
        try {
            const res = await API.get("/projects");
            // Show only first 3 projects as featured
            setFeaturedProjects(res.data.slice(0, 3));
        } catch (err) {
            console.error("Failed to fetch projects:", err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <section id="projects" className="projects-section">
                <div className="container">
                    <div className="projects-loading">
                        <div className="loading-spinner"></div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="projects" className="projects-section">
            <div className="container">
                <div className="projects-header">
                    <h2>Featured Projects</h2>
                    <p className="projects-subtitle">
                        Here are some of my recent works that showcase my skills and creativity
                    </p>
                </div>

                <div className="featured-projects">
                    {featuredProjects.map(project => (
                        <ProjectCardModern key={project._id} project={project} />
                    ))}
                </div>

                <div className="see-all-container">
                    <Link to="/projects" className="see-all-btn">
                        View All Projects
                        <i>→</i>
                    </Link>
                </div>
            </div>
        </section>
    );
}

// Main HomePage Component
export default function HomePage() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        API.get("/projects")
            .then(res => setProjects(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            {/* Hero / Welcome Section */}
            <section id="home">
                <div className="container">
                    <div className="hero-content">
                        <div className="hero-text">
                            <h1>Moneesha Aravindi</h1>
                            <p>Software Engineering Graduate specializing in frontend development, system analysis, and full-stack projects.</p>
                            <button className="btn" onClick={() => {
                                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                            }}>View My Work</button>
                        </div>
                        <div className="hero-image">
                            <img src={MoneeshaImage} alt="Moneesha Aravindi" />
                        </div>
                    </div>
                </div>
            </section>

            {/* About Me Section */}
            <section id="about" className="about-section">
                <div className="container about-grid">
                    {/* Left: photo */}
                    <div className="about-photo" aria-hidden="true">
                        <img src={MoneeshaGImage} alt="Moneesha Aravindi — portrait" />
                    </div>

                    {/* Right: content */}
                    <div className="about-content">
                        <h2>About Me</h2>

                        <p className="lead">
                            I am a motivated and detail-oriented IT graduate who has successfully completed a
                            <strong> BSc (Hons) in Software Engineering</strong> at Cardiff Metropolitan University via ICBT (results pending).
                            My strongest interests lie in web development, particularly frontend design and user
                            experience, as well as system analysis and database management.
                        </p>

                        <p>
                            I enjoy transforming requirements into intuitive, responsive interfaces and well-structured
                            data systems, and I am eager to contribute my analytical mindset and technical skills to build
                            effective, user-focused digital solutions.
                        </p>

                        {/* Skill badges */}
                        <div className="skills-section" aria-hidden="false">
                            <h3>Skills</h3>
                            <ul className="skills-list" role="list">
                                <li className="skill">Java</li>
                                <li className="skill">C++</li>
                                <li className="skill">C#</li>
                                <li className="skill">PHP</li>
                                <li className="skill">JavaScript</li>
                                <li className="skill">Python</li>
                                <li className="skill">SQL</li>
                                <li className="skill">HTML &amp; CSS</li>
                                <li className="skill">React.js</li>
                                <li className="skill">Express.js</li>
                                <li className="skill">Flask</li>
                                <li className="skill">MySQL / SQL Server / MongoDB</li>
                                <li className="skill">RESTful APIs</li>
                                <li className="skill">pandas / scikit-learn</li>
                                <li className="skill">VS Code · NetBeans · Visual Studio · Android Studio · Git/GitHub · XAMPP · MySQL Workbench · phpMyAdmin · MongoDB</li>
                                <li className="skill">OOP · SDLC · Full-Stack Web Development · API Integration · ML Model Deployment</li>
                            </ul>
                        </div>

                        {/* Info cards */}
                        <div className="about-cards">
                            <div className="card">
                                <h4>Education</h4>
                                <p>BSc (Hons) Software Engineering — Cardiff Metropolitan University (ICBT)</p>
                            </div>

                            <div className="card">
                                <h4>Tools & APIs</h4>
                                <p>VS Code · Git · REST APIs · scikit-learn · Flask ML services</p>
                            </div>
                        </div>

                        {/* CTA buttons */}
                        <div className="about-cta">
                            <a href="/Moneesha_Aravindi_CV.pdf" className="btn btn-ghost" download>
                                Download CV
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Use the new ProjectsSection component */}
            <ProjectsSection />

            {/* Contact Section */}
            <section id="contact">
                <div className="container">
                    <h2>Get In Touch</h2>
                    <ContactForm />
                </div>
            </section>

            <footer className="site-footer" role="contentinfo">
                <div className="footer-inner container">
                    <div className="footer-brand">
                        <h3>Moneesha Aravindi</h3>
                        <p className="muted">BSc (Hons) Software Engineering Graduate</p>
                    </div>

                    <div className="footer-contact">
                        <a href="tel:+94703786240" aria-label="Call Moneesha" className="footer-link">
                            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 01.95-.27c1.04.27 2.17.42 3.35.42a1 1 0 011 1V20a1 1 0 01-1 1C10.07 21 3 13.93 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.18.15 2.31.42 3.35a1 1 0 01-.27.95l-2.03 2.49z" fill="currentColor" /></svg>
                            <span>+94 70 378 6240</span>
                        </a>

                        <a href="mailto:moneeshaaravindi2003@gmail.com" aria-label="Email Moneesha" className="footer-link">
                            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="currentColor" /></svg>
                            <span>moneeshaaravindi2003@gmail.com</span>
                        </a>

                        <a href="https://goo.gl/maps/placeholder" aria-label="Address" className="footer-link" target="_blank" rel="noopener noreferrer">
                            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm0 9.5A2.5 2.5 0 1112 6a2.5 2.5 0 010 5.5z" fill="currentColor" /></svg>
                            <span>Wenivelkola, Polgasowita</span>
                        </a>
                    </div>

                    <div className="footer-social">
                        <a href="https://github.com/Moneesha2003" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="social-btn">
                            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .5C5.73.5.8 5.43.8 11.7c0 4.86 3.16 8.97 7.54 10.42.55.1.74-.24.74-.52 0-.26-.01-.95-.02-1.86-3.07.67-3.72-1.48-3.72-1.48-.5-1.27-1.22-1.61-1.22-1.61-.99-.68.07-.67.07-.67 1.09.07 1.66 1.12 1.66 1.12.97 1.66 2.55 1.18 3.17.9.1-.7.38-1.18.69-1.45-2.45-.28-5.02-1.23-5.02-5.48 0-1.21.43-2.2 1.12-2.98-.11-.28-.49-1.41.11-2.94 0 0 .91-.29 2.98 1.13a10.24 10.24 0 015.42 0c2.07-1.41 2.98-1.13 2.98-1.13.6 1.53.22 2.66.11 2.94.7.78 1.12 1.77 1.12 2.98 0 4.26-2.58 5.2-5.04 5.48.39.34.73 1.01.73 2.04 0 1.47-.01 2.66-.01 3.02 0 .28.19.62.75.51 4.38-1.45 7.53-5.56 7.53-10.41C23.2 5.43 18.27.5 12 .5z" fill="currentColor" /></svg>
                        </a>

                        <a href="http://linkedin.com/in/moneesha-aravindi-b010762bb" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-btn">
                            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 0H5C2.24 0 0 2.24 0 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5V5c0-2.76-2.24-5-5-5zM7.12 20.5H3.56V9H7.12v11.5zM5.34 7.67c-1.13 0-2.05-.92-2.05-2.05S4.21 3.57 5.34 3.57s2.05.92 2.05 2.05c0 1.13-.92 2.05-2.05 2.05zM20.5 20.5h-3.57v-5.78c0-1.38-.03-3.16-1.93-3.16-1.94 0-2.24 1.52-2.24 3.07v5.87H9.9V9h3.43v1.57h.05c.48-.9 1.65-1.85 3.4-1.85 3.64 0 4.3 2.4 4.3 5.51v6.27z" fill="currentColor" /></svg>
                        </a>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>© 2025 Moneesha Aravindi | All Rights Reserved</p>
                </div>
            </footer>
        </div>
    );
}
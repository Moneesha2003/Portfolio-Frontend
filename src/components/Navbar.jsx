// src/components/Navbar.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Helper to scroll to a section id smoothly (if exists)
  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(sectionId);
    }
  };

  // Call when clicking nav links
  const handleNavClick = (section, e) => {
    if (e) e.preventDefault();

    // For Projects link we want to go to /projects route (not the home anchor)
    if (section === "projects") {
      // If already on /projects just do nothing (or highlight)
      if (location.pathname === "/projects") {
        setActiveSection("projects");
        return;
      }
      // If on home and you want to scroll to '#projects' inside home, swap this logic accordingly.
      navigate("/projects");
      setActiveSection("projects");
      return;
    }

    // For other sections (home/about/contact) we navigate to home then scroll
    if (location.pathname === "/") {
      scrollToSection(section);
    } else {
      // Navigate to home first, then scroll after a small delay to allow rendering
      navigate("/");
      // small delay so the Home page DOM has a chance to render
      setTimeout(() => scrollToSection(section), 80);
    }
  };

  // Scroll listener only needed on home page
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      if (location.pathname !== "/") return;

      const sections = ["home", "about", "projects", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // init
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  // Ensure active state reflects current route when mounted / route changed
  useEffect(() => {
    if (location.pathname === "/") {
      // keep whatever activeSection is (or default to home)
      setActiveSection((prev) => (prev ? prev : "home"));
    } else if (location.pathname.startsWith("/projects")) {
      setActiveSection("projects");
    } else if (location.pathname.startsWith("/admin")) {
      // if you have admin routes and want to highlight nothing, you can set ""
      setActiveSection("");
    } else {
      setActiveSection("");
    }
  }, [location.pathname]);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="container">
        <h1 style={{ cursor: "pointer" }} onClick={(e) => handleNavClick("home", e)}>Moneesha Aravindi</h1>
        <ul>
          <li>
            <a
              href="#home"
              className={activeSection === "home" ? "active" : ""}
              onClick={(e) => handleNavClick("home", e)}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#about"
              className={activeSection === "about" ? "active" : ""}
              onClick={(e) => handleNavClick("about", e)}
            >
              About
            </a>
          </li>
          <li>
            {/* Projects link goes to the Projects route */}
            <a
              href="/projects"
              className={activeSection === "projects" ? "active" : ""}
              onClick={(e) => handleNavClick("projects", e)}
            >
              Projects
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className={activeSection === "contact" ? "active" : ""}
              onClick={(e) => handleNavClick("contact", e)}
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

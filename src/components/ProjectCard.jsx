import React from "react";

export default function ProjectCard({ project }) {
  // Function to render image from base64 data
  const renderImage = () => {
    if (project.coverImage && project.coverImage.data) {
      return (
        <img
          src={`data:${project.coverImage.contentType};base64,${project.coverImage.data}`}
          alt={project.title}
          className="project-image"
        />
      );
    }
    return null;
  };

  return (
    <div className="project-card" role="article" aria-label={project.title}>
      <div className="project-media">
        {renderImage()}
      </div>

      <div className="project-body">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-desc">{project.description}</p>

        <div className="project-actions">
          {project.repoUrl && (
            <a
              className="github-btn"
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.title} on GitHub`}
            >
              Go to GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

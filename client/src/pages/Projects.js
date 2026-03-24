import { useEffect, useState } from "react";

import portfolio from "../images/portfolio.png";
import weather from "../images/weather.png";
import todo from "../images/todo.png";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/projects")
      .then(res => res.json())
      .then(data => setProjects(data));
  }, []);

  const addProject = () => {
    if (!newProject) return;

    fetch("http://localhost:5000/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newProject })
    })
      .then(res => res.json())
      .then(data => {
        setProjects([...projects, data]);
        setNewProject("");
      });
  };

  const deleteProject = (id) => {
    fetch(`http://localhost:5000/projects/${id}`, {
      method: "DELETE"
    }).then(() => {
      setProjects(projects.filter(p => p.id !== id));
    });
  };

  const editProject = (id) => {
    const name = prompt("New name:");
    if (!name) return;

    fetch(`http://localhost:5000/projects/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name })
    }).then(() => {
      setProjects(
        projects.map(p => (p.id === id ? { ...p, name } : p))
      );
    });
  };

  return (
    <div className="container">
      <h1>My Projects</h1>

      <input
        value={newProject}
        onChange={(e) => setNewProject(e.target.value)}
        placeholder="Enter project name"
        style={{ padding: "10px", marginRight: "10px" }}
      />

      <button onClick={addProject}>Add Project</button>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginTop: "20px" }}>
        {projects.map((project, index) => {
          let img = index === 0 ? portfolio : index === 1 ? weather : todo;

          return (
            <div className="card" key={project.id}>
              <img src={img} alt="project" />
              <h3>{project.name}</h3>

              <button onClick={() => editProject(project.id)}>Edit</button>
              <button
                className="delete"
                onClick={() => deleteProject(project.id)}
                style={{ marginLeft: "10px" }}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Projects;
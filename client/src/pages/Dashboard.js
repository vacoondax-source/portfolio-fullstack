import { useEffect, useState } from "react";

function Dashboard() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/projects")
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>

      <p>Total Projects: {projects.length}</p>

      {projects.map(project => (
        <p key={project.id}>✔ {project.name}</p>
      ))}
    </div>
  );
}

export default Dashboard;
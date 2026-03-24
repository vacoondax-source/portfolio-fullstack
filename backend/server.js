const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());

const DB_FILE = "./db.json";

// READ DATA
const getData = () => {
  const data = fs.readFileSync(DB_FILE);
  return JSON.parse(data);
};

// WRITE DATA
const saveData = (data) => {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};



// ✅ GET PROJECTS
app.get("/projects", (req, res) => {
  const data = getData();
  res.json(data.projects);
});



// ✅ ADD PROJECT (POST + VALIDATION)
app.post("/projects", (req, res) => {
  const data = getData();

  const name = req.body.name;

  // VALIDATION
  if (!name || name.trim() === "") {
    return res.status(400).json({
      error: "Project name is required"
    });
  }

  const newProject = {
    id: Date.now(),
    name
  };

  data.projects.push(newProject);
  saveData(data);

  res.json(newProject);
});



// ✅ DELETE PROJECT
app.delete("/projects/:id", (req, res) => {
  const data = getData();

  const id = parseInt(req.params.id);

  data.projects = data.projects.filter(p => p.id !== id);

  saveData(data);

  res.json({ message: "Deleted" });
});



// ✅ EDIT PROJECT (PUT + VALIDATION)
app.put("/projects/:id", (req, res) => {
  const data = getData();

  const id = parseInt(req.params.id);
  const name = req.body.name;

  // VALIDATION
  if (!name || name.trim() === "") {
    return res.status(400).json({
      error: "Project name cannot be empty"
    });
  }

  data.projects = data.projects.map(p =>
    p.id === id ? { ...p, name } : p
  );

  saveData(data);

  res.json({ message: "Updated" });
});



// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Server is working 🚀");
});



app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar">
      <h2>My Portfolio</h2>

      <div className="nav-links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/projects">Projects</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </div>
    </div>
  );
}

export default Navbar;
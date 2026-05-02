import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        padding: "15px",
        backgroundColor: "#222",
        display: "flex",
        gap: "20px",
      }}
    >
      <Link to="/" style={{ color: "white", textDecoration: "none" }}>
        Login
      </Link>

      <Link to="/register" style={{ color: "white", textDecoration: "none" }}>
        Register
      </Link>

      <Link to="/dashboard" style={{ color: "white", textDecoration: "none" }}>
        Dashboard
      </Link>

      <Link to="/tasks" style={{ color: "white", textDecoration: "none" }}>
        Tasks
      </Link>
    </nav>
  );
}

export default Navbar;
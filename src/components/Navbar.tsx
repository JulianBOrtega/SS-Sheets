import { Link } from "react-router-dom";
import './Navbar.css';

export const Navbar = () => {
  return (
    <nav className="navList">
        <Link className="navLink" to="/">Home</Link>
        {/* <Link className="navLink" to="/Sheets">Sheets</Link> */}
        <Link className="navLink" to="/Logs">Logs</Link>
        <Link className="navLink" to="/Settings">Settings</Link>
    </nav>
  )
}

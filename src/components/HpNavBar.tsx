import { Link, NavLink } from "react-router-dom";
import "./HpNavBar.css";
import logo from "../assets/layer.png";

export function HpNavBar() {
  return (
    <nav>
      <Link to={"/homepage"} className="logo logo-complete">
        <img src={logo} alt="JuvoStack Logo" className="logo-pic" />
        <span className="first-title">Juvo</span>
        <span className="second-title">Stack</span>
      </Link>
      <Link to={""} className="header-link">
        About
      </Link>
      <Link to={""} className="header-link">
        Products
      </Link>
      <Link to={""} className="header-link">
        For Teams
      </Link>
      <input type="search" placeholder="Search..." />
      <NavLink to="/signin" className="login-btn">
        Log in
      </NavLink>
      <NavLink to="/sign-up" className="signup-btn">
        Sign up
      </NavLink>
    </nav>
  );
}

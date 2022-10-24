import { Link, NavLink } from "react-router-dom";
import "./SiNavBar.css";
import logo from "../assets/layer.png";
import { CgProfile, CgInbox } from "react-icons/cg";
import { GrAchievement } from "react-icons/gr";
import { BsFillQuestionCircleFill } from "react-icons/bs";

type Props = {
  currentUser: any;
  signOut: () => void;
};

export function SiNavBar({ currentUser, signOut }: Props) {
  return (
    <nav className="signedin-navbar">
      <Link to={"/community-questions"} className="logo logo-complete">
        <img src={logo} alt="JuvoStack Logo" className="logo-pic" />
        <span className="signed-first-title">Juvo</span>
        <span className="signed-second-title">Stack</span>
      </Link>
      <Link to={""} className="header-link">
        Products
      </Link>
      <input
        className="signedin-search"
        type="search"
        placeholder="Search..."
      />
      <Link to={""}>
        <CgProfile className="signed-in-header-icons" />
      </Link>
      <Link to={""}>
        <CgInbox className="signed-in-header-icons" />
      </Link>
      <Link to={""}>
        <GrAchievement className="signed-in-header-icons" />
      </Link>
      <Link to={""}>
        <BsFillQuestionCircleFill className="signed-in-header-icons" />
      </Link>
      <button
        onClick={() => {
          signOut();
          localStorage.removeItem("token");
        }}
        className="logout-btn"
      >
        Log out
      </button>
    </nav>
  );
}

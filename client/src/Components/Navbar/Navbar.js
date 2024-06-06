import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // 스타일링을 위한 CSS 파일

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>Logo</h1>
      </div>
      <ul className="navbar-menu">
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/records">기록열람</Link>
        </li>
        <li>
          <Link to="/statistics">통계</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

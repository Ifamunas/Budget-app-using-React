import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <Link to="/Contact">Contact Us</Link>
      <Link to="/About">About Us</Link>
    </nav>
  );
};

export default NavBar;

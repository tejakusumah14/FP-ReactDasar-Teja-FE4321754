import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <h1
        style={{
          backgroundColor: "Blue",
          color: "white",
          padding: "10px",
        }}
      >
        <Link
          data-testid="home-page"
          to="/"
          style={{ textDecoration: "none", color: "white" }}
        >
          Student Portal
        </Link>
      </h1>
      <ul
        style={{
          listStyleType: "none",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <li style={{ margin: "0 10px" }}>
          <Link
            data-testid="student-page"
            to="/student"
            style={{ textDecoration: "none" }}
          >
            All Students
          </Link>
        </li>
        <li style={{ margin: "0 10px" }}>
          <Link
            data-testid="add-page"
            to="/add"
            style={{ textDecoration: "none" }}
          >
            Add Student
          </Link>
        </li>
      </ul>
    </>
  );
};

export default NavBar;

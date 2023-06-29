import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div
      style={{
        background: "lightblue",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "500px",
          padding: "50px",
          background: "white",
          borderRadius: "10px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
        }}
      >
        <div>
          <h1
            style={{
              textAlign: "center",
              fontSize: "24px",
              marginBottom: "10px",
            }}
          >
            Studi Independen <br /> Kampus Merdeka
          </h1>
          <h3
            style={{ textAlign: "center", color: "gray", marginBottom: "20px" }}
          >
            By Ruangguru
          </h3>
        </div>
        <hr
          style={{
            width: "30%",
            height: "3px",
            transform: "rotate(90deg)",
            backgroundColor: "lightgray",
            border: "none",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1
            style={{ textAlign: "center", fontSize: "28px", marginTop: "20px" }}
          >
            Home
          </h1>
          <button
            style={{
              background: "blue",
              color: "white",
              padding: "10px 20px",
              borderRadius: "4px",
              marginTop: "20px",
              border: "none",
              cursor: "pointer",
            }}
          >
            <Link
              data-testid="student-btn"
              to="/student"
              style={{ textDecoration: "none", color: "white" }}
            >
              All Student
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/Navbar";

const Student = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState("All");

  useEffect(() => {
    fetchData();
  }, []);
  console.log("Student List: ", students);

  async function fetchData() {
    const data = await fetch("http://localhost:3001/student");
    const dataJSON = await data.json();

    setLoading(false);
    setStudents(dataJSON);
    setFilteredStudents(dataJSON);
  }

  const handleFilterChange = (e) => {
    const faculty = e.target.value;
    setSelectedFaculty(faculty);

    if (faculty === "All") {
      setFilteredStudents(students);
    } else {
      const filtered = students.filter(
        (student) => student.faculty === faculty
      );
      setFilteredStudents(filtered);
    }
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:3001/student/${id}`, {
      method: "DELETE",
    });
    const updatedStudents = students.filter((student) => student.id !== id);
    setStudents(updatedStudents);
    setFilteredStudents(updatedStudents);
  };

  return (
    <>
      <NavBar />
      {loading ? (
        <h1 style={{ textAlign: "center", marginTop: "20px" }}>Loading ...</h1>
      ) : (
        <div>
          <select
            value={selectedFaculty}
            onChange={handleFilterChange}
            data-testid="filter"
            style={{
              padding: "5px",
              marginBottom: "10px",
              borderRadius: "5px",
            }}
          >
            <option value="All">All</option>
            <option value="Fakultas Ekonomi">Fakultas Ekonomi</option>
            <option value="Fakultas Ilmu Sosial dan Politik">
              Fakultas Ilmu Sosial dan Politik
            </option>
            <option value="Fakultas Teknik">Fakultas Teknik</option>
            <option value="Fakultas Teknologi Informasi dan Sains">
              Fakultas Teknologi Informasi dan Sains
            </option>
          </select>
          <table
            id="table-student"
            style={{
              backgroundColor: "#f2f2f2",
              padding: "10px",
              textAlign: "left",
            }}
          >
            <thead>
              <th
                style={{
                  backgroundColor: "#f2f2f2",
                  padding: "10px",
                  textAlign: "left",
                }}
              >
                No
              </th>
              <th
                style={{
                  backgroundColor: "#f2f2f2",
                  padding: "10px",
                  textAlign: "left",
                }}
              >
                Full Name
              </th>
              <th
                style={{
                  backgroundColor: "#f2f2f2",
                  padding: "10px",
                  textAlign: "left",
                }}
              >
                Faculty
              </th>
              <th
                style={{
                  backgroundColor: "#f2f2f2",
                  padding: "10px",
                  textAlign: "left",
                }}
              >
                Program Study
              </th>
              <th
                style={{
                  backgroundColor: "#f2f2f2",
                  padding: "10px",
                  textAlign: "left",
                }}
              >
                Option
              </th>
            </thead>
            <tbody>
              {filteredStudents.map((student, index) => {
                return (
                  <tr
                    className="student-data-row"
                    key={student.id}
                    style={{ borderBottom: "1px solid #ccc" }}
                  >
                    <td style={{ padding: "10px" }}>{index + 1}</td>
                    <td style={{ padding: "10px" }}>
                      <Link
                        to={`/student/${student.id}`}
                        style={{
                          color: "#333",
                          textDecoration: "none",
                          fontWeight: "bold",
                        }}
                      >
                        {student.fullname}
                      </Link>
                    </td>
                    <td style={{ padding: "10px" }}>{student.faculty}</td>
                    <td style={{ padding: "10px" }}>{student.programStudy}</td>
                    <td style={{ padding: "10px" }}>
                      <button
                        onClick={() => handleDelete(student.id)}
                        data-testid={`delete-${student.id}`}
                        style={{
                          backgroundColor: "#e74c3c",
                          color: "white",
                          border: "none",
                          borderRadius: "5px",
                          padding: "5px 10px",
                          cursor: "pointer",
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Student;

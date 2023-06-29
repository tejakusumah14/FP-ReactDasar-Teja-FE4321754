import { useEffect, useState } from "react";
import NavBar from "../components/Navbar";
import { useParams, useNavigate } from "react-router-dom";

const EditStudent = () => {
  const [fullname, setFullname] = useState("");
  const [profilePicture, setProfilePicture] = useState();
  const [address, setAddress] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [programStudy, setProgramStudy] = useState("");

  const [student, setStudent] = useState({});
  const [loading, setLoading] = useState(true);

  let { id } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    console.log("useEffect line 21");
    fetchData();
  }, [id]);

  async function fetchData() {
    const data = await fetch(`http://localhost:3001/student/${id}`);
    const dataJSON = await data.json();

    setLoading(false);
    setStudent(dataJSON);

    setFullname(dataJSON.fullname);
    setProfilePicture(dataJSON.profilePicture);
    setAddress(dataJSON.address);
    setPhoneNumber(dataJSON.phoneNumber);
    setBirthDate(dataJSON.birthDate);
    setGender(dataJSON.gender);
    setProgramStudy(dataJSON.programStudy);
  }

  const submitStudent = async (student) => {
    console.log(student);
    await fetch(`http://localhost:3001/student/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    });
  };

  console.log("Fullname now: ", fullname);
  // update state while form input change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log("handleInputChange name: ", name);
    console.log("handleInputChange value: ", value);
    if (name === "fullname") {
      setFullname(value);
    } else if (name === "profilePicture") {
      setProfilePicture(value);
    } else if (name === "address") {
      setAddress(value);
    } else if (name === "phoneNumber") {
      setPhoneNumber(value);
    } else if (name === "birthDate") {
      setBirthDate(value);
    } else if (name === "gender") {
      setGender(value);
    } else if (name === "programStudy") {
      setProgramStudy(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newStudent = {
      fullname,
      profilePicture,
      address,
      phoneNumber,
      birthDate,
      gender,
      programStudy,
      faculty: getFacultyByProgramStudy(programStudy),
    };
    console.log(newStudent);

    // console.log(newStudent);
    await submitStudent(newStudent);

    setFullname("");
    setBirthDate("");
    setGender("");
    setProgramStudy("");

    navigate("/student");
  };

  const getFacultyByProgramStudy = (programStudy) => {
    switch (programStudy) {
      case "Ekonomi":
      case "Manajemen":
      case "Akuntansi":
        return "Fakultas Ekonomi";
      case " Administrasi Publik":
      case "Administrasi Bisnis":
      case "Hubungan Internasional":
        return "Fakultas Ilmu Sosial dan Politik";
      case "Teknik Sipil":
      case "Arsitektur":
        return "Fakultas Teknik";
      case "Matematika":
      case "Fisika":
      case "Informatika":
        return "Fakultas Teknologi Informasi dan Sains";
      default:
        return "";
    }
  };

  return (
    <>
      <NavBar />

      {loading ? (
        <h1 style={{ textAlign: "center", marginTop: "20px" }}>Loading ...</h1>
      ) : (
        <>
          {/* <div className="image">
            <img src={student.profilePicture} alt={student.fullname} />
          </div> */}

          <div
            className="details"
            style={{
              maxWidth: "400px",
              margin: "0 auto",
              padding: "20px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          >
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "10px" }}>
                <label htmlFor="profilePicture">Profile Picture:</label> <br />
                <img
                  src={student.profilePicture}
                  alt={student.fullname}
                  type="text"
                  id="profilePicture"
                  name="profilePicture"
                  value={profilePicture}
                  data-testid="profilePicture"
                  style={{ width: "100%", marginBottom: "10px" }}
                />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <label htmlFor="fullname">Full Name:</label>
                <input
                  type="text"
                  id="fullname"
                  name="fullname"
                  value={fullname}
                  onChange={handleInputChange}
                  data-testid="name"
                  style={{ width: "100%", padding: "5px" }}
                />
              </div>

              <div style={{ marginBottom: "10px" }}>
                <label htmlFor="address">Address:</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={address}
                  onChange={handleInputChange}
                  data-testid="address"
                  style={{ width: "100%", padding: "5px" }}
                />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <label htmlFor="phoneNumber">Phone Number:</label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={handleInputChange}
                  data-testid="phoneNumber"
                  style={{ width: "100%", padding: "5px" }}
                />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <label htmlFor="birthDate">Birth Date:</label>
                <input
                  type="date"
                  id="birthDate"
                  name="birthDate"
                  value={birthDate}
                  onChange={handleInputChange}
                  data-testid="date"
                  style={{ width: "100%", padding: "5px" }}
                />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <label htmlFor="gender">Gender:</label>
                <select
                  id="gender"
                  name="gender"
                  value={gender}
                  onChange={handleInputChange}
                  data-testid="gender"
                  style={{ width: "100%", padding: "5px" }}
                >
                  <option value="">-- Select Gender --</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div style={{ marginBottom: "10px" }}>
                <label htmlFor="progamStudy">Program Study:</label>
                <select
                  id="programStudy"
                  name="programStudy"
                  value={programStudy}
                  onChange={handleInputChange}
                  data-testid="prody"
                  style={{ width: "100%", padding: "5px" }}
                >
                  <option value="">-- Select Program Study --</option>
                  <option value="Ekonomi">Ekonomi</option>
                  <option value="Manajemen">Manajemen</option>
                  <option value="Akuntansi">Akuntansi</option>
                  <option value="Administrasi Publik">
                    Administrasi Publik
                  </option>
                  <option value="Administrasi Bisnis">
                    Administrasi Bisnis
                  </option>
                  <option value="Hubungan Internasional">
                    Hubungan Internasional
                  </option>
                  <option value="Teknik Sipil">Teknik Sipil</option>
                  <option value="Arsitektur">Arsitektur</option>
                  <option value="Matematika">Matematika</option>
                  <option value="Fisika">Fisika</option>
                  <option value="Informatika">Informatika</option>
                </select>
              </div>

              <button
                type="submit"
                data-testid="edit-btn"
                style={{
                  display: "block",
                  width: "100%",
                  padding: "10px",
                  marginTop: "10px",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Edit student
              </button>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default EditStudent;

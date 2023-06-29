import { useState } from "react";
import NavBar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const AddStudent = () => {
  const [fullname, setFullname] = useState("");
  const [profilePicture, setProfilePicture] = useState();
  const [address, setAddress] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [programStudy, setProgramStudy] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
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
    await fetch("http://localhost:3001/student", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newStudent),
    });
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <form onSubmit={handleSubmit} style={{ width: "300px" }}>
          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="fullname">Full Name:</label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              value={fullname}
              onChange={handleInputChange}
              data-testid="name"
              style={{ width: "100%" }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="profilePicture">Profile Picture:</label>
            <input
              type="url"
              id="profilePicture"
              name="profilePicture"
              value={profilePicture}
              onChange={handleInputChange}
              data-testid="profilePicture"
              style={{ width: "100%" }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={address}
              onChange={handleInputChange}
              data-testid="address"
              style={{ width: "100%" }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={phoneNumber}
              onChange={handleInputChange}
              data-testid="phoneNumber"
              style={{ width: "100%" }}
            />
          </div>
          <div>
            <label htmlFor="birthDate">Birth Date:</label>
            <input
              type="date"
              id="birthDate"
              name="birthDate"
              value={birthDate}
              onChange={handleInputChange}
              data-testid="date"
              style={{ width: "100%" }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="gender">Gender:</label>
            <select
              id="gender"
              name="gender"
              value={gender}
              onChange={handleInputChange}
              data-testid="gender"
              style={{ width: "100%" }}
            >
              <option value="">-- Select Gender --</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="progamStudy">Program Study:</label>
            <select
              id="programStudy"
              name="programStudy"
              value={programStudy}
              onChange={handleInputChange}
              data-testid="prody"
              style={{ width: "100%" }}
            >
              <option value="">-- Select Program Study --</option>
              <option value="Ekonomi">Ekonomi</option>
              <option value="Manajemen">Manajemen</option>
              <option value="Akuntansi">Akuntansi</option>
              <option value="Administrasi Publik">Administrasi Publik</option>
              <option value="Administrasi Bisnis">Administrasi Bisnis</option>
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
            data-testid="add-btn"
            style={{
              backgroundColor: "blue",
              color: "white",
              padding: "10px 20px",
              borderRadius: "4px",
              border: "none",
              cursor: "pointer",
              width: "100%",
            }}
          >
            Add student
          </button>
        </form>
      </div>
    </>
  );
};

export default AddStudent;

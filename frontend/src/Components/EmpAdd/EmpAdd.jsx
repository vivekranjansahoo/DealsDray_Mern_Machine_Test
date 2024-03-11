import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Adminnav from "../Navbar/Adminnav";

import { registerRoute } from "../../Routes/Apiroutes.js";

export default function EmpAdd() {
  const navigate = useNavigate();
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [mobno, setmobno] = useState("");
  const [designation, setdesignation] = useState("");
  const [gender, setgender] = useState("");
  const [course, setcourse] = useState([]);
  const [image, setimage] = useState("");

  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleCheckboxChange = (value) => {
    if (course.includes(value)) {
      setcourse(course.filter((item) => item !== value));
    } else {
      setcourse([...course, value]);
    }
  };

  const validateForm = () => {
    if (
      email === "" ||
      name === "" ||
      mobno === "" ||
      designation === "" ||
      gender === "" ||
      course === "" ||
      image === ""
    ) {
      toast.error("All fields are required.", toastOptions);
      return false;
    } else if (mobno.length > 10 || mobno.length < 10) {
      toast.error("Mobile number should be 10 digit", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(name, email, mobno, designation, gender, course, image);
    if (validateForm()) {
      try {
        var courses = course.toString();
        console.log(course.toString());

        const response = await axios.post(registerRoute, {
          name,
          email,
          mobno,
          designation,
          gender,
          course: courses,
          image,
        });
        console.log(response);
        if (response.data.message == "User registered successfully") {
          await toast.success("Employee added  successfully", {
            ...toastOptions,
          });
        }
      } catch (error) {
        toast.error("Error form server side", toastOptions);
        console.error("Login failed:", error);
      }
    }
  };

  return (
    <>
      <Adminnav />
      <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <h1>Create Employee</h1>
          </div>
          <p style={{ color: "white" }}>Name</p>
          <input
            type="text"
            className="input-group"
            placeholder="name"
            name="name"
            onChange={(e) => setname(e.target.value)}
          />
          <p style={{ color: "white" }}>Email</p>
          <input
            type="email"
            className="input-group"
            placeholder="Email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            min="3"
          />
          <p style={{ color: "white" }}>Mobile No</p>
          <input
            type="number"
            className="input-group"
            placeholder="700XXXXXX"
            name="mobno"
            onChange={(e) => setmobno(e.target.value)}
          />
          <p style={{ color: "white" }}>Designation</p>
          <select
            className="input-group"
            onChange={(e) => setdesignation(e.target.value)}
            style={{ color: "yellow", backgroundColor: "black" }}
          >
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>

          <p style={{ color: "white" }}>Gender</p>

          <label style={{ color: "white" }}>
            <input
              type="radio"
              onChange={(e) => setgender(e.target.value)}
              name="gender"
              value="male"
            />
            Male <br />
            <input
              type="radio"
              name="gender"
              value="female"
              onChange={(e) => setgender(e.target.value)}
            />
            Female
          </label>

          <p style={{ color: "white" }}>Course</p>
          <label style={{ color: "white" }}>
            <input
              type="checkbox"
              value="MCA"
              checked={course.includes("MCA")}
              onChange={() => handleCheckboxChange("MCA")}
            />
            MCA <br />
            <input
              type="checkbox"
              value="MCA"
              checked={course.includes("BCA")}
              onChange={() => handleCheckboxChange("BCA")}
            />
            BCA <br />
            <input
              type="checkbox"
              value="MCA"
              checked={course.includes("BSC")}
              onChange={() => handleCheckboxChange("BSC")}
            />
            BSC <br />
          </label>

          <p style={{ color: "white" }}>Image Upload</p>
          <input
            type="file"
            accept="image/jpeg, image/png"
            style={{ color: "white" }}
            onChange={(e) => setimage(e.target.value)}
          />
          <button type="submit">Add Employee</button>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  //   height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
      font-size: 40px;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 6rem;
  }
  .input-group {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;

    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 3rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

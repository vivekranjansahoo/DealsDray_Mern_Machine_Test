import { useState } from "react";

import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../../Components/Navbar/Navbar";
import axios from "axios";
import { loginRoute } from "../../Routes/Apiroutes";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const validateForm = () => {
    if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Password is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post(loginRoute, {
          email,
          password,
        });
        if (response.data.token) {
          await toast.success("Successfully logged in", {
            ...toastOptions,
          });

          localStorage.setItem("usertoken", response.data.token);

          setTimeout(() => {
            navigate("/userdashboard");
          }, 2000);
        }
        console.log("Login successful. Token:", response.data.token);
      } catch (error) {
        toast.error("Please correct your email or password", toastOptions);
        console.error("Login failed:", error);
      }
    }
  };

  return (
    <>
      <Navbar />
      <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <h1>Login</h1>
          </div>
          <p style={{ color: "white" }}>Username</p>
          <input
            type="text"
            placeholder="Email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            min="3"
          />
          <p style={{ color: "white" }}>Password</p>
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Log In</button>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  width: 98vw;
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
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    margin-left: 2rem;
    margin-top: 2rem;
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

import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login/Login";
import EmpAdd from "./Components/EmpAdd/EmpAdd";
import AdminDashboard from "./Pages/Admin/AdminDashboard/AdminDashboard";
import EmpDetails from "./Components/EmpDetails/EmpDetails";
import AdminLogin from "./Pages/Admin/AdminLogin/AdminLogin";
import EmpUpdate from "./Components/EmpUpdate/EmpUpdate";
import Userdashboard from "./Pages/Login/Userdashboard";
import Home from "./Pages/Home/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/userdashboard" element={<Userdashboard />} />
        <Route exact path="/adminlogin" element={<AdminLogin />} />
        <Route exact path="/admindashboard" element={<AdminDashboard />} />
        <Route exact path="/admin/empadd" element={<EmpAdd />} />
        <Route exact path="/admin/empdetails" element={<EmpDetails />} />
        <Route exact path="/admin/empupdate/:id" element={<EmpUpdate />} />
      </Routes>
    </div>
  );
}

export default App;

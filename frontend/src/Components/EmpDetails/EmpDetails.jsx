import React, { useEffect, useState } from "react";
import "./EmpDetails.css";
import Adminnav from "../Navbar/Adminnav";
import axios from "axios";
import { empdelete, empdetails } from "../../Routes/Apiroutes";
import { Link } from "react-router-dom";

const EmpDetails = () => {
  const [allemp, setallemp] = useState([]);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    const filteredResults = allemp.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  const getemp = async () => {
    try {
      const response = await axios.get(empdetails);
      console.log(response.data);
      if (response.status === 200) {
        if (Array.isArray(response.data)) {
          setallemp(response.data);
          setSearchResults(response.data);
        } else {
          console.error("Data fetched from API is not an array");
        }
      } else {
        console.error(
          "Failed to fetch data from API. Status:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error fetching data from API:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${empdelete}/${id}`);
      console.log(res);
      alert("Successfully deleted");
    } catch (error) {
      alert("error from server side");
    }
  };

  useEffect(() => {
    getemp();
  }, []);

  return (
    <>
      <Adminnav />
      <div className="containe">
        <h1 style={{ margin: "50px 0px" }}>Employee Details</h1>
        <h1 style={{ textAlign: "center" }}>
          <input
            type="text"
            placeholder="Search by name..."
            value={query}
            onChange={handleInputChange}
          />
          <button onClick={handleSearch}>Search</button>
        </h1>
        <table className="rwd-table">
          <tbody>
            <tr>
              <th>Unique Id</th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile No</th>
              <th>Designation</th>
              <th>Gender</th>
              <th>Course</th>
              <th>Create date</th>
              <th>Action</th>
            </tr>
          </tbody>

          <tbody>
            {searchResults.map((emp, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{emp.image}</td>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.mobno}</td>
                <td>{emp.designation}</td>
                <td>{emp.gender}</td>
                <td>{emp.course}</td>
                <td>12-feb-24</td>
                <td>
                  <Link to={`/admin/empupdate/${emp._id}`}>
                    <input type="button" value="Edit" />
                  </Link>
                  <input
                    type="button"
                    value="Delete"
                    onClick={() => handleDelete(emp._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default EmpDetails;

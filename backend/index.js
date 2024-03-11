const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 5000;
const SECRET_KEY = "vivek";

app.use(cors());

mongoose
  .connect(
    "mongodb://127.0.0.1:27017/dealsdray?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.1",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use(express.json({ limit: "50mb" }));

app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

const Emp = require("./Models/Emp");

//for employee login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Emp.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, SECRET_KEY);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Failed to login" });
  }
});

// employee register
app.post("/register", async (req, res) => {
  try {
    const { name, email, mobno, designation, gender, course, image } = req.body;
    const existingUser = await Emp.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const newUser = new Emp({
      name,
      email,
      mobno,
      designation,
      gender,
      course,
      image,
    });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to register user" });
  }
});

app.get("/getemp", async (req, res) => {
  try {
    const data = await Emp.find();
    if (data) {
      res.json(data);
    } else {
      res.status(404).json({ message: "Data not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch" });
  }
});

app.delete("/deleteemp/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Emp.findByIdAndDelete(id);
    if (!data) {
      return res.status(404).json({ message: "emp not found" });
    }
    res.json({ message: "emp deleted successfully", data });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch" });
  }
});

app.get("/empdetails/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Emp.findById(id);
    if (!data) {
      return res.status(404).json({ message: "emp not found" });
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch" });
  }
});

app.put("/updateemp/:id", async (req, res) => {
  const id = req.params.id;
  const { name, email, mobno, designation, gender, course, image } = req.body;
  try {
    await Emp.findByIdAndUpdate(id, req.body);
    res.json({ message: "Employee details updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch" });
  }
});

const verifyToken = (req, res, next) => {
  const token = req.headers.token;
  if (!token) {
    return res.status(403).json({ message: "Token not provided" });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.userId = decoded.userId;
    next();
  });
};

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

const express = require("express");
const { connectDB } = require("./db");
const { User } = require("./model");
const bcrypt = require("bcryptjs");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();
// Registration
app.post("/reg", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // FIXED: hashing correct password
    const hashedpass = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedpass,
    });

    res.status(200).json({ message: "Registration Successful", newUser });
  } catch (err) {
    res.status(400).json({ message: "Server Error", error: err.message });
  }
});

// login Checking Validatation
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email And Password are Required" });
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.status(400).json({ message: "User Not Found" });
  }
  const passcompare = await bcrypt.compare(password, user.password);
  if (!passcompare) {
    return res
      .status(400)
      .json({ success: false, message: "Password Does Not match" });
  }
  res
    .status(201)
    .json({ success: true, message: "Login Successfully...", user });
});

// Get All Data
app.get("/getall", async (req, res) => {
  const alldata = await User.find();
  res.status(201).json({ success: true, alldata });
});

// Get Specifice user Data
app.get("/get/:id", async (req, res) => {
  const id = req.params.id;
  const userid = await User.findById(id);
  if (!userid) {
    return res.status(401).json({ message: "User Not Found" });
  }
  res.status(201).json({ success: true, userid });
});
// Update Data
app.put("/update/:id", async (req, res) => {
  const id = req.params.id;
  const { name, email } = req.body;
  if (!name || !email) {
    return;
    res.status(401).json({ message: "Name And Email Not Found" });
  }
  const update = await User.findByIdAndUpdate(
    id,
    { name, email },
    { new: true, runValidators: true }
  );
  if (!update) {
    return res.status(401).json({ message: "Update User Not Found" });
  }
  res
    .status(201)
    .json({ success: true, message: "Update SuccessFully...", update });
});

// Delete
app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  const deleteuser = await User.findByIdAndDelete(id);

  if (!deleteuser) {
    return res.status(401).json({ message: "User Not Found" });
  }
  res
    .status(201)
    .json({ success: true, message: "Update Successfully.....", deleteuser });
});
app.listen(5000, () => {
  console.log("Server running on port 5000");
});

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

const SECRET_KEY = "your_jwt_secret"; // Change this in production

// 🟢 Registration Endpoint
app.post('/register', async (req, res) => {
    const { name, email, password, gender, collegeId } = req.body;

    // Validate email (must be a college email)
    if (!email.endsWith("@college.edu")) {
        return res.status(400).json({ error: "Use a valid college email" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const newUser = new User({ name, email, password: hashedPassword, gender, collegeId });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: "Registration failed" });
    }
});

// 🔵 Login Endpoint
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ message: "Login successful", token });
});

// 🟠 Get User Profile (Protected)
app.get('/profile', async (req, res) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(decoded.id).select("-password");
        res.json(user);
    } catch (error) {
        res.status(401).json({ error: "Invalid token" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
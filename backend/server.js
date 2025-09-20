const express = require('express');
const cors = require('cors');
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const db = require("./db");

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const loginRoute = require('./routes/loginRoute');
const entryRoute = require('./routes/entryRoute');

app.use('/api/login', loginRoute);
app.use('/api', entryRoute);

app.get('/', (req, res) => {
    res.send('🎉API is running!');
});

app.use((req, res, next) => {
    console.log("❌ 404 for:", req.method, req.url);
    next();
})

app.post('/api/signup', (req, res) => {
    const { username, email, password } = req.body;
    console.log("Signup request:", req.body);

    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields required" });
    }

    bcrypt.hash(password.toString(), 10, (err, hash) => {
        if (err) {
            console.error("❌ Error hashing password:", err);
            return res.status(500).json({ message: "Error hashing password" });
        }

        const sql = "INSERT INTO Accounts (username, email, password) VALUES (?)";
        const values = [username, email, hash];

        db.query(sql, [values], (err, result) => {
            if (err) {
                console.error("❌ DB insert error:", err);  // 👈 this is what we need to see
                return res.status(500).json({ message: "Database error", error: err });
            }
            console.log("✅ Insert success:", result);
            return res.json({ message: "✅ User registered successfully!" });
        });
    });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
});
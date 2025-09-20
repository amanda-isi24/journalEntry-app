const bcrypt = require('bcrypt');
const db = require('../db');
const jwt = require("jsonwebtoken");


exports.login = (req, res) => {
  const { username, password } = req.body;

  const sql = 'SELECT id, username, password, email, created_at FROM Accounts WHERE username = ?';
  db.query(sql, [username], async (err, result) => {
    if (err) {
      console.error('❌ Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = result[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, "jwtSecretKey", { expiresIn: "1h" });

    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  });
};

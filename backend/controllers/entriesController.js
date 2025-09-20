const db = require("../db");


exports.getAllEntries = (req, res) => {
  db.query('SELECT * FROM journal_entries', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.getEntryById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM journal_entries WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });
    if (results.length === 0) return res.status(404).json({ message: 'Entry not found' });
    res.json(results[0]);
  });
};

exports.createEntry = (req, res) => {
  const { content, created_at } = req.body;

  if (!content || content.trim() === "") {
    return res.status(400).json({ message: "Entry content is required" });
  }

  const sql = "INSERT INTO journal_entries (content, created_at) VALUES (?, ?)";
  db.query(sql, [content, created_at], (err, result) => {
    if (err) {
      console.error("❌ Database insert error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ message: "Entry created successfully", id: result.insertId });
  });
};

exports.updateEntry = (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  if (!content || content.trim() === '') {
    return res.status(400).json({ message: 'Updated content is required' });
  }
  const sql = 'UPDATE journal_entries SET content = ? WHERE id = ?';
  db.query(sql, [content, id], (err, result) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Entry not found' });
    res.json({ message: 'Entry updated successfully' });
  });
}



exports.deleteEntry = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM journal_entries WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Entry not found' });
    res.json({ message: 'Entry deleted successfully' });
  });
};

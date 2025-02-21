const express = require('express');
const pool = require('./db');
const app = express();
const PORT = 3000;

app.use(express.json());

/////////// GRADUATED STUDENTS ///////////

//Admission date is required//
app.get('/graduation-date', async (req, res) => {
  try {
    const { admissionDate, programDuration = 4 } = req.query;

    if (!admissionDate) {
      return res.status(400).json({ error: "Admission date is required" });
    }

    let date = new Date(admissionDate);
    date.setFullYear(date.getFullYear() + parseInt(programDuration));

    res.json({ graduationDate: date.toISOString().split('T')[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error');
  }
});






app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
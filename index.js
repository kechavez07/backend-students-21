const express = require('express');
const pool = require('./db'); // Asegúrate de que este archivo esté configurado correctamente
const app = express();
const PORT = 3000;

app.use(express.json());

/////////// GRADUATED STUDENTS ///////////

// Ruta para obtener todos los estudiantes
app.get("/students", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM students");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Ruta para obtener la fecha de graduación de un estudiante
app.get('/graduation-date', async (req, res) => {
  try {
    const { code } = req.query;

    if (!code) {
      return res.status(400).json({ error: "El código del estudiante es obligatorio" });
    }

    // Consultar estudiante en la base de datos
    const result = await pool.query("SELECT code, income_date FROM students WHERE code = $1", [code]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Estudiante no encontrado" });
    }

    const estudiante = result.rows[0];
    const fechaAdmision = estudiante.income_date;

    if (!fechaAdmision) {
      return res.status(400).json({ error: "No se encuentra la fecha de admisión del estudiante" });
    }

    // Calcular fecha de graduación (4 años después de la admisión)
    let fechaGraduacion = new Date(fechaAdmision);
    fechaGraduacion.setFullYear(fechaGraduacion.getFullYear() + 4);

    res.json({ 
      code: estudiante.code, 
      graduation_date: fechaGraduacion.toISOString().split('T')[0] 
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

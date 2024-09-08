const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');

const app = express();
const PORT = 3000;



//Middleware para manejar datos de formulario y JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});



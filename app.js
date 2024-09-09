// Añadiremos nuestro servidor, session y uniremos el resto de la aplicación
const express = require('express');
const session = require('express-session');
const cryptoConfig = require('./crypto/config');
const userRoutes = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 3000;


//Middleware para manejar datos de formulario y JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});

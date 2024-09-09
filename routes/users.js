//Aqui etaran todas las rutas.
const express = require('express');
const jwt = require('jsonwebtoken'); //jsonWebToken generar y verificar tokens (manejarlos)
const session = require('express-session'); //expess-session; manejar sesiones desde el servidor
const users = require('../data/users'); //importar los usuarios (desde data/users.s)
const authMiddleware = require('../middlewares/authMiddleware');  //middleware para proteger rutas
const secret = require('../crypto/config').hashedSecret; //secreto encriptado (se importa desde crypto/confi.js) 

//agrupa las rutas relacionadas(de un mismo  objeto)
const router = express.Router();

// Ruta de inicio
router.get('/', (req, res) => {
  if (req.session.token) {
    return res.redirect('/dashboard');
  }

  const loginForm = `
    <form action="/login" method="post">
      <label for="username">Usuario:</label>
      <input type="text" id="username" name="username" required><br>

      <label for="password">Contraseña:</label>
      <input type="password" id="password" name="password" required><br>

      <button type="submit">Iniciar sesión</button>
    </form>
    <a href="/dashboard">Ir al Dashboard</a>
  `;
  res.send(loginForm);
});



module.exports = router;

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
    // return res.redirect('/dashboard'); //si exist el token en la sesion redirecciona al dashboard
    // Si el usuario ya está autenticado, muestra un mensaje o enlace al dashboard en lugar de redirigir automaticamente.
    return res.send(`
        <h1>Ya estás autenticado</h1>
        <a href="/dashboard">Ir al Dashboard</a><br>
        <form action="/logout" method="post">
          <button type="submit">Cerrar sesión</button>
        </form>
    `);
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

// Ruta de login (post'/login')
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(
        (user) => user.username === username && user.password === password
    );
    if (user) {  //si el user existe genera token
        const token = jwt.sign({ user: user.id }, secret, { expiresIn: '1h' }); //contiene el id del use firmado con el secret que dura 1h
        req.session.token = token;  //almacena el token en la sesion del usuario
        res.redirect('/dashboard'); //redirige a dashboard
    } else {
        res.status(401).json({ mensaje: 'Credenciales incorrectas' });
    }
});

// Ruta protegida del dashboard
router.get('/dashboard', authMiddleware, (req, res) => {  //ruta protegia por authMiddleware, verifica token antes de entrar
    // const user = users.find(u => u.id === req.user);
    const userId = req.user;
    const user = users.find((user) => user.id === userId);  // si el token es valido;middleware pasa el id de user en req.user
    if (user) {  //si encuentra user en users, si lo encuentra muestra el saludo
        res.send(`
        <h1>Bienvenido, ${user.name}</h1>
        <p>ID: ${user.id}</p>
        <p>UserName: ${user.username}</p>
        <a href="/">Volver a HOME</a>
        <form action="/logout" method="post">
        <button type="submit">Cerrar sessión</button><br>
        </form>
        `);
    } else {
        res.status(401).json({ mensaje: 'Usuario no encontrado' });
    }
});
    
// Cerrar sesión
router.post('/logout', (req, res) => {
    req.session.destroy();  //destruye la sesion
    res.redirect('/');  //redirige a home
});

module.exports = router;

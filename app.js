// Añadiremos nuestro servidor, session y uniremos el resto de la aplicación
const express = require('express');
const session = require('express-session');
const cryptoConfig = require('./crypto/config');
const userRoutes = require('./routes/users');

const app = express();


//Middleware para manejar datos de formulario y JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuración de la sesión
app.use(session({  //objeto de session -->
  secret: cryptoConfig.hashedSecret,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Rutas
app.use('/', userRoutes);

const PORT = process.env.PORT || 3000;  //define el puerto donde el servidor escuchará peticiones.Si no está configurada la variable de entorno PORT, se utiliza el puerto 3000 por defecto.
app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});

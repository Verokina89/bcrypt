## Autenticación JWT con Express. 

Esta es una aplicación sencilla en Node.js utilizando Express para demostrar la autenticación JWT (Token Web JSON). La aplicación incluye inicio de sesión de usuarios, generación de tokens, verificación de tokens y un panel básico accesible solo para usuarios autenticados.

La estructura será la siguiente:
- routes 
  - users.js // Aquí estarán todas las rutas
- data
  - users.js // Irán los usuarios de prueba de sesión con id, usuario, contraseña y nombre.
- middlewares
  - authMiddleware.js // Este middleware manejará la generación del token y verificación.
- crypto
  - config.js // Configuraremos Crypto y Bcrypt para hacer más segura nuestra app
- app.js // Añadiremos nuestro servidor, session y uniremos el resto de la aplicación

## Endpoints de la API
- GET /: Página de inicio con formulario de inicio de sesión y enlace al panel de control.
- POST /login: Endpoint para autenticar y generar un token JWT.
- GET /dashboard: Panel de control accesible solo con un token JWT válido.
- POST /logout: Endpoint para cerrar sesión y destruir la sesión.

1. Configuración
- Lo primero es hacer npm install para instalar las dependencias de package.json. √
- Crearemos un servidor http con express en app.js 

2. Paso a paso 
- Comenzaremos a manejar los módulos y solo introduciremos lo necesario en cada uno de ellos. No se debe requerir nada que no se vaya a usar. √

3. Crypto    √
estas 2 líneas hacen que nuestro secreto sea seguro
``` javascript
  const secret = crypto.randomBytes(64).toString('hex');
  const hashedSecret = bcrypt.hashSync(secret, 10);
```
implementalas en `crypto/confing.js` y úsalas en secret de session y donde creas que sea necesario. 

4. Condicionantes
En la entrada de nuestra aplicación aparecerán los inputs de `login` y `pass`. Si nos hemos logado ya y volvemos a esa entrada no deberán salir, y sí saldrá un enlace al `dashboard` y un botón de `logout`

# PISTAS:
- Puedes partir del ejercicio del vídeo y modularlo y añadir lo que necesites nuevo.
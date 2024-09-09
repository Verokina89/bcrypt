// Configuraremos Crypto y Bcrypt para hacer más segura nuestra app.
const crypto = require('crypto');
const bcrypt = require('bcryptjs');  //llamando a bcryptjs que sera utilizado en app

// Genera un secreto aleatorio y lo hashea(encripta)
const secret = crypto.randomBytes(64).toString('hex');
const hashedSecret = bcrypt.hashSync(secret, 10);

module.exports = { hashedSecret };

/*--- 
const secret = crypto.randomBytes(64).toString('hex');
crypto.randomBytes(64) //utiliza el módulo crypto de Node.js para generar un buffer de 64 bytes de datos aleatorios. El número 64 se refiere a la longitud del buffer que se quiere generar.

.toString('hex'): Convierte el buffer de bytes aleatorios en una cadena de texto hexadecimal. Esto es útil porque una cadena hexadecimal es más fácil de manejar y almacenar que un buffer de bytes directamente. Cada byte aleatorio se representa por dos caracteres hexadecimales, por lo que un buffer de 64 bytes producirá una cadena hexadecimal de 128 caracteres.

const hashedSecret = bcrypt.hashSync(secret, 10);
bcrypt.hashSync(secret, 10): Esta línea toma la cadena secret que acabas de generar y la "hashea" utilizando el algoritmo bcrypt.

secret: El valor a encriptar (proteger)
10: El segundo parámetro es el número de "salt rounds", es decir, el número de veces que se aplicará el algoritmo de hashing para añadir complejidad y hacer que sea más difícil de descifrar. Cuanto mayor sea el número de rondas, más seguro será el hash, pero también tomará más tiempo computacionalmente.
Resultado: hashedSecret será la versión encriptada del secreto original, lo que es ideal para almacenarlo de forma segura.

conclusion:
secret: Es una cadena generada aleatoriamente de 128 caracteres en formato hexadecimal, que puede servir como clave secreta.
hashedSecret: Es la versión encriptada con bcrypt del secreto generado, haciendo que sea mucho más seguro almacenarlo o transmitirlo.
Este proceso es común cuando quieres crear y almacenar valores confidenciales de manera segura, como contraseñas o claves secretas.
---*/
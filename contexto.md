Desarrollo Web - Departamento Ciencias de la Computación y Electrónica
Ing. José Manuel Santos Sánchez
Desarrollo aplicación tipo CRUD(Create, Read, Update, Delete) con React + Vite
y Node.js 22.20.0 (MySQL)
En esta actividad guiada se va a desarrollar una una app para gestionar usuarios
(crear, leer, actualizar y eliminar) sobre la BD bdsantos. El backend será Node.js
22.20.0 + Express + mysql2 y el frontend React + Vite.
Durante la creación van a encontrar la redacción del fundamento teórico utilizado o
aplicado en el ejercicio.
Prerequisitos
• Node.js 22.20.0 y npm instalados.
• Servidor MySQL 8.x accesible (local o remoto).
Para la realización de esta actividad se requiere tener instalado en el equipo node.js
22.20.0 el cual es el entorno de ejecución que nos permite correr JavaScript fuera
del navegador, npm viene instalado por defecto con node.js y es utilizado como
gestor de paquetes que permite instalar, actualizar y administrar dependencias
(como Express, React, dotenv, etc.).
Para el caso de la sala 23, se encuentra instalado el motor de base de datos MySql
Server, la cual tiene como usuario por defecto el usuario root y la contraseña que
tiene asignada es 123456.
Credenciales Sala 23 para MySql:
Usuario: root
Password: 123456
Para crear la base de datos, y ejecutar el script de creación de tablas e inserción de
registros por defecto pueden utilizar la aplicación MySql WorkBench
Desarrollo Web - Departamento Ciencias de la Computación y Electrónica
Ing. José Manuel Santos Sánchez
En el caso que usted no quiera instalar MySql como un servicio en su maquina
pueden optar por instalar aplicaciones como XAMPP y ejecutar únicamente el
servicio de MySql, en caso que quieran utilizar PhpMyAdmin como entorno Web
para interactuar con la base de datos deben dar de alta el servicio de Apache
Desarrollo Web - Departamento Ciencias de la Computación y Electrónica
Ing. José Manuel Santos Sánchez
Cuando se utiliza XAMPP el motor de base de datos trae por defecto el usuario root
y la contraseña esta en vacío “”.
En esta actividad se va a trabajar con MySql WorkBench, este se utiliza indistinto de
si utiliza MySql Server o XAMP, lo primero que se va a hacer es crear el script para la
creación de la base de datos y tablas, además de la inserción de registros por
defecto.
En el caso de iniciar WorkBench y no haber conexiones configuradas, te diriges a la
sesión MySqlConnections y presionas el signo +
después de dar click en + debemos asignar un nombre a la conexión, acorde con la
imagen se llama ConexionLocal, en el método de conexión se deja el valor por
defecto TCP/IP, en el parámetro Hostname en caso que este trabajando desde una
base de datos remota debería asignar la dirección ip de la maquina o dominio donde
se encuentre instalado MySql, de lo contrario si esta trabajando localmente puede
dejar la ip por defecto que apunta a localhost 127.0.0.1, en username utilizamos el
usuario por defecto root a menos que se haya creado un usuario para tal fin que en
caso de tener una Password se introduce presionando el botón Store in Vault.
Para verificar que la conexión se realizo de manera correcta podemos presionar el
botón “Text Connnection” para probar que los parámetros son correctos.
Desarrollo Web - Departamento Ciencias de la Computación y Electrónica
Ing. José Manuel Santos Sánchez
En caso de aparecer el siguiente mensaje formulario se presiona el botón “Continue
Amyway”
El siguiente formulario nos indica que la conexión se hizo de manera satisfactoria y
presionamos ok
Para culminar la creación de la conexión presionamos el botón “Ok”.
Desarrollo Web - Departamento Ciencias de la Computación y Electrónica
Ing. José Manuel Santos Sánchez
Ahora damos clic en el nombre de la conexión creada “Conexión Local”
En caso de ver la siguiente vista, presionamos la opción a la derecha de
“Administration”, la opción “Schemas” donde se visualizan las bases de datos
creadas
Presiona en “Schemas”
Desarrollo Web - Departamento Ciencias de la Computación y Electrónica
Ing. José Manuel Santos Sánchez
En la parte derecha se observa una sesión que tiene como título “Query”, en esa
sesión se escriben los comandos SQL para la creación de la base de datos,
selección de esta, creación de tablas e inserción de registros por defecto de la
aplicación.
Una vez escribas el script en su totalidad seleccionas la porción del script que
quieras ejecutar presionas el tercer icono en forma de un rayo el cual va a permitir
ejecutar la porción del script seleccionado.
Para que veas si la base de datos fue creada en Schemas presionas el botón
actualizar y de esta manera veras tu base de datos creada y seleccionada (el
nombre de la base de datos seleccionada (use) debe salir en negrita).
Desarrollo Web - Departamento Ciencias de la Computación y Electrónica
Ing. José Manuel Santos Sánchez
El script para utilizar en nuestra base de datos es la siguiente:
create database bdsantos;
use bdsantos;
create table estado(
id int,
nombre varchar(30) not null,
constraint pk_estado primary key(id),
constraint uq_estado_nombre unique(nombre)
);
create table tipo_usuario(
id int,
nombre varchar(30) not null,
constraint pk_tipo_usuario primary key(id),
constraint uq_tipo_usuario_nombre unique(nombre)
);
create table usuario(
username varchar(30),
password varchar(255) not null,
nombre varchar(120) not null,
edad int not null,
id_estado int not null,
id_tipo_usuario int not null,
constraint pk_usuario primary key(username),
constraint fk_usuario_estado foreign key(id_estado)
references estado(id),
constraint fk_usuario_tipo_usuario foreign key(id_tipo_usuario)
references tipo_usuario(id)
);
INSERT INTO estado(id,nombre)
VALUES
(1, 'Activo'),
(2, 'Bloqueado'),
Desarrollo Web - Departamento Ciencias de la Computación y Electrónica
Ing. José Manuel Santos Sánchez
(3, 'Retirado');
INSERT INTO tipo_usuario(id,nombre)
VALUES
(1, 'Administrador'),
(2, 'Usuario');
INSERT INTO usuario(username, password, nombre,
edad,id_estado,id_tipo_usuario)
VALUES('admin','12345','Administrador',46,1,1);
A continuación, el mismo código con la explicación de que hace cada instrucción:
-- Crea una nueva base de datos llamada 'bdsantos'
create database bdsantos;
-- Selecciona la base de datos 'bdsantos' para trabajar en ella
use bdsantos;
-- Crea la tabla 'estado' que almacenará los estados posibles de los
usuarios
create table estado(
id int, -- Identificador numérico único para cada estado
nombre varchar(30) not null, -- Nombre del estado (por ejemplo, Activo,
Bloqueado, Retirado)
-- Define la clave primaria (Primary Key) en el campo 'id'
constraint pk_estado primary key(id),
-- Impone que el nombre de cada estado sea único (no se puede repetir)
constraint uq_estado_nombre unique(nombre)
);
-- Crea la tabla 'tipo_usuario' que define los tipos de usuarios del sistema
create table tipo_usuario(
id int, -- Identificador único del tipo de usuario
nombre varchar(30) not null, -- Nombre del tipo de usuario (por
ejemplo, Administrador, Usuario)
-- Define la clave primaria
constraint pk_tipo_usuario primary key(id),
-- Evita que se repita el nombre del tipo de usuario
constraint uq_tipo_usuario_nombre unique(nombre)
Desarrollo Web - Departamento Ciencias de la Computación y Electrónica
Ing. José Manuel Santos Sánchez
);
-- Crea la tabla 'usuario' que almacena la información de los usuarios
registrados
create table usuario(
username varchar(30), -- Nombre de usuario (clave principal)
password varchar(255) not null, -- Contraseña de acceso
nombre varchar(120) not null, -- Nombre completo del usuario
edad int not null, -- Edad del usuario
id_estado int not null, -- Clave foránea que indica el estado del
usuario (Activo, Bloqueado, etc.)
id_tipo_usuario int not null, -- Clave foránea que indica el tipo de
usuario (Administrador, Usuario, etc.)
-- Define la clave primaria en el campo 'username'
constraint pk_usuario primary key(username),
-- Crea una relación con la tabla 'estado' mediante la clave foránea
'id_estado'
constraint fk_usuario_estado foreign key(id_estado)
references estado(id),
-- Crea una relación con la tabla 'tipo_usuario' mediante la clave
foránea 'id_tipo_usuario'
constraint fk_usuario_tipo_usuario foreign key(id_tipo_usuario)
references tipo_usuario(id)
);
-- Inserta los registros iniciales en la tabla 'estado'
INSERT INTO estado(id,nombre)
VALUES
(1, 'Activo'), -- Estado 1: el usuario puede acceder normalmente
(2, 'Bloqueado'), -- Estado 2: el usuario tiene acceso restringido
(3, 'Retirado'); -- Estado 3: el usuario ha sido dado de baja del sistema
-- Inserta los registros iniciales en la tabla 'tipo_usuario'
INSERT INTO tipo_usuario(id,nombre)
VALUES
(1, 'Administrador'), -- Tipo 1: usuario con privilegios de gestión total
(2, 'Usuario'); -- Tipo 2: usuario estándar con permisos limitados
-- Inserta un usuario administrador por defecto en la tabla 'usuario'
INSERT INTO usuario(username, password, nombre, edad, id_estado,
id_tipo_usuario)
Desarrollo Web - Departamento Ciencias de la Computación y Electrónica
Ing. José Manuel Santos Sánchez
VALUES('admin','12345','Administrador',46,1,1); -- Usuario 'admin' activo
con rol de administrador
Una vez creada la base de datos no olvide guardar el script de esta ya que este se
debe adjuntar al momento de enviar la actividad puede utilizar el botón guardar
Desarrollo Web - Departamento Ciencias de la Computación y Electrónica
Ing. José Manuel Santos Sánchez
Backend (Node.js 22.20.0 + Express + mysql2)
Lo primero que vamos a crear es la carpeta del proyecto el cual vamos a llamar
crud-bdsantos, dentro de esta vamos a crear la carpeta del servidor y le vamos a
asignar el nombre
server y después vamos a generar dentro de esta el archivo
package.json de base a través del comando
npm init -y
el comando
npm init -y en Windows sirve para inicializar rápidamente un nuevo
proyecto de Node.js dentro del directorio actual creando el archivo
package.json,
que contiene toda la información básica del proyecto como nombre, versión, punto
de entrada, licencia y dependencias; la opción -y (abreviatura de “yes”) le indica a
npm que acepte automáticamente todas las configuraciones por defecto sin hacer
preguntas interactivas, permitiendo así configurar el entorno inicial de trabajo de
manera inmediata y lista para comenzar a instalar los paquetes necesarios para la
aplicación.
Desarrollo Web - Departamento Ciencias de la Computación y Electrónica
Ing. José Manuel Santos Sánchez
Instalar las dependencias
los comandos npm i express cors mysql2 dotenv bcryptjs y npm i -D nodemon se
utilizan para instalar dependencias en un proyecto Node.js; el primero instala en
producción (i es abreviación de
install) los paquetes principales: Express, que
permite crear el servidor y manejar rutas HTTP; CORS, que habilita la comunicación
entre el frontend y el backend; MySQL2, que facilita la conexión y consultas con la
base de datos MySQL; dotenv, que gestiona variables de entorno almacenadas en
un archivo .env para proteger datos sensibles como contraseñas o puertos; y
bcryptjs, que sirve para encriptar contraseñas de forma segura; el segundo
comando, npm i -D nodemon, instala nodemon como dependencia de desarrollo
(por eso el parámetro -D), una herramienta que reinicia automáticamente el
servidor cada vez que detecta cambios en el código, evitando tener que detener y
ejecutar manualmente la aplicación en cada modificación.
Desarrollo Web - Departamento Ciencias de la Computación y Electrónica
Ing. José Manuel Santos Sánchez
Configurar package.json
Editamos de la carpeta server el archivo package.json y asignamos los siguientes
valores:server\package.json
{
"name": "server",
"version": "1.0.0",
"type": "module",
"scripts": {
"dev": "nodemon src/index.js",
"start": "node src/index.js"
},
"engines": { "node": ">=22.20.0" }
}
En package.json se define la configuración básica del proyecto Node.js; en él,
"name": "server" indica el nombre del proyecto, "version": "1.0.0" su versión inicial, y
"type": "module" especifica que el proyecto usará la sintaxis moderna de módulos
ECMAScript (permitiendo usar import y export en lugar de require y
module.exports); el bloque "scripts" define comandos personalizados que pueden
ejecutarse con npm run, donde "dev": "nodemon src/index.js" inicia el servidor en
modo desarrollo utilizando nodemon para reiniciar automáticamente al detectar
cambios, y "start": "node src/index.js" ejecuta el servidor en modo producción
usando Node.js directamente; finalmente, "engines": { "node": ">=22.20.0" } indica
que el proyecto requiere una versión mínima de Node.js 22.20.0 o superior para
funcionar correctamente, asegurando compatibilidad con las dependencias y
características modernas del lenguaje.
Desarrollo Web - Departamento Ciencias de la Computación y Electrónica
Ing. José Manuel Santos Sánchez
Crear las variables de entorno
Para definir las variables de entorno creamos el archivo .env dentro de serverserver\.env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=123456
DB_NAME=bdsantos
DB_PORT=3306
PORT=4000
El archivo .env se crea manualmente en la carpeta server, en el mismo nivel donde
está el archivo package.json; crea el nuevo archivo nombrandolo exactamente .env
(sin nombre antes del punto y sin extensión) y luego colocas dentro las variables de
entorno como DB_HOST=localhost, DB_USER=root, etc.; el nombre debe ser
exactamente .env, ya que el paquete dotenv está diseñado para buscar por defecto
un archivo con ese nombre en la raíz del proyecto al ejecutar dotenv.config(),
aunque de forma avanzada podrías usar otro nombre o ubicación indicando la ruta
en el código, pero por convención y buenas prácticas siempre se llama .env y nunca
se sube al repositorio para proteger las credenciales.
El archivo .env, se usa para almacenar variables de entorno en un proyecto Node.js
sin exponer datos sensibles en el código fuente; allí, DB_HOST=localhost indica que
la base de datos está alojada localmente, DB_USER=root define el usuario de
conexión a MySQL, DB_PASSWORD=tu_password guarda la contraseña de ese
usuario (que debe reemplazarse por la real, en la sala 23 es 123456),
DB_NAME=bdsantos especifica el nombre de la base de datos que usará la
aplicación, DB_PORT=3306 indica el puerto predeterminado del servidor MySQL, y
PORT=4000 establece el puerto en el que se ejecutará el servidor backend creado
con Express, de manera que cuando la aplicación se inicie, el framework leerá estas
variables mediante el paquete dotenv para conectarse correctamente a la base de
datos y levantar el servidor sin tener que escribir los valores directamente en el
código.
Desarrollo Web - Departamento Ciencias de la Computación y Electrónica
Ing. José Manuel Santos Sánchez
Creamos la estructura src dentro de server
A continuación, vamos a crear dentro del directorio server el directorio src y dentro
de src vamos a crear la carpeta routes con los comandos:
mkdir src
mkdir src\routes
Crear el archivo para la gestión de la conexión con MySQL
Creamos el archivo db.js dentro del directorio srcserver\src\db.js
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();
export const pool = mysql.createPool({
host: process.env.DB_HOST,
user: process.env.DB_USER,
password: process.env.DB_PASSWORD,
database: process.env.DB_NAME,
port: Number(process.env.DB_PORT) || 3306,
waitForConnections: true,
connectionLimit: 10
});
Este código configura la conexión a una base de datos MySQL en un proyecto
Node.js utilizando el cliente mysql2 en modo promesa; primero se importan los
módulos mysql2/promise para poder trabajar con funciones asíncronas
Desarrollo Web - Departamento Ciencias de la Computación y Electrónica
Ing. José Manuel Santos Sánchez
(async/await) y dotenv para cargar las variables definidas en el archivo .env; luego se
ejecuta dotenv.config() para que las variables estén disponibles en process.env; a
continuación, se crea un pool de conexiones mediante mysql.createPool(), lo que
permite mantener abiertas varias conexiones reutilizables a la base de datos,
mejorando la eficiencia y el rendimiento frente a crear una conexión nueva por cada
solicitud; dentro del objeto de configuración se asignan los valores de conexión
(host, user, password, database y port) tomados del archivo .env, y se especifican
parámetros adicionales como waitForConnections: true, que indica que las
solicitudes esperarán si no hay conexiones libres, y connectionLimit: 10, que define
el número máximo de conexiones simultáneas que el pool puede manejar.
A continuación, tenemos el mismo código con comentarios en cada línea:
// db.js — Gestiona la conexión a MySQL usando un pool reutilizable
import mysql from 'mysql2/promise'; // Cliente MySQL2 con promesas
import dotenv from 'dotenv'; // Carga variables .env en process.env
dotenv.config(); // Inicializa dotenv para acceder a .env
export const pool = mysql.createPool({ // Crea pool de conexiones (mejor que
una única)
host: process.env.DB_HOST, // Host de la BD
user: process.env.DB_USER, // Usuario
password: process.env.DB_PASSWORD, // Contraseña
database: process.env.DB_NAME, // Base de datos a utilizar
port: Number(process.env.DB_PORT) || 3306,// Puerto de MySQL (por
defecto 3306)
waitForConnections: true, // Espera si no hay conexiones libres
connectionLimit: 10 // Límite de conexiones simultáneas
});
Desarrollo Web - Departamento Ciencias de la Computación y Electrónica
Ing. José Manuel Santos Sánchez
Creamos dentro del directorio routes los archivos de ruta para estados, tipos y
usuarios
Creamos los módulos de rutas para obtener los registros de los catálogosserver\src\routes\estados.routes.js
import { Router } from 'express';
import { pool } from '../db.js';
const router = Router();
router.get('/', async (_req, res, next) => {
try {
const [rows] = await pool.query('SELECT id, nombre FROM estado ORDER BY
id');
res.json(rows);
} catch (e) {
next(e);
}
});
export default router;
El anterior código define un módulo de rutas en Express para obtener los registros
del catálogo estado desde la base de datos MySQL; primero se importa Router
desde Express para modularizar las rutas y el objeto pool desde db.js para realizar
las consultas; se crea una instancia de router que gestionará los endpoints de esta
sección, y se define una ruta tipo GET que responde en la dirección raíz (/), por
ejemplo /api/estados; dentro de ella se ejecuta de forma asíncrona una consulta
SQL que selecciona los campos id y nombre de la tabla estado ordenados por id; los
resultados se devuelven en formato JSON mediante res.json(rows), y en caso de
error, este se pasa al siguiente middleware con next(e) para que el manejador global
lo procese adecuadamente.
Desarrollo Web - Departamento Ciencias de la Computación y Electrónica
Ing. José Manuel Santos Sánchez
server\src\routes\tipos.routes.js
import { Router } from 'express';
import { pool } from '../db.js';
const router = Router();
router.get('/', async (_req, res, next) => {
try {
const [rows] = await pool.query('SELECT id, nombre FROM tipo_usuario
ORDER BY id');
res.json(rows);
} catch (e) {
next(e);
}
});
export default router;
Este código crea un módulo de rutas en Express para consultar los registros del
catálogo tipo_usuario en la base de datos MySQL; se importa el Router de Express
para modularizar la gestión de rutas y el pool de conexiones definido en db.js para
ejecutar las consultas; se declara una ruta de tipo GET en el endpoint raíz (/), que
ejecuta una consulta SQL asíncrona seleccionando los campos id y nombre de la
tabla tipo_usuario, ordenados por id; los resultados obtenidos se envían al cliente en
formato JSON con res.json(rows), y si ocurre un error durante la ejecución, este se
pasa al siguiente middleware de manejo de errores mediante next(e) para garantizar
una respuesta controlada.
Desarrollo Web - Departamento Ciencias de la Computación y Electrónica
Ing. José Manuel Santos Sánchez
server\src\routes\usuarios.routes.js
import { Router } from 'express';
import { pool } from '../db.js';
import bcrypt from 'bcryptjs';
const router = Router();
router.get('/', async (_req, res, next) => {
try {
// Consulta que une las tres tablas y asigna alias legibles
const [rows] = await pool.query(`
SELECT
u.username,
u.nombre,
u.edad,
e.nombre AS estado,
t.nombre AS tipo,
u.id_estado,
u.id_tipo_usuario
FROM usuario u
JOIN estado e ON e.id = u.id_estado
JOIN tipo_usuario t ON t.id = u.id_tipo_usuario
ORDER BY u.username
`);
res.json(rows);
} catch (e) {
next(e);
}
});
router.get('/:username', async (req, res, next) => {
try {
const { username } = req.params;
const [rows] = await pool.query(
'SELECT username, nombre, edad, id_estado, id_tipo_usuario FROM
usuario WHERE username = ?',
[username]
);
if (!rows.length) return res.status(404).json({ error: 'No encontrado'
});
res.json(rows[0]);
} catch (e) {
next(e);
Desarrollo Web - Departamento Ciencias de la Computación y Electrónica
Ing. José Manuel Santos Sánchez
}
});
router.post('/', async (req, res, next) => {
try {
const { username, password, nombre, edad, id_estado, id_tipo_usuario } =
req.body;
const hashed = await bcrypt.hash(password, 10);
await pool.query(
'INSERT INTO usuario (username, password, nombre, edad, id_estado,
id_tipo_usuario) VALUES (?, ?, ?, ?, ?, ?)',
[username, hashed, nombre, edad, id_estado, id_tipo_usuario]
);
res.status(201).json({ message: 'Creado' });
} catch (e) {
if (e.code === 'ER_DUP_ENTRY') return res.status(409).json({ error:
'Usuario ya existe' });
next(e);
}
});
router.put('/:username', async (req, res, next) => {
try {
const { username } = req.params;
const { password, nombre, edad, id_estado, id_tipo_usuario } = req.body;
const fields = [];
const values = [];
if (password) {
fields.push('password = ?');
values.push(await bcrypt.hash(password, 10));
}
if (nombre) {
fields.push('nombre = ?');
values.push(nombre);
}
if (edad) {
fields.push('edad = ?');
values.push(edad);
}
if (id_estado) {
fields.push('id_estado = ?');
values.push(id_estado);
}
Desarrollo Web - Departamento Ciencias de la Computación y Electrónica
Ing. José Manuel Santos Sánchez
if (id_tipo_usuario) {
fields.push('id_tipo_usuario = ?');
values.push(id_tipo_usuario);
}
if (!fields.length) return res.status(400).json({ error: 'Nada que
actualizar' });
values.push(username);
const [result] = await pool.query(`UPDATE usuario SET ${fields.join(',
')} WHERE username = ?`, values);
if (result.affectedRows === 0) return res.status(404).json({ error: 'No
encontrado' });
res.json({ message: 'Actualizado' });
} catch (e) {
next(e);
}
});
router.delete('/:username', async (req, res, next) => {
try {
const { username } = req.params;
const [result] = await pool.query('DELETE FROM usuario WHERE username =
?', [username]);
if (result.affectedRows === 0) return res.status(404).json({ error: 'No
encontrado' });
res.json({ message: 'Eliminado' });
} catch (e) {
next(e);
}
});
export default router;
Este código implementa el CRUD completo para el recurso usuario en una API
desarrollada con Express y MySQL; define las rutas principales: GET para listar
usuarios, POST para crear nuevos registros con contraseñas encriptadas mediante
bcryptjs, PUT para actualizar campos específicos de un usuario identificado por su
username, y DELETE para eliminarlo de la base de datos; usa consultas SQL
asíncronas ejecutadas a través del pool de conexiones definido en db.js, aplicando
control de errores con try/catch y devolviendo respuestas en formato JSON que
informan al cliente sobre el resultado de cada operación.
Desarrollo Web - Departamento Ciencias de la Computación y Electrónica
Ing. José Manuel Santos Sánchez
A continuación, se encuentra el mismo código anterior con descripción de lo que
hace el código:
// Importamos las dependencias necesarias
import { Router } from 'express'; // Permite crear rutas modulares para
organizar endpoints
import { pool } from '../db.js'; // Conexión a la base de datos MySQL
mediante pool de conexiones
import bcrypt from 'bcryptjs'; // Librería para encriptar contraseñas de
forma segura
// Creamos una instancia de Router para agrupar las rutas de usuarios
const router = Router();
/* ===========================================================
MÉTODO GET — Listar todos los usuarios
=========================================================== */
router.get('/', async (_req, res, next) => {
try {
// Consulta SQL que obtiene los datos de los usuarios
// haciendo JOIN con las tablas 'estado' y 'tipo_usuario'
// para mostrar sus nombres en lugar de solo los IDs.
const [rows] = await pool.query(`
SELECT
u.username,
u.nombre,
u.edad,
e.nombre AS estado,
t.nombre AS tipo,
u.id_estado,
u.id_tipo_usuario
FROM usuario u
JOIN estado e ON e.id = u.id_estado
JOIN tipo_usuario t ON t.id = u.id_tipo_usuario
ORDER BY u.username
`);
// Devuelve el resultado como un arreglo JSON
res.json(rows);
} catch (e) {
// Si ocurre un error, se pasa al middleware de manejo de errores
next(e);
}
});
Desarrollo Web - Departamento Ciencias de la Computación y Electrónica
Ing. José Manuel Santos Sánchez
/**
* GET /api/usuarios/:username
* Devuelve un único usuario por su clave primaria.
* El formulario usa esta respuesta para precargar valores al pulsar
"Editar".
*/
router.get('/:username', async (req, res, next) => {
try {
const { username } = req.params; // PK desde la
ruta
const [rows] = await pool.query(
'SELECT username, nombre, edad, id_estado, id_tipo_usuario FROM
usuario WHERE username = ?',
[username] // Parámetro
preparado (anti SQLi)
);
if (!rows.length) return res.status(404).json({ error: 'No encontrado'
});
res.json(rows[0]); // {username,
nombre, edad, id_estado, id_tipo_usuario}
} catch (e) {
next(e);
}
});
/* ===========================================================
MÉTODO POST — Crear un nuevo usuario
=========================================================== */
router.post('/', async (req, res, next) => {
try {
// Extrae los datos enviados en el cuerpo de la solicitud
const { username, password, nombre, edad, id_estado, id_tipo_usuario } =
req.body;
// Cifra la contraseña usando bcrypt con 10 rondas de sal
const hashed = await bcrypt.hash(password, 10);
// Inserta un nuevo registro en la tabla 'usuario' con los valores
proporcionados
await pool.query(
'INSERT INTO usuario (username, password, nombre, edad, id_estado,
id_tipo_usuario) VALUES (?, ?, ?, ?, ?, ?)',
Desarrollo Web - Departamento Ciencias de la Computación y Electrónica
Ing. José Manuel Santos Sánchez
[username, hashed, nombre, edad, id_estado, id_tipo_usuario]
);
// Envía respuesta exitosa con código 201 (creado)
res.status(201).json({ message: 'Creado' });
} catch (e) {
// Si el username ya existe, devuelve error 409 (conflicto)
if (e.code === 'ER_DUP_ENTRY') return res.status(409).json({ error:
'Usuario ya existe' });
next(e);
}
});
/* ===========================================================
MÉTODO PUT — Actualizar un usuario existente
=========================================================== */
router.put('/:username', async (req, res, next) => {
try {
// Captura el parámetro de la URL y los datos del cuerpo
const { username } = req.params;
const { password, nombre, edad, id_estado, id_tipo_usuario } = req.body;
// Arreglos para construir dinámicamente la consulta SQL
const fields = [];
const values = [];
// Agrega solo los campos que el usuario desea modificar
if (password) {
fields.push('password = ?');
values.push(await bcrypt.hash(password, 10)); // Reencripta la nueva
contraseña
}
if (nombre) {
fields.push('nombre = ?');
values.push(nombre);
}
if (edad) {
fields.push('edad = ?');
values.push(edad);
}
if (id_estado) {
fields.push('id_estado = ?');
values.push(id_estado);
}
if (id_tipo_usuario) {
Desarrollo Web - Departamento Ciencias de la Computación y Electrónica
Ing. José Manuel Santos Sánchez
fields.push('id_tipo_usuario = ?');
values.push(id_tipo_usuario);
}
// Si no hay campos a modificar, retorna un error 400
if (!fields.length) return res.status(400).json({ error: 'Nada que
actualizar' });
// Agrega el username al final para usarlo en la cláusula WHERE
values.push(username);
// Ejecuta la consulta UPDATE dinámica
const [result] = await pool.query(
`UPDATE usuario SET ${fields.join(', ')} WHERE username = ?`,
values
);
// Si no se modificó ningún registro, devuelve 404 (no encontrado)
if (result.affectedRows === 0) return res.status(404).json({ error: 'No
encontrado' });
// Si todo sale bien, responde con mensaje de éxito
res.json({ message: 'Actualizado' });
} catch (e) {
next(e);
}
});
/* ===========================================================
MÉTODO DELETE — Eliminar un usuario por su username
=========================================================== */
router.delete('/:username', async (req, res, next) => {
try {
// Obtiene el username desde los parámetros de la ruta
const { username } = req.params;
// Ejecuta la eliminación del registro
const [result] = await pool.query('DELETE FROM usuario WHERE username =
?', [username]);
// Si no se encuentra el registro, responde con error 404
if (result.affectedRows === 0) return res.status(404).json({ error: 'No
encontrado' });
// Confirma que el registro fue eliminado
Desarrollo Web - Departamento Ciencias de la Computación y Electrónica
Ing. José Manuel Santos Sánchez
res.json({ message: 'Eliminado' });
} catch (e) {
next(e);
}
});
// Exporta el router para que pueda ser usado en index.js
export default router;
Desarrollo Web - Departamento Ciencias de la Computación y Electrónica
Ing. José Manuel Santos Sánchez
Creamos el punto de entrada del backendserver/src/index.js:
import express from 'express';
import cors from 'cors';
import { pool } from './db.js';
import usuariosRouter from './routes/usuarios.routes.js';
import estadosRouter from './routes/estados.routes.js';
import tiposRouter from './routes/tipos.routes.js';
const app = express();
app.use(cors());
app.use(express.json());
app.get('/api/health', async (_req, res) => {
try {
await pool.query('SELECT 1');
res.json({ ok: true });
} catch (err) {
res.status(500).json({ ok: false, error: err.message });
}
});
app.use('/api/usuarios', usuariosRouter);
app.use('/api/estados', estadosRouter);
app.use('/api/tipos', tiposRouter);
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
Este es el punto de entrada del backend y crea una aplicación Express que gestiona
toda la API; importa las dependencias necesarias como express para construir el
servidor HTTP, cors para permitir solicitudes desde el frontend y pool para verificar
la conexión con MySQL; también importa las rutas definidas para usuarios, estados
y tipos; se configuran los middlewares para habilitar CORS y procesar cuerpos en
formato JSON; se define un endpoint /api/health que realiza una consulta mínima
(SELECT 1) para comprobar que la base de datos esté operativa; luego se montan
los enrutadores principales bajo sus respectivos prefijos (/api/usuarios,
/api/estados, /api/tipos), y finalmente se determina el puerto desde las variables de
entorno (o 4000 por defecto) para iniciar el servidor escuchando peticiones,
mostrando en consola la URL local de ejecución.
Desarrollo Web - Departamento Ciencias de la Computación y Electrónica
Ing. José Manuel Santos Sánchez
Procedemos a probar el backend
Vamos a realizar pruebas al backend, para ello vamos a abrir dos terminales de
símbolo de sistema en la primera vamos a correr el siguiente comando:
npm run dev
Al ejecutar el comando en la primera terminal debemos observar lo siguiente:
Sin cerrar la primera terminal, procedemos a abrir una segunda terminal y vamos a
realizar pruebas ejecutando los siguientes comandos:
curl http://localhost:4000/api/health
curl http://localhost:4000/api/estados
curl http://localhost:4000/api/tipos
curl http://localhost:4000/api/usuarios
Debemos obtener las siguientes salidas:
Desarrollo Web - Departamento Ciencias de la Computación y Electrónica
Ing. José Manuel Santos Sánchez
cada uno de los anteriores comandos usa curl para enviar solicitudes HTTP
directamente desde la terminal al servidor backend y comprobar que los endpoints
de la API funcionan correctamente.
El comando:curl http://localhost:4000/api/health
Realiza una solicitud GET al endpoint /api/health, que sirve como
prueba de salud
del sistema: si la conexión con la base de datos MySQL y el servidor Express están
operativos, responderá con {"ok": true}.
El comando:curl http://localhost:4000/api/estados
Consulta el catálogo de la tabla estado, devolviendo un arreglo JSON con los
registros almacenados (por ejemplo, “Activo”, “Bloqueado”, “Retirado”)
El comando:
curl http://localhost:4000/api/tipos
Hace lo mismo, pero con la tabla tipo_usuario, mostrando tipos como
“Administrador” y “Usuario”
El comando:
curl http://localhost:4000/api/usuarios
Realiza una solicitud GET al recurso principal de usuarios, devolviendo en formato
JSON todos los registros existentes en la tabla usuario, lo que permite verificar que
el backend puede acceder correctamente a la base de datos y responder con datos
reales.
Desarrollo Web - Departamento Ciencias de la Computación y Electrónica
Ing. José Manuel Santos Sánchez
Pruebas CRUD del Backend
Las pruebas CRUD permiten comprobar que el servidor backend implementa
correctamente las operaciones básicas sobre los datos: Crear (Create), Leer
(Read), Actualizar (Update) y Eliminar (Delete). Cada una se prueba enviando
solicitudes HTTP al servidor y analizando las respuestas que genera.
Antes de iniciar con las pruebas crud ten en cuenta lo siguiente:
El símbolo ^, este solo se usa en el símbolo del sistema de Windows (cmd) para
indicar que la instrucción continúa en la siguiente línea. Es un carácter de escape
que le dice al sistema: “No ejecutes el comando todavía; lo seguiré escribiendo en la
próxima línea”.
Las secuencias de escape con la barra invertida \" se usan porque, en el símbolo del
sistema de Windows (cmd), las comillas dobles (") se interpretan de manera
especial: el sistema cree que abren y cierran una cadena de texto literal del propio
comando. Si colocas comillas dobles dentro de otra cadena sin escaparlas, el
intérprete se confunde y corta el texto antes de tiempo.
Ahora si procedemos a realizar las diferentes prueba del crud
Prueba de creación
curl -X POST http://localhost:4000/api/usuarios ^
-H "Content-Type: application/json" ^
-d
"{\"username\":\"admin\",\"password\":\"Admin#2025\",\"nombre\":\"
Administrador\",\"edad\":30,\"id_estado\":1,\"id_tipo_usuario\":1}
"
curl -X POST http://localhost:4000/api/usuarios ^
-H "Content-Type: application/json" ^
-d
"{\"username\":\"juan\",\"password\":\"Juan#2025\",\"nombre\":\"Ju
an Pérez\",\"edad\":25,\"id_estado\":1,\"id_tipo_usuario\":2}"
Desarrollo Web - Departamento Ciencias de la Computación y Electrónica
Ing. José Manuel Santos Sánchez
Para el primer comando se puede observar que se genera el error “usuario ya
existe” porque el usuario “admin” fue creado desde la creación de la base de datos,
al intentar con otro usuario informa que fue creado
Prueba de creación
curl http://localhost:4000/api/usuarios
Para esta prueba se devuelven todos los registros de la tabla usuarios
Prueba de creación
curl -X PUT http://localhost:4000/api/usuarios/juan ^
-H "Content-Type: application/json" ^
-d "{\"nombre\":\"Juan P. Restrepo\",\"edad\":26}"
curl http://localhost:4000/api/usuarios
Se puede observar las modificaciones que se aplicaron al usuario “juan”
Desarrollo Web - Departamento Ciencias de la Computación y Electrónica
Ing. José Manuel Santos Sánchez
Prueba de eliminación
curl -X DELETE http://localhost:4000/api/usuarios/juan
curl http://localhost:4000/api/usuarios
En la salida se puede observar que al consultar los usuarios en el segundo comando
ya no se visualiza el usuario “juan”
Desarrollo Web - Departamento Ciencias de la Computación y Electrónica
Ing. José Manuel Santos Sánchez
Frontend – SPA con React + Vite
Inicializamos el proyecto vite para la creación del frontend
Desde el directorio crud-bdsantos ejecutamos los siguientes comandos
npm create vite@latest client -- --template react
cd client
npm install
npm i axios react-hook-form yup @hookform/resolvers
Desarrollo Web - Departamento Ciencias de la Computación y Electrónica
Ing. José Manuel Santos Sánchez
La secuencia de comandos anterior configura el frontend del proyecto usando Vite
y React, además de instalar librerías clave para el manejo de formularios y
validación.
El comando:
npm create vite@latest client -- --template react
Crea una nueva aplicación React utilizando la herramienta de construcción Vite,
especificando que el proyecto se almacenará en una carpeta llamada client y
aplicando la plantilla (--template react) para generar la estructura base de un
proyecto React moderno; luego, cd client cambia el directorio de trabajo hacia esa
carpeta recién creada, donde se encuentra el archivo package.json.
El comando:
npm install
Descarga e instala todas las dependencias que Vite y React requieren para
funcionar (como react, react-dom, vite, etc.).
El comando:
npm i axios react-hook-form yup @hookform/resolvers
instala librerías adicionales: Axios para realizar peticiones HTTP al backend, React
Hook Form para gestionar formularios de manera eficiente en React, Yup para
definir esquemas de validación de campos, y @hookform/resolvers, que permite
integrar las reglas de Yup directamente dentro de React Hook Form; en conjunto,
esta secuencia deja el entorno frontend completamente listo para comunicarse con
la API backend y manejar formularios con validación estructurada.
Desarrollo Web - Departamento Ciencias de la Computación y Electrónica
Ing. José Manuel Santos Sánchez
Creación del módulo de comunicación entre el Frontend y el Backend (api.js)
En este paso construiremos el módulo de comunicación del frontend con el
backend utilizando la librería Axios, que permite realizar solicitudes HTTP de
manera sencilla y eficiente. Este archivo actuará como un servicio centralizado,
encargado de enviar y recibir información desde la API construida en Node.js
(backend).
El archivo api.js se ubicará dentro del directorio client/src/ y tendrá la función de
definir una instancia de Axios con una dirección base (baseURL), la cual apunta
hacia el servidor del backend (por defecto: http://localhost:4000/api).
Sobre esta instancia, definiremos dos grupos de servicios:
• UsuariosAPI: implementa todas las operaciones CRUD sobre el recurso
usuario (crear, listar, actualizar y eliminar).
• CatalogosAPI: permite obtener los datos de los catálogos estado y
tipo_usuario, que servirán para llenar los selectores de los formularios.
Con este módulo, los componentes del frontend podrán interactuar con la base de
datos sin escribir consultas SQL directamente, sino a través de funciones de alto
nivel que se comunican con la API.
client\src\api.js
import axios from 'axios';
export const api = axios.create({
baseURL: 'http://localhost:4000/api'
});
export const UsuariosAPI = {
list: () => api.get('/usuarios').then(r => r.data),
get: (username) => api.get(`/usuarios/${username}`).then(r => r.data),
create: (data) => api.post('/usuarios', data).then(r => r.data),
update: (username, data) => api.put(`/usuarios/${username}`, data).then(r
=> r.data),
remove: (username) => api.delete(`/usuarios/${username}`).then(r =>
r.data)
};
Desarrollo Web - Departamento Ciencias de la Computación y Electrónica
Ing. José Manuel Santos Sánchez
export const CatalogosAPI = {
estados: () => api.get('/estados').then(r => r.data),
tipos: () => api.get('/tipos').then(r => r.data)
};
Este código define un módulo de servicios centralizados para que el frontend pueda
comunicarse con el backend mediante Axios, un cliente HTTP basado en promesas;
primero se crea una instancia llamada api con una baseURL fija
(http://localhost:4000/api), lo que evita repetir la dirección del servidor en cada
solicitud; a partir de esa instancia, se definen dos objetos: UsuariosAPI y
CatalogosAPI, que encapsulan las llamadas a los diferentes endpoints de la API;
UsuariosAPI implementa las operaciones CRUD sobre el recurso usuario: list()
obtiene todos los registros, get(username) consulta uno específico, create(data)
envía un POST para crear uno nuevo, update(username, data) modifica un usuario
existente mediante PUT y remove(username) elimina uno con DELETE;
CatalogosAPI, en cambio, expone funciones de solo lectura para consultar los
catálogos de estados y tipos; todas las funciones retornan directamente la
respuesta de la API transformada en datos (r.data), facilitando su uso dentro de los
componentes React.
A continuación, el mismo código anterior comentado.
// api.js — Servicio HTTP centralizado para consumir el backend
import axios from 'axios'; // Cliente HTTP
export const api = axios.create({ // Instancia con baseURL de la API
baseURL: 'http://localhost:4000/api' // Ajusta si backend está en otra URL
});
export const UsuariosAPI = { // Endpoints del recurso usuarios
list: () => api.get('/usuarios').then(r => r.data),
get: (username) => api.get(`/usuarios/${username}`).then(r => r.data),
create: (data) => api.post('/usuarios', data).then(r => r.data),
update: (username, data) => api.put(`/usuarios/${username}`, data).then(r
=> r.data),
remove: (username) => api.delete(`/usuarios/${username}`).then(r =>
r.data)
};
Desarrollo Web - Departamento Ciencias de la Computación y Electrónica
Ing. José Manuel Santos Sánchez
export const CatalogosAPI = { // Endpoints de catálogos
estados: () => api.get('/estados').then(r => r.data),
tipos: () => api.get('/tipos').then(r => r.data)
};
Integración de componentes y flujo de comunicación entre frontend y backend
Una vez creados los componentes principales del frontend como los formularios, las
tablas de visualización y los elementos de navegación, el siguiente paso consiste en
integrarlos dentro del flujo general de la aplicación. En esta fase, se configuran las
rutas, se establecen los estados globales o locales necesarios y se conectan los
componentes con los servicios del backend mediante las funciones definidas en
api.js.
El objetivo es permitir que los componentes se comuniquen entre sí de forma fluida:
que el listado de usuarios se actualice cuando se cree o edite un registro desde el
formulario, que las operaciones CRUD respondan visualmente a las acciones del
usuario, y que toda la información mostrada en pantalla refleje los datos reales de la
base de datos.
Procedemos a crear los componentes
Creamos dentro de
src la carpeta
components con el comando:
mkdir -p src/components
Desarrollo Web - Departamento Ciencias de la Computación y Electrónica
Ing. José Manuel Santos Sánchez
Creación del formulario dinámico de usuarios (UserForm.jsx)
En este paso se implementa el componente UserForm.jsx, que constituye la
interfaz principal para la creación y edición de usuarios dentro del sistema. Este
formulario permite capturar la información del usuario (nombre, edad, estado, tipo
de usuario, etc.) y enviarla al backend a través del servicio HTTP centralizado
definido en api.js. Se utilizan librerías como React Hook Form para manejar los
campos, validaciones y errores de manera eficiente, y Axios para las solicitudes
HTTP. De esta forma, el componente cumple una doble función: crear un nuevo
usuario cuando no hay uno seleccionado o actualizar los datos de un usuario
existente cuando sí se selecciona uno desde el listado.
En los siguientes códigos van a encontrar el operador spread de JavaScript, en los
fragmentos de código con los tres puntos (…), tiene como función expandir o
desempaquetar todas las propiedades del objeto
selected dentro de un nuevo
objeto, copia todas las claves y valores que tiene
selected y las coloca dentro de un
nuevo literal de objeto { }.
En nuestro proyecto el
selected es una variable de estado (state variable) que
representa el usuario actualmente seleccionado para editar dentro del sistema, se
encuentra declarado en el componente principal App.jsx de la siguiente manera:
const [selected, setSelected] = useState(null);
En alguna líneas también vamos a encontrar el operador de encadenamiento
opcional de JavaScript conocido también como optional chaining representado por
el signo de interrogación de cierre (?) , este operador permite acceder de forma
segura a propiedades anidadas en un objeto sin causar errores si alguna de esas
propiedades no existe o es undefined o null, en lugar de lanzar un error el operador
devuelve simplemente
undefined y el programa continua ejecutándose.
Ahora sí vamos con el componente UserForm.jsx
Desarrollo Web - Departamento Ciencias de la Computación y Electrónica
Ing. José Manuel Santos Sánchez
client/src/components/UserForm.jsx
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { CatalogosAPI, UsuariosAPI } from '../api';
const schema = yup.object({
username: yup.string().required('Requerido'),
password: yup.string().min(6, 'Mínimo 6 caracteres').optional(),
nombre: yup.string().required('Requerido'),
edad: yup.number().typeError('Debe ser número').integer('Debe ser
entero').min(1, 'Mínimo 1').required('Requerido'),
id_estado: yup.number().required('Requerido'),
id_tipo_usuario: yup.number().required('Requerido')
});
export default function UserForm({ selected, onSuccess }) {
const { register, handleSubmit, reset, formState: { errors } } = useForm({
resolver: yupResolver(schema),
defaultValues: { username: '', password: '', nombre: '', edad: '',
id_estado: 1, id_tipo_usuario: 2 }
});
const [estados, setEstados] = useState([]);
const [tipos, setTipos] = useState([]);
useEffect(() => {
(async () => {
setEstados(await CatalogosAPI.estados());
setTipos(await CatalogosAPI.tipos());
})();
}, []);
useEffect(() => {
if (selected) {
reset({ ...selected, password: '' });
} else {
reset({ username: '', password: '', nombre: '', edad: '', id_estado:
1, id_tipo_usuario: 2 });
}
}, [selected, reset]);
const onSubmit = async (values) => {
Desarrollo Web - Departamento Ciencias de la Computación y Electrónica
Ing. José Manuel Santos Sánchez
try {
if (selected) {
const { username, password, nombre, edad, id_estado, id_tipo_usuario
} = values;
const payload = { nombre, edad: Number(edad), id_estado:
Number(id_estado), id_tipo_usuario: Number(id_tipo_usuario) };
if (password) payload.password = password;
await UsuariosAPI.update(username, payload);
} else {
await UsuariosAPI.create({
...values,
edad: Number(values.edad),
id_estado: Number(values.id_estado),
id_tipo_usuario: Number(values.id_tipo_usuario)
});
}
onSuccess?.();
reset();
} catch (e) {
alert(e?.response?.data?.error || e.message);
}
};
return (
<form onSubmit={handleSubmit(onSubmit)} style={{ display: 'grid', gap:
8, maxWidth: 520 }}>
<h3>{selected ? 'Editar usuario' : 'Crear usuario'}</h3>
<label>Username
<input disabled={!!selected} {...register('username')} />
</label>
<p style={{ color: 'crimson' }}>{errors.username?.message}</p>
<label>Password {selected && <small>(dejar vacío para no
cambiar)</small>}
<input type="password" {...register('password')} />
</label>
<p style={{ color: 'crimson' }}>{errors.password?.message}</p>
<label>Nombre
<input {...register('nombre')} />
</label>
<p style={{ color: 'crimson' }}>{errors.nombre?.message}</p>
<label>Edad
Desarrollo Web - Departamento Ciencias de la Computación y Electrónica
Ing. José Manuel Santos Sánchez
<input type="number" {...register('edad')} />
</label>
<p style={{ color: 'crimson' }}>{errors.edad?.message}</p>
<label>Estado
<select {...register('id_estado')}>
{estados.map(e => <option key={e.id}
value={e.id}>{e.nombre}</option>)}
</select>
</label>
<p style={{ color: 'crimson' }}>{errors.id_estado?.message}</p>
<label>Tipo de usuario
<select {...register('id_tipo_usuario')}>
{tipos.map(t => <option key={t.id}
value={t.id}>{t.nombre}</option>)}
</select>
</label>
<p style={{ color: 'crimson' }}>{errors.id_tipo_usuario?.message}</p>
<div style={{ display: 'flex', gap: 8 }}>
<button type="submit">{selected ? 'Actualizar' : 'Crear'}</button>
<button type="button" onClick={() => reset()}>Limpiar</button>
</div>
</form>
);
}
El anterior código implementa un formulario dinámico en React que permite crear
o editar usuarios, combinando las librerías React Hook Form (RHF) y Yup para la
validación, además de comunicarse con el backend mediante los servicios definidos
en api.js.
Primero, se importan los módulos necesarios: useEffect y useState (hooks de React
para manejar efectos y estados), useForm (para controlar los formularios),
yupResolver (que conecta Yup con React Hook Form), yup (para definir reglas de
validación), y los servicios CatalogosAPI y UsuariosAPI que permiten obtener
catálogos y ejecutar operaciones CRUD sobre usuarios.
Desarrollo Web - Departamento Ciencias de la Computación y Electrónica
Ing. José Manuel Santos Sánchez
Luego, se define un esquema de validación schema con Yup, donde cada campo
(username, password, nombre, edad, id_estado, id_tipo_usuario) tiene reglas
específicas que garantizan que el usuario introduzca datos correctos (por ejemplo,
edad debe ser un número entero mayor que cero, y password debe tener al menos
seis caracteres).
Dentro del componente UserForm, se inicializa el formulario mediante useForm,
estableciendo los valores por defecto y asociando el esquema de validación a
través de yupResolver(schema). Se declaran los estados estados y tipos para
almacenar los catálogos cargados desde el backend. Con useEffect, al montar el
componente, se llaman las funciones CatalogosAPI.estados() y
CatalogosAPI.tipos() para llenar las opciones de los menús desplegables. Otro
useEffect detecta si el formulario se usa para editar (selected tiene datos) o crear
un nuevo usuario, precargando los valores o reiniciándolos según corresponda.
La función onSubmit gestiona el envío del formulario. Si se está editando, actualiza
el usuario con UsuariosAPI.update; si es un registro nuevo, lo crea con
UsuariosAPI.create. En ambos casos convierte los valores numéricos al tipo
adecuado, limpia el formulario con reset() y notifica al componente padre con
onSuccess. Si ocurre un error (por ejemplo, usuario duplicado o fallo en la API), se
muestra una alerta con el mensaje de error.
Finalmente, el componente devuelve el JSX del formulario, organizado en una
cuadrícula (display: grid), con cada campo controlado por React Hook Form a través
del método register. Los mensajes de validación se muestran debajo de cada
campo en color rojo, y los selectores de Estado y Tipo de usuario se llenan
dinámicamente con los datos traídos desde el backend. El formulario incluye dos
botones: uno para enviar (crear o actualizar) y otro para limpiar los campos. En
conjunto, el código implementa una interfaz profesional, validada y conectada
directamente al backend para gestionar usuarios.
A continuación el mismo código comentado:
Desarrollo Web - Departamento Ciencias de la Computación y Electrónica
Ing. José Manuel Santos Sánchez
// UserForm.jsx — Formulario para Crear/Editar usuarios
import { useEffect, useState } from 'react'; // Hooks de React
import { useForm } from 'react-hook-form'; // Manejo de formularios
import { yupResolver } from '@hookform/resolvers/yup'; // Conecta RHF con
yup
import * as yup from 'yup'; // Definición de esquemas
import { CatalogosAPI, UsuariosAPI } from '../api'; // Servicios HTTP
// Esquema de validación para cada campo
const schema = yup.object({
username: yup.string().required('Requerido'),
password: yup.string().min(6, 'Mínimo 6 caracteres').optional(),
nombre: yup.string().required('Requerido'),
edad: yup
.number()
.typeError('Debe ser número')
.integer('Debe ser entero')
.min(1, 'Mínimo 1')
.required('Requerido'),
id_estado: yup.number().required('Requerido'),
id_tipo_usuario: yup.number().required('Requerido')
});
export default function UserForm({ selected, onSuccess }) { // selected:
datos para editar
const { register, handleSubmit, reset, formState: { errors } } = useForm({
resolver: yupResolver(schema), // Usa yup para validar
defaultValues: { // Valores iniciales del form
username: '',
password: '',
nombre: '',
edad: '',
id_estado: 1,
id_tipo_usuario: 2
}
});
const [estados, setEstados] = useState([]); // Catálogo estados
const [tipos, setTipos] = useState([]); // Catálogo tipos
useEffect(() => { // Al montar, cargar catálogos
(async () => {
setEstados(await CatalogosAPI.estados());
setTipos(await CatalogosAPI.tipos());
Desarrollo Web - Departamento Ciencias de la Computación y Electrónica
Ing. José Manuel Santos Sánchez
})();
}, []);
useEffect(() => { // Si cambia selected
if (selected) { // Editar: precargar valores
reset({ ...selected, password: '' }); // No mostramos/forzamos
password
} else { // Crear: limpiar formulario
reset({
username: '',
password: '',
nombre: '',
edad: '',
id_estado: 1,
id_tipo_usuario: 2
});
}
}, [selected, reset]);
const onSubmit = async (values) => { // Envío del formulario
try {
if (selected) { // Si edita…
const { username, password, nombre, edad, id_estado, id_tipo_usuario
} = values;
const payload = {
nombre,
edad: Number(edad),
id_estado: Number(id_estado),
id_tipo_usuario: Number(id_tipo_usuario)
};
if (password) payload.password = password; // Solo si desea cambiar
password
await UsuariosAPI.update(username, payload); // PUT
/usuarios/:username
} else { // Si crea…
await UsuariosAPI.create({ // POST /usuarios
...values,
edad: Number(values.edad),
id_estado: Number(values.id_estado),
id_tipo_usuario: Number(values.id_tipo_usuario)
});
}
onSuccess?.(); // Notifica al padre (recargar)
reset(); // Limpia el formulario
} catch (e) {
Desarrollo Web - Departamento Ciencias de la Computación y Electrónica
Ing. José Manuel Santos Sánchez
alert(e?.response?.data?.error || e.message); // Muestra error si algo
falla
}
};
return (
<form onSubmit={handleSubmit(onSubmit)} style={{ display: 'grid', gap:
8, maxWidth: 520 }}>
<h3>{selected ? 'Editar usuario' : 'Crear usuario'}</h3>
<label>Username
<input disabled={!!selected} {...register('username')} /> {/*
Deshabilitado al editar */}
</label>
<p style={{ color: 'crimson' }}>{errors.username?.message}</p>
<label>Password {selected && <small>(dejar vacío para no
cambiar)</small>}
<input type="password" {...register('password')} />
</label>
<p style={{ color: 'crimson' }}>{errors.password?.message}</p>
<label>Nombre
<input {...register('nombre')} />
</label>
<p style={{ color: 'crimson' }}>{errors.nombre?.message}</p>
<label>Edad
<input type="number" {...register('edad')} />
</label>
<p style={{ color: 'crimson' }}>{errors.edad?.message}</p>
<label>Estado
<select {...register('id_estado')}>
{estados.map(e => (
<option key={e.id} value={e.id}>{e.nombre}</option>
))}
</select>
</label>
<p style={{ color: 'crimson' }}>{errors.id_estado?.message}</p>
<label>Tipo de usuario
<select {...register('id_tipo_usuario')}>
{tipos.map(t => (
<option key={t.id} value={t.id}>{t.nombre}</option>
Desarrollo Web - Departamento Ciencias de la Computación y Electrónica
Ing. José Manuel Santos Sánchez
))}
</select>
</label>
<p style={{ color: 'crimson' }}>{errors.id_tipo_usuario?.message}</p>
<div style={{ display: 'flex', gap: 8 }}>
<button type="submit">{selected ? 'Actualizar' : 'Crear'}</button>
<button type="button" onClick={() => reset()}>Limpiar</button>
</div>
</form>
);
}
Desarrollo Web - Departamento Ciencias de la Computación y Electrónica
Ing. José Manuel Santos Sánchez
Creamos el componente UserTableClient\src\components\UserTable.jsx
import { useEffect, useState } from 'react';
import { UsuariosAPI } from '../api';
export default function UserTable({ onEdit, reload }) {
const [data, setData] = useState([]);
const [loading, setLoading] = useState(false);
const load = async () => {
setLoading(true);
try {
const rows = await UsuariosAPI.list();
setData(rows);
} catch (e) {
alert(e?.response?.data?.error || e.message);
} finally {
setLoading(false);
}
};
useEffect(() => {
load();
}, [reload]);
const remove = async (username) => {
if (!confirm('¿Eliminar usuario?')) return;
try {
await UsuariosAPI.remove(username);
await load();
} catch (e) {
alert(e?.response?.data?.error || e.message);
}
};
return (
<div>
<h3>Usuarios</h3>
{loading && <p>Cargando...</p>}
<table border="1" cellPadding="6" style={{ borderCollapse: 'collapse',
width: '100%' }}>
<thead>
<tr>
Desarrollo Web - Departamento Ciencias de la Computación y Electrónica
Ing. José Manuel Santos Sánchez
<th>Username</th>
<th>Nombre</th>
<th>Edad</th>
<th>Estado</th>
<th>Tipo</th>
<th>Acciones</th>
</tr>
</thead>
<tbody>
{data.map(u => (
<tr key={u.username}>
<td>{u.username}</td>
<td>{u.nombre}</td>
<td>{u.edad}</td>
<td>{u.estado}</td>
<td>{u.tipo}</td>
<td>
<button onClick={() => onEdit(u.username)}>Editar</button>
<button onClick={() => remove(u.username)}>Eliminar</button>
</td>
</tr>
))}
{!data.length && !loading && (
<tr>
<td colSpan="6" style={{ textAlign: 'center' }}>Sin datos</td>
</tr>
)}
</tbody>
</table>
</div>
);
}
Este código define el componente UserTable, encargado de mostrar en pantalla la
lista de usuarios y las acciones de editar o eliminar. Primero importa los hooks
useState y useEffect de React, junto con el servicio UsuariosAPI, que permite
comunicarse con el backend. Luego, el componente recibe dos propiedades:
onEdit, una función que se ejecuta cuando el usuario hace clic en el botón “Editar”, y
reload, una bandera que indica cuándo debe recargarse la tabla. Dentro del
componente se crean dos estados locales: data, que almacena la lista de usuarios
obtenidos del servidor, y loading, que indica si los datos están cargando. La función
load es asíncrona y se encarga de llamar a UsuariosAPI.list() para obtener los
Desarrollo Web - Departamento Ciencias de la Computación y Electrónica
Ing. José Manuel Santos Sánchez
registros, mostrándolos en la tabla y gestionando errores mediante un alert que usa
encadenamiento opcional (?.) para evitar fallos si alguna propiedad del error no
existe. El useEffect se ejecuta al montar el componente o cuando cambia reload,
permitiendo actualizar automáticamente la información. La función remove elimina
un usuario específico luego de pedir confirmación y recarga los datos actualizados.
Finalmente, el retorno (return) renderiza una tabla con los usuarios y dos botones
por fila: “Editar”, que invoca onEdit(u.username), y “Eliminar”, que ejecuta
remove(u.username). Si loading está activo, muestra el mensaje “Cargando...”, y si
no hay datos, aparece una fila con el texto “Sin datos”. Este componente mantiene
sincronizado el listado de usuarios con la base de datos.
Desarrollo Web - Departamento Ciencias de la Computación y Electrónica
Ing. José Manuel Santos Sánchez
Remplazamos el componente raíz de arranque
Editar el archivo App.jsx (remplazando su contenido por el siguiente)client\src\App.jsx
import { useState } from 'react';
import { UsuariosAPI } from './api';
import UserForm from './components/UserForm';
import UserTable from './components/UserTable';
export default function App() {
const [selected, setSelected] = useState(null);
const [reload, setReload] = useState(false);
const handleEdit = async (username) => {
const data = await UsuariosAPI.get(username);
setSelected(data);
};
const refresh = () => setReload(v => !v);
return (
<div style={{ padding: 20, display: 'grid', gap: 20 }}>
<h2>CRUD Usuarios – React + Vite + Node.js</h2>
<UserForm selected={selected} onSuccess={() => { setSelected(null);
refresh(); }} />
<UserTable onEdit={handleEdit} reload={reload} />
</div>
);
}
El componente principal App, actúa como el punto central de coordinación entre el
formulario de usuarios y la tabla del sistema CRUD. Primero importa el hook
useState de React para manejar estados locales, el módulo UsuariosAPI para
comunicarse con el backend y los dos componentes hijos: UserForm (formulario
para crear o editar usuarios) y UserTable (tabla que muestra la lista de registros).
Dentro del componente, se crean dos estados: selected, que almacena el usuario
actualmente seleccionado para edición (o null si se está creando uno nuevo), y
reload, una bandera booleana que se alterna para forzar la recarga de la tabla tras
una modificación. La función handleEdit recibe el nombre de usuario desde la tabla,
consulta al backend con UsuariosAPI.get(username) y guarda los datos obtenidos
Desarrollo Web - Departamento Ciencias de la Computación y Electrónica
Ing. José Manuel Santos Sánchez
en selected, lo que hace que el formulario se precargue automáticamente. La
función refresh alterna el valor de reload con setReload(v => !v) para indicar que
deben volver a cargarse los datos. En el retorno (return), se organiza la interfaz
principal: un contenedor <div> con espaciado y disposición en cuadrícula, un título
descriptivo y los componentes UserForm y UserTable. El UserForm recibe como
propiedades el usuario selected y una función onSuccess que se ejecuta al
completar una operación exitosa (limpia el formulario y recarga la tabla), mientras
que UserTable recibe onEdit (para editar) y reload (para actualizarse). En conjunto,
este componente implementa el flujo completo del CRUD, gestionando el estado
global de la aplicación y la comunicación entre los componentes de presentación y
la API.
A continuación el mismo código comentado:
// App.jsx — Orquesta formulario y tabla, maneja estado de edición y recarga
import { useState } from 'react'; // Estado local
import { UsuariosAPI } from './api'; // Servicio de usuarios
import UserForm from './components/UserForm'; // Formulario (ya creado)
import UserTable from './components/UserTable'; // Tabla (ya creada)
export default function App() {
const [selected, setSelected] = useState(null); // Usuario seleccionado
para editar
const [reload, setReload] = useState(false); // Bandera para recargar
tabla
const handleEdit = async (username) => { // Cargar datos en el form para
editar
const data = await UsuariosAPI.get(username);
setSelected(data);
};
const refresh = () => setReload(v => !v); // Alterna para desencadenar
recarga
return (
<div style={{ padding: 20, display: 'grid', gap: 20 }}>
<h2>CRUD Usuarios – React + Vite + Node.js</h2>
<UserForm selected={selected} onSuccess={() => { setSelected(null);
refresh(); }} />
<UserTable onEdit={handleEdit} reload={reload} />
</div>
Desarrollo Web - Departamento Ciencias de la Computación y Electrónica
Ing. José Manuel Santos Sánchez
);
}
Desarrollo Web - Departamento Ciencias de la Computación y Electrónica
Ing. José Manuel Santos Sánchez
Punto de entrada y montaje de la aplicación React en el navegador
En este paso se define el archivo principal main.jsx, encargado de inicializar la
aplicación y montarla dentro del documento HTML que se renderiza en el
navegador. Este archivo actúa como el puente entre el código React y el DOM
(Document Object Model), creando la raíz del árbol de componentes e insertando
la aplicación en el elemento con identificador root del archivo index.html. Además,
utiliza el componente <React.StrictMode>, una herramienta que activa
comprobaciones adicionales durante el desarrollo para detectar posibles problemas
en el código, sin afectar el comportamiento en producción. En conjunto, este punto
de entrada permite que la aplicación React comience a ejecutarse en el navegador,
renderizando el componente principal App y dando inicio al flujo de la interfaz
construida con Vite y React.client\src\main.jsx
// main.jsx — Entrada de la app en el navegador
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(
<React.StrictMode>
<App />
</React.StrictMode>
);
El archivo main.jsx, actúa como el punto de entrada de la aplicación React en el
navegador. Primero se importan las librerías React y ReactDOM, donde React
permite crear y manejar los componentes, mientras que ReactDOM se encarga de
renderizarlos en el DOM (la estructura del documento HTML que interpreta el
navegador). Luego se importa el componente principal App, que contiene toda la
lógica y los componentes de la interfaz. La instrucción
ReactDOM.createRoot(document.getElementById('root')) crea la raíz de
renderizado en el elemento <div id="root"></div> definido dentro del archivo
index.html, que es donde React “inyecta” su contenido. A continuación, el método
.render() se encarga de mostrar el componente <App /> dentro de ese elemento
del DOM. El componente <React.StrictMode> envuelve a <App /> y tiene la
Desarrollo Web - Departamento Ciencias de la Computación y Electrónica
Ing. José Manuel Santos Sánchez
función de activar verificaciones adicionales durante el desarrollo, ayudando a
detectar prácticas obsoletas o errores potenciales sin afectar el comportamiento de
la aplicación en producción. En conjunto, este archivo inicializa la aplicación React y
monta el árbol de componentes en el navegador, permitiendo que toda la interfaz
del sistema cobre vida.
Desarrollo Web - Departamento Ciencias de la Computación y Electrónica
Ing. José Manuel Santos Sánchez
Estructura base del documento HTML y punto de montaje de la aplicación
React archivo index.html
Este archivo HTML representa la plantilla principal que sirve como contenedor de
la aplicación desarrollada con React y Vite. A diferencia de las páginas HTML
tradicionales que contienen directamente el contenido visible, en una aplicación
React este documento funciona como una carcasa vacía en la que se montará
dinámicamente toda la interfaz generada mediante componentes. Su función
principal es establecer la estructura mínima del documento y proporcionar el punto
de anclaje donde React insertará el contenido renderizado desde el código
JavaScript.client\index.html
<!doctype html>
<html lang="es">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>CRUD Usuarios</title>
</head>
<body>
<div id="root"></div>
<script type="module" src="/src/main.jsx"></script>
</body>
</html>
En el <body> se encuentra el elemento <div id="root"></div>, que actúa como el
contenedor raíz donde React montará la interfaz completa de la aplicación; este
elemento se conecta directamente con la instrucción
document.getElementById('root') del archivo main.jsx. Finalmente, la línea <script
type="module" src="/src/main.jsx"></script> carga el archivo JavaScript principal
que inicializa React.
Desarrollo Web - Departamento Ciencias de la Computación y Electrónica
Ing. José Manuel Santos Sánchez
Ahora se procede a ejecutar y probar tanto el Backend como el Fronten
Para realizar las pruebas vamos a ejecutar dos terminales de símbolo de sistema, en
una ejecutaremos el servidor y en la otra el cliente de la siguiente manera:
Desde el directorio de la carpeta destinada para el proyecto del servidor (server)
Ejecutamos el comando
npm run dev
Ahora en la segunda terminal de símbolo de sistema desde el directorio destinado al
proyecto cliente (client), es ejecuta el comando:
npm run dev
Desarrollo Web - Departamento Ciencias de la Computación y Electrónica
Ing. José Manuel Santos Sánchez
Puedes acceder desde un navegador a la url http://localhost:5173 o presionar la
tecla control (Ctrl) + clic en el enlace que aparece en la terminal y ejecutar y probar
las opciones del sitio.
El sitio debe tener la siguiente apariencia y debes proceder a realizar las pruebas
Desarrollo Web - Departamento Ciencias de la Computación y Electrónica
Ing. José Manuel Santos Sánchez
La estructura final del servidor debe quedar así:
Desarrollo Web - Departamento Ciencias de la Computación y Electrónica
Ing. José Manuel Santos Sánchez
La estructura final del cliente debe quedar así:
Desarrollo Web - Departamento Ciencias de la Computación y Electrónica
Ing. José Manuel Santos Sánchez
Entregable
Para el envió de la actividad comprima en formato .zip la carpeta contenedora de
los proyectos server y client, que para efectos de esta guía fue el directorio crud-
bdsantos, no es necesario que incluyan el script de la base de datos pero si es
necesario que la base de datos tenga los mismos campos porque al momento de
probarlo voy a correrlo con mi base de datos.
Rúbrica de evaluación
Criterio Excelente
(4,6–5,0)
Avanzado
(4,0–4,5)
Satisfactori
o (3,0–3,9)
Mínimo (2,0–
2,9)
Insuficiente
(0–1,9)
Pes
o
Diseño e
implementació
n del backend
con Node.js y
Express
Configura de
manera completa
y funcional el
servidor con
Express, define
rutas modulares,
maneja variables
de entorno, y
establece
conexión estable
con MySQL
mediante
mysql2/promise
. Todas las
operaciones
CRUD funcionan
correctamente y
devuelven
respuestas JSON
válidas.
El servidor
Express está
correctamente
implementado,
pero presenta
pequeños
errores en la
modularización
o el manejo de
excepciones;
las operaciones
CRUD son
funcionales con
leves
inconsistencias
.
Configura un
servidor
básico con
Express que
realiza parte
de las
operaciones
CRUD;
algunas rutas
no responden
correctament
e o la
conexión con
MySQL es
inestable.
Presenta
dificultades al
crear las rutas
o conectar con
la base de
datos; solo
parte del
backend es
funcional.
No logra
levantar el
servidor ni
conectar con la
base de datos
MySQL; el
backend no
ejecuta
correctamente
ninguna
operación.
30%
Desarrollo Web - Departamento Ciencias de la Computación y Electrónica
Ing. José Manuel Santos Sánchez
Diseño e
implementació
n del frontend
con React + Vite
Crea una interfaz
funcional,
estructurada y
coherente, con
componentes
React modulares
(UserForm y
UserTable) que
interactúan
correctamente
con el backend
mediante Axios.
Se aplican
validaciones con
yup y react-
hook-form.
Implementa la
interfaz
correctamente
con
componentes
React, aunque
con errores
menores en
validación o
actualización
del estado;
mantiene una
comunicación
estable con el
backend.
Construye la
interfaz y logra
comunicación
parcial con el
backend;
algunos
componentes
o formularios
presentan
fallos visuales
o funcionales.
La interfaz está
incompleta o
carece de
conexión
adecuada con
el backend;
solo algunas
funciones
básicas son
operativas.
No implementa
adecuadament
e el frontend o
no existe
comunicación
con el backend.
30%
Gestión del
estado y flujo
de datos entre
componentes
Maneja
correctamente
los estados
globales y locales
con hooks
(useState,
useEffect),
sincronizando los
cambios entre
formulario y tabla
en tiempo real.
Aplica
correctamente
callbacks
(onEdit,
onSuccess) y
refresca la
información sin
errores.
Gestiona
adecuadament
e los estados,
aunque se
evidencian
pequeños
retrasos o
errores de
sincronización
entre el
formulario y la
tabla.
Utiliza hooks
básicos para
manejar
estados, pero
la
actualización
de datos
requiere
recargar
manualmente
o reiniciar el
servidor.
El flujo de
datos entre
componentes
es confuso o
presenta
errores
frecuentes que
interrumpen el
funcionamient
o del CRUD.
No hay
coherencia en
la
comunicación
entre
componentes;
el manejo de
estados no
permite
interacción
funcional.
20%
Integración del
frontend y
backend
(pruebas CRUD
completas)
Ejecuta
exitosamente las
operaciones
Create, Read,
Update y Delete
desde la interfaz
web, con
retroalimentació
n inmediata en la
tabla y validación
de datos.
Documenta
evidencias
funcionales.
Realiza la
mayoría de las
operaciones
CRUD con
éxito, aunque
presenta
pequeños fallos
en la
actualización o
visualización de
datos.
Logra ejecutar
parcialmente
las
operaciones
CRUD (al
menos dos),
con errores
esporádicos o
falta de
validación.
Solo una
operación
CRUD funciona
correctamente
; las demás
fallan o no se
ejecutan.
No logra
integrar el
frontend con el
backend; la
aplicación no
permite
manipular
datos.
15%
Desarrollo Web - Departamento Ciencias de la Computación y Electrónica
Ing. José Manuel Santos Sánchez
Entrega y
estructura del
proyecto
(organización,
nomenclatura y
documentación
)
Presenta la
estructura
completa del
proyecto (server
y client), archivos
correctamente
nombrados y
organizados;
incluye
comentarios
explicativos y
documentación
técnica clara.
El proyecto
mantiene
buena
organización y
comentarios,
aunque faltan
detalles en la
documentación
o estructura.
La estructura
del proyecto
es funcional
pero carece
de
uniformidad
en nombres o
comentarios.
El proyecto
está
incompleto o
presenta
desorden en
carpetas y
archivos; la
documentació
n es escasa.
No entrega el
proyecto
completo o no
cumple con la
estructura
solicitada.
5%
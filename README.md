# CRUD Usuarios - Proyecto Completo

Sistema CRUD completo para gestión de usuarios desarrollado con Node.js, Express, MySQL, React y Vite.

## Estructura del Proyecto

```
.
├── backend/          # API REST con Node.js y Express
│   ├── src/
│   │   ├── index.js              # Punto de entrada del servidor
│   │   ├── db.js                 # Configuración de conexión MySQL
│   │   └── routes/
│   │       ├── usuarios.routes.js    # Rutas CRUD de usuarios
│   │       ├── estados.routes.js     # Rutas de catálogo de estados
│   │       └── tipos.routes.js       # Rutas de catálogo de tipos de usuario
│   ├── api/
│   │   └── index.js              # Handler para Vercel serverless
│   ├── package.json
│   ├── vercel.json               # Configuración de despliegue en Vercel
│   └── .env                      # Variables de entorno (no incluido en repo)
│
└── frontend/         # Aplicación React con Vite
    ├── src/
    │   ├── main.jsx              # Punto de entrada de React
    │   ├── App.jsx               # Componente principal
    │   ├── api.js                # Servicios HTTP con Axios
    │   └── components/
    │       ├── UserForm.jsx      # Formulario de creación/edición
    │       └── UserTable.jsx     # Tabla de listado de usuarios
    ├── package.json
    └── vite.config.js
```

## Características Implementadas

### Backend

- API REST completa con Express.js
- Conexión a base de datos MySQL usando mysql2/promise
- CRUD completo de usuarios (Create, Read, Update, Delete)
- Encriptación de contraseñas con bcryptjs
- Validación de datos en el servidor
- Manejo de errores y respuestas HTTP apropiadas
- CORS configurado para permitir peticiones del frontend
- Endpoints de catálogos (estados y tipos de usuario)
- Endpoint de health check para verificar estado del servidor
- Configuración para despliegue en Vercel como serverless function

### Frontend

- Interfaz de usuario desarrollada con React y Vite
- Formulario dinámico con validación usando React Hook Form y Yup
- Tabla de usuarios con acciones de editar y eliminar
- Validación de formularios en tiempo real
- Manejo de estados de carga y errores
- Diseño responsive y moderno
- Integración completa con la API del backend
- Contraseña opcional al editar usuarios (no se actualiza si se deja vacía)
- Actualización automática de la lista después de operaciones CRUD

## Tecnologías Utilizadas

### Backend
- Node.js (v22.20.0)
- Express.js
- MySQL (mysql2/promise)
- bcryptjs (encriptación de contraseñas)
- dotenv (variables de entorno)
- cors (manejo de CORS)

### Frontend
- React 18
- Vite (build tool)
- React Hook Form (gestión de formularios)
- Yup (validación de esquemas)
- Axios (cliente HTTP)
- @hookform/resolvers (integración Yup con React Hook Form)

## Instalación y Configuración

### Requisitos Previos
- Node.js v22.20.0 o superior
- MySQL Server
- npm o yarn

### Backend

1. Navegar a la carpeta backend:
```bash
cd backend
```

2. Instalar dependencias:
```bash
npm install
```

3. Crear archivo `.env` con las siguientes variables:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=bdsantos
DB_PORT=3306
PORT=4000
```

4. Crear la base de datos ejecutando el script SQL proporcionado en `backend/contexto.md`

5. Iniciar el servidor en modo desarrollo:
```bash
npm run dev
```

6. O iniciar en modo producción:
```bash
npm start
```

El servidor estará disponible en `http://localhost:4000`

### Frontend

1. Navegar a la carpeta frontend:
```bash
cd frontend
```

2. Instalar dependencias:
```bash
npm install
```

3. Iniciar el servidor de desarrollo:
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## API Endpoints

### Usuarios
- `GET /api/usuarios` - Listar todos los usuarios
- `GET /api/usuarios/:username` - Obtener un usuario por username
- `POST /api/usuarios` - Crear un nuevo usuario
- `PUT /api/usuarios/:username` - Actualizar un usuario
- `DELETE /api/usuarios/:username` - Eliminar un usuario

### Catálogos
- `GET /api/estados` - Listar estados disponibles
- `GET /api/tipos` - Listar tipos de usuario disponibles

### Health Check
- `GET /api/health` - Verificar estado del servidor y conexión a la base de datos

## Despliegue en Vercel

### Backend

1. Instalar Vercel CLI:
```bash
npm install -g vercel
```

2. Iniciar sesión:
```bash
vercel login
```

3. Desplegar:
```bash
cd backend
vercel --prod
```

4. Configurar variables de entorno en el dashboard de Vercel o mediante CLI:
```bash
vercel env add DB_HOST production
vercel env add DB_USER production
vercel env add DB_PASSWORD production
vercel env add DB_NAME production
vercel env add DB_PORT production
vercel env add PORT production
```

### Frontend

1. Desplegar:
```bash
cd frontend
vercel --prod
```

2. Actualizar la URL del backend en `frontend/src/api.js` con la URL de producción del backend desplegado.

## Funcionalidades Adicionales Implementadas

- Validación de contraseña opcional al editar usuarios
- Manejo de errores mejorado con mensajes descriptivos
- Interfaz de usuario mejorada con diseño moderno
- Configuración de CORS para permitir peticiones desde cualquier origen
- Soporte para desarrollo local y producción
- Configuración de Vercel para despliegue serverless
- Estructura de proyecto organizada en carpetas separadas para backend y frontend

## Notas Importantes

- El archivo `.env` no debe ser incluido en el repositorio (está en `.gitignore`)
- La base de datos MySQL debe estar accesible desde internet para el despliegue en Vercel
- El frontend detecta automáticamente si está en desarrollo o producción para usar la URL correcta del backend
- Las contraseñas se encriptan automáticamente antes de guardarse en la base de datos

## Autor

Proyecto desarrollado siguiendo las especificaciones del archivo `contexto.md` proporcionado.


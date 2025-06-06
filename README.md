# Challenge Final - Plataforma de Cursos Online

## 📚 Proyecto Integrador Final

Este proyecto consiste en el desarrollo de una **plataforma completa de cursos online**, que incluye tanto frontend como backend. El sistema implementa autenticación y autorización por roles (Superadmin, Profesor y Alumno) y permite la gestión de cursos, inscripciones y calificaciones.

---

## 🛠 Tecnologías Utilizadas

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT para autenticación
- Nodemailer (para recuperación de contraseña)
- Validator + Middleware personalizados
- Dotenv

### Frontend
- React.js con Hooks
- Redux (clásico)
- React Router
- Axios
- Styled Components / Tailwind CSS

---

## 🔐 Sistema de Roles

| Rol         | Descripción |
|-------------|-------------|
| **Superadmin** | Registro de profesores, gestión total de usuarios y cursos, estadísticas generales. |
| **Profesor**   | Alta y gestión de cursos propios, visualización de alumnos, carga de calificaciones. |
| **Alumno**     | Registro libre, inscripción a cursos, consulta de calificaciones. |

---

## 🖥 Funcionalidades por Rol

### 👤 Superadmin
- Dashboard con estadísticas generales
- Crear/editar/eliminar usuarios (profesores y superadmins)
- Ver lista de cursos

### 👨‍🏫 Profesor
- Crear, editar y eliminar sus cursos
- Ver alumnos inscriptos a sus cursos
- Cargar y editar calificaciones

### 👨‍🎓 Alumno
- Registro y login
- Navegar por catálogo de cursos
- Inscripción y cancelación
- Visualización de calificaciones

---

## 📂 Endpoints del Backend

### Autenticación
- `POST /auth/login`
- `POST /auth/register` (solo alumnos)
- `POST /auth/forgot-password`
- `POST /auth/reset-password`

### Usuarios
- `GET /users`
- `GET /users/:id`
- `PUT /users/:id`
- `DELETE /users/:id`
- `POST /users` (crear profesor o superadmin)

### Cursos
- `GET /courses`
- `GET /courses/:id`
- `POST /courses`
- `PUT /courses/:id`
- `DELETE /courses/:id`
- `GET /courses/professor/:id`

### Inscripciones
- `GET /enrollments/student/:id`
- `POST /enrollments`
- `DELETE /enrollments/:id`
- `GET /enrollments/course/:id`

### Calificaciones
- `GET /grades/student/:id`
- `POST /grades`
- `PUT /grades/:id`

---

## 🖼 Pantallas del Frontend

- Login / Registro / Recuperación
- Dashboard personalizado según rol
- Lista y detalle de cursos
- Formularios con validaciones
- Paginación y filtros por categoría, nivel, etc.
- Inscripciones y gestión de calificaciones
- Navegación protegida por roles

---

## ✅ Requisitos

### Backend
- Autenticación JWT completa
- CRUD completo para todas las entidades
- Validaciones de negocio y errores
- Paginación y filtros en listados
- Recuperación de contraseña por email

### Frontend
- Manejo de estado con Redux
- Navegación con React Router
- Formularios con validaciones
- Gestión completa de entidades
- Estados de carga, errores y protección por roles

---

## 🚀 Instrucciones de Instalación

### Clonar el repositorio

```bash
git clone https://github.com/usuario/challengeFinal-akademi-nombreApellido.git
cd challengeFinal-akademi-nombreApellido
```

### Backend

1. Instalar dependencias:

```bash
npm install
```

3. Crear un archivo `.env` con las siguientes variables:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/cursos
JWT_SECRET=tu_clave_secreta
EMAIL_USER=tu_email
EMAIL_PASS=tu_contraseña
```

4. Iniciar el servidor:

```bash
npm run dev
```

### Frontend


1. Instalar dependencias:

```bash
npm install
```

2. Iniciar la aplicación:

```bash
npm start
```

---

## 📬 Colección de Postman

Incluida coleccion `postman` con ejemplos de cada endpoint.

---

## 👨‍💻 Autor

- **Nombre:** Griselda Alegre  
- **Repositorio GitHub:** [github.com/griseldaalegre](https://github.com/griseldaalegre)

---



# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

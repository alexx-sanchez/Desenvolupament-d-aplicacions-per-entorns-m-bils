# Registro de Usuario con Node.js y DB-Local

Aplicación sencilla para el registro de usuarios usando Node.js, Express y una base de datos local con DB-Local. Las contraseñas se almacenan de forma segura mediante hashing con bcryptjs y la interfaz se sirve con plantillas EJS.

---

## Descripción

Este proyecto permite a los usuarios registrarse con un nombre de usuario y contraseña. Se aplican validaciones básicas para asegurar que los datos sean correctos y que los nombres de usuario sean únicos. La contraseña se almacena en forma cifrada para garantizar la seguridad.

---

## Tecnologías utilizadas

- **Node.js** como entorno de ejecución.
- **Express** para el servidor web.
- **DB-Local** para almacenamiento local de datos.
- **bcryptjs** para hashing seguro de contraseñas.
- **EJS** para renderizado de vistas.
- **JavaScript ES Modules** para modularización del código.

---

## Funcionalidades principales

- Registro de usuario con validación de datos.
- Almacenamiento seguro de contraseñas.
- Prevención de registros duplicados con nombres de usuario únicos.
- Servidor con vista de registro accesible desde el navegador.

---

## Arquitectura del proyecto

- **Servidor Express** que maneja rutas para servir la página de registro y para registrar usuarios.
- **Repositorio de usuarios** que valida y almacena usuarios en la base de datos local.
- **Vista con formulario de registro** renderizada con EJS.
- **Archivos estáticos** para CSS y scripts en la carpeta pública.

---

## Endpoints disponibles

- `GET /`  
  Muestra el formulario de registro.

- `POST /register`  
  Recibe datos de usuario para crear un nuevo registro. Retorna el ID generado para el usuario o un error si el registro falla.

---

## Validaciones aplicadas

- El nombre de usuario debe tener al menos 3 caracteres.
- La contraseña debe tener al menos 6 caracteres.
- No se permiten nombres de usuario repetidos.

---

## Seguridad

- Las contraseñas se almacenan cifradas mediante bcryptjs.
- Los IDs de usuario se generan de forma única usando UUID.

---

## Consideraciones

Este proyecto es una base para un sistema de registro de usuarios que puede ser ampliado con funcionalidades de login, gestión de sesiones y más.

---

## Licencia

Proyecto de código abierto bajo licencia MIT.


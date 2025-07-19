# Sistema de Control de Unidades MDT

Este proyecto es una web para la gestión de unidades, agentes y usuarios en un entorno de roleplay policial, inspirado en sistemas reales de control como CIMACC-091.

## Características principales

- **Inicio de sesión**: Acceso por placa y contraseña, con roles diferenciados (admin, usuario, agente).
- **Panel de administración**:
  - Crear usuarios/agentes con placa, nombre, rango, contraseña y rol.
  - Visualizar todos los usuarios/agentes existentes con su información.
- **Panel de unidades**:
  - Agregar nuevas unidades en servicio, asignando agentes y anotaciones.
  - Visualizar todas las unidades en servicio, sus agentes, estado (libre/ocupada) y anotaciones.
  - Cambiar el estado de una unidad (libre/ocupada).
  - Eliminar unidades.
  - Modificar anotaciones de cada unidad directamente desde la tabla.
- **Panel de agente**:
  - Visualizar las unidades en servicio y sus anotaciones.
  - Ver los agentes asignados, estado y etiquetas (si existieran).
  - Cerrar sesión.
- **Persistencia**:
  - Todos los datos se guardan en archivos JSON (`usuarios.json`, `unidades.json`).
- **Interfaz moderna**:
  - Diseño oscuro, responsivo y ordenado.
  - Paneles divididos para mejor organización.

## Estructura de archivos

- `server.js`: Backend Node.js con Express, gestiona la API y la persistencia de datos.
- `index.html`, `login.html`, `menu.html`: Páginas de acceso y navegación.
- `panel_usuarios.html`: Panel de administración de usuarios/agentes.
- `panel_unidades.html`: Panel de gestión de unidades y anotaciones.
- `panel_agente.html`: Panel de agente para consulta de unidades.
- `usuarios.json`: Almacena los usuarios/agentes.
- `unidades.json`: Almacena las unidades y sus anotaciones.
- `panel_unidades.css`: Estilos para todos los paneles.

## Instalación y uso

1. Instala Node.js.
2. Ejecuta `npm install express body-parser` en la carpeta del proyecto.
3. Inicia el servidor con `node server.js`.
4. Accede a la web en `http://localhost:3000`.

## Roles y permisos

- **Admin**: Puede crear usuarios/agentes y gestionar todo el sistema.
- **Usuario**: Puede gestionar unidades y anotaciones.
- **Agente**: Solo puede consultar las unidades y ver anotaciones.

## Personalización

Puedes modificar los archivos HTML y CSS para adaptar la interfaz a tus necesidades.

---

**Desarrollado para roleplay policial y simulación de control de unidades.**

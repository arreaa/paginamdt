const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
// ...existing code...
// Eliminar unidad
app.delete('/api/unidades/:nombre', (req, res) => {
    const { nombre } = req.params;
    let unidades = [];
    if (fs.existsSync(unidadesFile)) {
        unidades = JSON.parse(fs.readFileSync(unidadesFile));
    }
    const nuevasUnidades = unidades.filter(u => u.nombre !== nombre);
    fs.writeFileSync(unidadesFile, JSON.stringify(nuevasUnidades, null, 2));
    res.json({ mensaje: 'Unidad eliminada' });
});

app.use(bodyParser.json());
app.use(express.static(__dirname));

// Ruta para crear credenciales
// Ruta para crear credenciales (admin)
app.post('/api/crear-usuario', (req, res) => {
    const { placa, contrasena, rol, nombre, rango } = req.body;
    if (!placa || !contrasena || !rol || !nombre || !rango) {
        return res.status(400).json({ mensaje: 'Faltan datos' });
    }
    const filePath = path.join(__dirname, 'usuarios.json');
    let usuarios = [];
    if (fs.existsSync(filePath)) {
        usuarios = JSON.parse(fs.readFileSync(filePath));
    }
    if (usuarios.find(u => u.placa === placa)) {
        return res.status(409).json({ mensaje: 'El usuario ya existe' });
    }
    usuarios.push({ placa, contrasena, rol, nombre, rango });
    fs.writeFileSync(filePath, JSON.stringify(usuarios, null, 2));
    res.json({ mensaje: 'Usuario creado correctamente' });
});

// Ruta de login
app.post('/api/login', (req, res) => {
    const { placa, contrasena } = req.body;
    const filePath = path.join(__dirname, 'usuarios.json');
    let usuarios = [];
    if (fs.existsSync(filePath)) {
        usuarios = JSON.parse(fs.readFileSync(filePath));
    }
    const usuario = usuarios.find(u => u.placa === placa && u.contrasena === contrasena);
    if (!usuario) {
        return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
    }
    res.json({ mensaje: 'Login correcto', rol: usuario.rol, placa: usuario.placa });
});

// Ruta para listar usuarios (solo admin)
app.get('/api/usuarios', (req, res) => {
    const filePath = path.join(__dirname, 'usuarios.json');
    let usuarios = [];
    if (fs.existsSync(filePath)) {
        usuarios = JSON.parse(fs.readFileSync(filePath));
    }
    res.json(usuarios);
});

// Gestión de unidades
const unidadesFile = path.join(__dirname, 'unidades.json');

app.get('/api/unidades', (req, res) => {
    let unidades = [];
    if (fs.existsSync(unidadesFile)) {
        unidades = JSON.parse(fs.readFileSync(unidadesFile));
    }
    res.json(unidades);
});

app.post('/api/unidades', (req, res) => {
    const { nombre, estado, agentes, nota } = req.body;
    if (!nombre || !estado) {
        return res.status(400).json({ mensaje: 'Faltan datos' });
    }
    let unidades = [];
    if (fs.existsSync(unidadesFile)) {
        unidades = JSON.parse(fs.readFileSync(unidadesFile));
    }
    unidades.push({ nombre, estado, agentes: agentes || [], nota: nota || '' });
    fs.writeFileSync(unidadesFile, JSON.stringify(unidades, null, 2));
    res.json({ mensaje: 'Unidad agregada' });
});

app.put('/api/unidades/:nombre', (req, res) => {
    const { nombre } = req.params;
    const { estado, nota } = req.body;
    let unidades = [];
    if (fs.existsSync(unidadesFile)) {
        unidades = JSON.parse(fs.readFileSync(unidadesFile));
    }
    const unidad = unidades.find(u => u.nombre === nombre);
    if (!unidad) {
        return res.status(404).json({ mensaje: 'Unidad no encontrada' });
    }
    if (estado !== undefined) unidad.estado = estado;
    if (nota !== undefined) unidad.nota = nota;
    fs.writeFileSync(unidadesFile, JSON.stringify(unidades, null, 2));
    res.json({ mensaje: 'Unidad actualizada' });
});

app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
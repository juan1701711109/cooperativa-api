const express = require('express');
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

const routerRoles = express.Router();

const mysql = require('mysql');
const datos = require('../config/conexion_db');
const conexion = mysql.createConnection(datos);

//GET ALL WITH FILTERS
routerRoles.get('/', async (req, res) => {
	roles = [];
	await conexion.query('SELECT * FROM roles', (err, results, fields) => {
		if(err) {
			throw err;
		}

		roles = results;

		if(roles.length !== 0)
				return res.send(results);
		else 
				return res.status(404).send(`No se encontraron roles`);
		});
})

//GET BY ID
routerRoles.get('/:id', async (req, res) => {
	const id = req.params.id;
	roles = [];
	await conexion.query(`SELECT * FROM roles WHERE id = ${id}`, (err, results, fields) => {
		if(err) {
			throw err;
		}

		roles = results;

		if(roles.length !== 0)
			return res.send(roles);
		else 
			return res.status(404).send(`No se encontró un rol con el id ${id}`);
	});
})

//POST
routerRoles.post('/', jsonParser, async (req, res) => {
	let nuevoRol = req.body;

	console.log(nuevoRol.nombre);

	if(nuevoRol.nombre !== "") {
		await conexion.query(`INSERT INTO roles (nombre) VALUES ('${nuevoRol.nombre}')`, (err, results, fields) => {
			if(err) {
					throw err;
				}

			return res.status(204).send("Ingresado Exitosamente");	
		});
	} else {
			return res.status(404).send(`Datos enviados no válidos`);
	}
})

routerRoles.put('/:id', jsonParser, async (req, res) => {
    let id = req.params.id;
    let nuevoRol = req.body;

		await conexion.query(`UPDATE roles SET nombre = '${nuevoRol.nombre}' WHERE id = '${id}'`, (err, results, fields) => {
			if(err) {
					throw err;
				}

				if(nuevoRol.nombre !== "") {
					return res.status(204).send("Editado Exitosamente");	
				} else {
						return res.status(404).send(`Datos enviados no válidos`);
				} 
		}); 
})

routerRoles.delete('/:id' , async (req, res) => {
    let id = req.params.id;

		await conexion.query(`DELETE FROM roles WHERE id = ${id}`, (err, results, fields) => {
			if(err) {
					throw err;
				}
			
			return res.status(200).send(`Eliminado el curso con el indice ${id}`);
		}); 
    
})

module.exports = routerRoles;
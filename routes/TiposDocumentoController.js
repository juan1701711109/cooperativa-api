const express = require('express');
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

const routerTiposDocumento = express.Router();

const mysql = require('mysql');
const datos = require('../config/conexion_db');
const conexion = mysql.createConnection(datos);

//GET ALL WITH FILTERS
routerTiposDocumento.get('/', async (req, res) => {
	await conexion.query('SELECT * FROM tipos_documento', (err, results, fields) => {
		if(err) {
			throw err;
		}

		if(results.length !== 0)
				return res.send(results);
		else 
				return res.status(404).send(`No se encontraron tipos de documento`);
		});
});

routerTiposDocumento.get('/:id', async (req, res) => {
	const id = req.params.id;
	await conexion.query(`SELECT * FROM tipos_documento WHERE id = ${id}`, (err, results, fields) => {
		if(err) {
			throw err;
		}

		if(results.length !== 0)
			return res.send(results);
		else 
			return res.status(404).send(`No se encontró un tipo de documento con el id ${id}`);
	});
});

module.exports = routerTiposDocumento;

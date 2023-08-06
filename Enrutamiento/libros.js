const express = require('express');
const biblioteca = express.Router();
const libros = require('../cargaDatos');
const Joi = require('joi');
const libroSchema = Joi.object({
    titulo: Joi.string().required().label('Título'),
    autor: Joi.string().required().label('Autor')
    });


    biblioteca.get('/', (req, res, next) => {
    try {
    res.json(libros);
    } catch (err) {
    next(err);
    }
    });


    biblioteca.get('/:id', (req, res, next) => {
    try {
    const id = req.params.id;
    const libro = libros.find((l) => l.id === id);
    if (!libro) {
    const error = new Error('Este libro no se encuentra en la biblioteca');
    error.status = 404;
    throw error;
    }
    res.json(libro);
    } catch (err) {
    next(err);
    }
    });


    biblioteca.post('/', (req, res, next) => {
    try {
    const { error, value } = libroSchema.validate(req.body);
    if (error) {
    const validationError = new Error('Error de validación');
    validationError.status = 400;
    validationError.details = error.details.map(detail =>
    detail.message);
    throw validationError;
    }
    const { titulo, autor } = value;
    const nuevoLibro = {
    id: libros.length + 1,
    titulo,
    autor
    };
    libros.push(nuevoLibro);
    res.status(201).json(nuevoLibro);
    } catch (err) {
    next(err);
    }
    });


    biblioteca.put('/:id', (req, res, next) => {
    try {
    const id = req.params.id;
    const { error, value } = libroSchema.validate(req.body);
    if (error) {
    const validationError = new Error('No se ha validado');
    validationError.status = 400;
    validationError.details = error.details.map(detail =>
    detail.message);
    throw validationError;
    }
    const { titulo, autor } = value;
    const libro = libros.find((l) => l.id === id);
    if (!libro) {
    const error = new Error('no se encontro el libro');
    error.status = 404;
    throw error;
    }
    libro.titulo = titulo || libro.titulo;
    libro.autor = autor || libro.autor;
    res.json(libro);
    } catch (err) {
    next(err);
    }
    });


    biblioteca.delete('/:id', (req, res, next) => {
    try {
    const id = req.params.id;
    const index = libros.findIndex((l) => l.id === id);
    if (index === -1) {
    const error = new Error('Este libro no se encuentra en la biblioteca');
    error.status = 404;
    throw error;
    }
    const borrado = libros.splice(index, 1);
    res.json(borrado[0]);
    } catch (err) {
    next(err);
    }
    });
    module.exports = biblioteca;
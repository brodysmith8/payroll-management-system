const express = require('express');
const router = express.Router();

const app = require('../app.js'); 
const pool = app.get('pool');

// FIRST
router.put('/:employee_id', (req, res) => {

});

// SECOND
router.post('/', (req, res) => {

});

// THIRD 
router.get('/highest-paid', (req, res) => {

});
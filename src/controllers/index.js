const express = require('express');
const db = require('../models/mongoSchema');

/* GET home page. */
exports.index_get = function(req, res) {
    res.render('pages/index', {
        title: 'myDropBox'
    });
};
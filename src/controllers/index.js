const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const dbCon = require('../models/mongoSchema');

let gfs;

/* GET home page. */
exports.index_get = function(req, res) {
    res.render('pages/index', {
        title: 'myDropBox'
    });
};

// post file into db
exports.index_post = function(req, res) {
    dbCon.once('open', function() {
        gfs = Grid(dbCon.db, mongoose.mongo);
        let part = req.files.file;
        console.log(part);
        let writeStream = gfs.createWriteStream({
            filename: 'img_' + part.name,
            mode: 'w',
            content_type: part.mimetype
        });

        writeStream.on('close', (file) => {
            // checking for file
            if (!file) {
                res.status(400).send('No file received');
            }
            return res.status(200).send({
                message: 'Success',
                file: file
            });
        });
        // using callbacks is important !
        // writeStream should end the operation once all data is written to the DB 
        writeStream.write(part.data, () => {
            writeStream.end();
        });
    })
};
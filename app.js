const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
require('dotenv/config');

app.use(bodyParser.json());
app.use(cors());

mongoose.connect(process.env.DB_CONNECTION).then(() => {
    console.log("connected");
})


app.post('/uploadfile', async (req, res) => {
    // 'profile_pic' is the name of our file input field in the HTML form
    let upload = multer({ storage: storage }).single('file');

    upload(req, res, function (err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }

        else if (!req.file) {
            return res.status(400).end('Please select an image to upload');
        }

        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }

        else if (err) {
            return res.send(err);
        }

        // Display uploaded image for user validation
        res.send({ filename: req.file.filename });
    });
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, path.parse(file.originalname).name + '-' + Date.now() + path.extname(file.originalname));
    }
});

const usersRoute = require('./routes/users');
app.use('/users', usersRoute);

const adminsRoute = require('./routes/admins');
app.use('/admins', adminsRoute);

const authRoute = require('./routes/auth');
app.use('/auth', authRoute);

const orderRoute = require('./routes/orders');
app.use('/order', orderRoute);

const drawingRoute = require('./routes/drawings');
app.use('/drawing', drawingRoute);

app.listen(3000);
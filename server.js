const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect("mongodb+srv://aakash-admin:web220@cluster0.pposl.mongodb.net/testDB");

app.set('view engine', 'ejs');
const Rschema = {
    name: String,
    dob: String,
    mob: {
        type: Number,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    }
}

const details = mongoose.model("Details", Rschema);

app.post("/login-confirm", function (req, res) {
    var us = req.body.name;
    var p = req.body.password
    console.log(us);
    details.findOne({ username: us, password: p }, function (err, users) {
        console.log(users);
        res.render("details", {
            name: users.name,
            username: users.username,
            email: users.email,
            mobile: users.mob,
            dob: users.dob,
        });
    });
});

app.get("/login", function (req, res) {
    res.sendFile(__dirname + "/login.html")
    var us = req.body.username;
    console.log(us);
    details.findOne({ username: us }, function (err, users) {
        console.log(users);
        // if (username == users[username]) {
        //     console.log("fetched");
        //     console.log(users[username]);
        // }
        // else {
        //     console.log("?????");
        // }
        // res.sendFile(__dirname + '/login.html', {
        //     userList: users

        // });
    })

});

app.get("/register", function (req, res) {
    res.sendFile(__dirname + "/registration.html");
});

app.get("/admin", function (req, res) {
    details.find({}, function (err, users) {
        res.render('home', {
            userList: users
        })
        console.log(users);
    });
});




app.post("/register", function (req, res) {
    console.log(req.body);
    let newDetails = details({
        name: req.body.name,
        username: req.body.username,
        dob: req.body.dob,
        mob: req.body.mobile,
        email: req.body.email,
        password: req.body.password

    });

    newDetails.save();
    res.sendFile(__dirname + "/login.html");
});



app.listen(3000, function () {
    console.log("Server started at localhost:3000")
});
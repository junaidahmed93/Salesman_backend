var express = require('express');
var Firebase = require('firebase');
var ref = new Firebase("https://junaidapp.firebaseio.com/users");
var dataset_1 = require("../Dataset/dataset");
var abc;
var router = express.Router();
router.post("/signup", function (req, res) {
    ref.createUser({
        email: req.body.data.Email,
        password: req.body.data.Password
    }, function (err, success) {
        if (err) {
            res.send(err);
        }
        else {
            req.body.data.FirebaseToken = success.uid;
            dataset_1.saveUser(req.body.data)
                .then(function (userInstance) {
                res.send({ status: true, user: userInstance });
            }, function (err) {
                res.send({ status: false, message: err });
            });
        }
    });
    //console.log(req.body);
});
router.post('/signupsales', function (req, res) {
    ref.createUser({
        email: req.body.data.Email,
        password: req.body.data.Password
    }, function (err, success) {
        if (err) {
            res.send(err);
        }
        else {
            req.body.data.FirebaseToken = success.uid;
            dataset_1.saveUser(req.body.data)
                .then(function (userInstance) {
                res.send({ status: true, user: userInstance });
            }, function (err) {
                res.send({ status: false, message: err });
            });
        }
    });
});
router.post("/login", function (req, res) {
    var user = req.body.data;
    dataset_1.findUser({ Email: user.email })
        .then(function (userInstance) {
        if (!userInstance) {
            res.send("No user found with supplied email");
            return;
        }
        if (userInstance.Password == user.password) {
            res.send({ message: "Logged In successfully", token: userInstance.FirebaseToken, company: userInstance.Admin });
            abc = userInstance.Admin;
            console.log(abc);
        }
        else {
            res.send("Wrong Password");
        }
    }, function (err) {
        res.send({ status: false, message: err });
    });
});
router.get('/salesman', function (req, res) {
    dataset_1.findAll({ Admin: abc })
        .then(function (userInstance) {
        console.log(userInstance);
        res.send({ userAll: userInstance });
    });
});
module.exports = router;

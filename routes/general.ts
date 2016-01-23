import express = require('express');

import Firebase = require('firebase');
let ref = new Firebase("https://junaidapp.firebaseio.com/users")


import {saveUser,findUser,findAll} from "../Dataset/dataset";
 var abc;

let router = express.Router();

router.post("/signup", (req:express.Request , res:express.Response)=>{
    
    ref.createUser({
        email: req.body.data.Email,
        password:req.body.data.Password
    },function(err,success){
        if(err){
            res.send(err);
            
        } else{
            req.body.data.FirebaseToken = success.uid;
            saveUser(req.body.data)
                .then((userInstance)=>{
                    res.send({status:true, user: userInstance});
                },(err)=>{
                    res.send({status:false, message:err});
                
                })
        }     
    });
    //console.log(req.body);
    
    
});

router.post('/signupsales' , (req:express.Request , res:express.Response)=>{
    ref.createUser({
        email: req.body.data.Email,
        password:req.body.data.Password
    },function(err,success){
        if(err){
            res.send(err);
            
        } else{
            req.body.data.FirebaseToken = success.uid;
            saveUser(req.body.data)
                .then((userInstance)=>{
                    res.send({status:true, user: userInstance});
                },(err)=>{
                    res.send({status:false, message:err});
                
                })
        }     
    });
})

router.post("/login",(req:express.Request,res:express.Response)=>{
    let user = req.body.data;
		findUser({Email : user.email})
			.then((userInstance)=>{
				if(!userInstance)
                {
					res.send("No user found with supplied email");
					return;
				}	
				if(userInstance.Password == user.password)
                {
					res.send({message : "Logged In successfully", token : userInstance.FirebaseToken ,  company : userInstance.Admin});
                     abc = userInstance.Admin;
                    console.log(abc);
				} 
                else 
                {
					res.send("Wrong Password");
				}			
				
			}, (err)=>{
				res.send({status: false, message : err});
			});
});

router.get('/salesman',(req:express.Request , res:express.Response)=>{
    findAll({Admin : abc})
    .then((userInstance)=>{
        console.log(userInstance);
        res.send({userAll:userInstance});
    })
});

module.exports = router;
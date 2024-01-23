const express = require('express');
const path = require('path');
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

//middlewares   
const db = mysql.createConnection( {
    host:'localhost',
    user:'Dani',
    password: '1234',
    port: 3306,
    database: 'crudnodejsmysql'
});

app.post("/create", (req,res)=>{
    const name = req.body.name;
    const address = req.body.address;
    const phone = req.body.phone;
    db.query('INSERT INTO customer(name,address,phone) values(?,?,?)', [name,address,phone],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send("Cliente registrado con éxito");
        }
    }
    );
});

app.get("/customer",(req,res)=>{
    db.query('SELECT * FROM customer',
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});

app.put("/update",(req,res)=>{
    const name = req.body.name;
    const address = req.body.address;
    const phone = req.body.phone;
    const id = req.body.id;
    
    db.query ('UPDATE customer SET name=?, address=?, phone=? WHERE id=?', [name,address,phone,id],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send("Cliente actualizado con éxito");
        }
    }
    );
});

app.delete("/delete/:id",(req,res)=>{
    const id = req.params.id;
    
    db.query ('DELETE FROM customer WHERE id=?', id,
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send("Cliente eliminado con éxito");
        }
    }
    );
});

//staring the server
app.listen(3001 ,() => {
    console.log('Server on port 3001');
}); 
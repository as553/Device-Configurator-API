const client = require('./pg');
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.listen(3300, () => {
    console.log("Server is now listening at port 3300");
})

client.connect();

app.get('/devices', (req,res) => {
    client.query(`Select * from devices`, (err, result) => {
        if(!err){
            res.send(result.rows);
        }
    })
    client.end;
})

// Get by ID
app.get('/devices/:id', (req, res) => {
    client.query(`Select * from devices where id = ${req.params.id}`, (err, result) => {
        if(!err){
            res.send(result.rows);
        }
    })
    client.end;
})

//Post 
app.post('/devices', (req, res)=> {
    const device = req.body;
    let insertQuery = `insert into devices(id, serial, configuration_time, last_communication_date ,status, CONSTRAINT ) 
                        values('${device.id}', '${device.serial}', '${device.configuration_time}', '${device.last_configuration_date}', '${device.status}', '${device.CONSTRAINT}')`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Insertion was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})

// PUT
app.put('/devices/:id', (req, res)=> {
    let device = req.body;
    
    let updateQuery = `update devices
                       set id = '${device.id}',
                       serial = '${device.serial}',
                       configuration_time = '${device.configuration_time}',
                       last_configuration_date = '${device.last_configuration_date}',
                       status = '${device.status}',
                       CONSTRAINT = '${device.CONSTRAINT}'`;
    client.query(updateQuery, (err, result)=>{
        if(!err){
            res.send('Update was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})

//DELETE
app.delete('/devices/:id', (req, res)=> {
    let insertQuery = `delete from devices where id=${req.params.id}`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Deletion was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})
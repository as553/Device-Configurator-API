const {Client} = require('pg')

const client = new Client ({
    host : "localhost",
    user : "postgres",
    port : 5438,
    password : "postgres",
    database : "postgres"
})

module.exports = client;

// client.connect();
// client.query(`Select * from movies`, (err, res) => {
//     if(!err){
//         console.log(res.rows);
//     }else{
//         console.log(err.message);
//     }

//     client.end;
// })
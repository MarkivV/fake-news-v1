let express = require('express');
let cors = require('cors');
let bodyParser = require('body-parser')
let app = express();
let mysql = require('mysql');

let con = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'justnews',
    port: 8889
});

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

app.listen(3001, ()=>{
    console.log("Running on port 3001")
})

app.get('/api/get', (req, res) =>{

    const id = req.query.id
    console.log(id)
    const sqlSelect = "SELECT * FROM justnews WHERE categoryId IN (?)";
    con.query(sqlSelect, id, (err, result)=>{
        res.send(result)
    })

})
app.get('/api/get/item', (req, res) =>{

    const id = req.query.id

    const sqlSelect = `SELECT * FROM justnews WHERE id = ?`;
    con.query(sqlSelect, id,(err, result)=>{
        res.send(result)
    })

})


app.get('/api/get/all', (req, res) =>{

    const sqlSelect = "SELECT * FROM justnews JOIN categories WHERE justnews.categoryId = categories.idCat";
    con.query(sqlSelect, (err, result)=>{
        res.send(result)
    })

})
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
    const sqlSelect = "SELECT * FROM justnews WHERE categoryId IN (?) ORDER BY id DESC";
    con.query(sqlSelect, id, (err, result)=>{
        res.send(result)
    })

})
app.get('/api/get/propose', (req, res) =>{

    const sqlSelect = "SELECT * FROM Propose JOIN categories WHERE Propose.categoryId = categories.idCat ORDER BY id DESC";
    con.query(sqlSelect, (err, result)=>{
        res.send(result)
    })

})


app.get('/api/get/item', (req, res) =>{

    const id = req.query.id

    const sqlSelect = `SELECT * FROM justnews INNER JOIN categories ON categoryId = idCat WHERE id = ? ORDER BY id DESC`;
    con.query(sqlSelect, id,(err, result)=>{
        res.send(result)
        console.log(result)
    })

})


app.get('/api/get/all', (req, res) =>{

    const sqlSelect = "SELECT * FROM justnews JOIN categories WHERE justnews.categoryId = categories.idCat ORDER BY id DESC";
    con.query(sqlSelect, (err, result)=>{
        res.send(result)
    })

})

app.post('/api/post/item', (req, res) =>{

    const author = req.body.author
    const image = req.body.image
    const title = req.body.title
    const text = req.body.text
    const category = req.body.category


    const sqlInsert = "INSERT INTO Propose (name, image, description, author, categoryId) VALUES (?, ?, ?, ?, ?);"
    con.query(sqlInsert, [title, image, text, author, category], (err, result)=>{
        console.log(result)
        res.send(result)
    })
})
app.post('/api/publish/item', (req, res) =>{

    const author = req.body.author
    const image = req.body.image
    const title = req.body.title
    const text = req.body.text
    const categoryId = req.body.categoryId


    const sqlInsert = "INSERT INTO justnews (name, image, description, author, categoryId) VALUES (?, ?, ?, ?, ?);"
    con.query(sqlInsert, [title, image, text, author, categoryId], (err, result)=>{
        console.log(result)
        res.send(result)
    })
})
app.delete('/api/delete', (req, res) =>{

    const id = req.query.id
    const sqlInsert = "DELETE FROM Propose WHERE id = ?"
    con.query(sqlInsert, id)
})


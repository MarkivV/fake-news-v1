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

    const sqlSelect = "SELECT * FROM justnews";
    con.query(sqlSelect, (err, result)=>{
        res.send(result)
    })

})

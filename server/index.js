let express = require('express');
let cors = require('cors');
let bodyParser = require('body-parser')
let app = express();
let mysql = require('mysql');
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const cookieParser = require("cookie-parser")
const {createTokens, validateToken} = require("./JWT")
const port = process.env.PORT || 3001

let con = mysql.createPool({
    host: 'eu-cdbr-west-02.cleardb.net',
    user: 'b5005a6251479d',
    password: '8a1ce7a8',
    database: 'heroku_fd4c78f0a943f8a'
});


app.use(cors({credentials: true, origin: '*'}));
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type,token");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.listen(port, ()=>{
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

app.post('/api/post/item', validateToken, (req, res) =>{

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
app.delete('/api/delete/:id', (req, res) =>{
    const id = req.params.id
    const sqlInsert = "DELETE FROM Propose WHERE id = ?"
    con.query(sqlInsert, id, (err, result)=>{
        if(err) console.log(err)
    })
})


//Auth

app.post("/registration", (req,res) =>{
    const {username, email, password} = req.body
    bcrypt.hash(password, 10).then((hash)=>{
        const sqlInsert = "INSERT INTO users (username, email, password) VALUES (?, ?, ?);"
        con.query(sqlInsert, [username, email, hash], (err, result) =>{
            res.json("User Registered")
        })
    }).catch((err)=>{
        if(err){
            res.status(400).json({error: err})
        }
    })
})


app.post("/login", async (req, res)=>{
    const {username, password} = req.body

    const userFind = "SELECT * FROM users WHERE username = ?"
    con.query(userFind, username, (err, result) =>{
        if(result.length === 0) {
            return res.status(400).json("User doesn't exist")
        }

        const dbPassword = result[0].password

        bcrypt.compare(password, dbPassword).then((match)=>{
            if(!match){
                return res.status(400).json({error: "Wrong username or password"})
            }else{
                const accessToken = createTokens(result[0])

                res.cookie("access-token", accessToken, {
                    maxAge: 60*60*24*30*1000,
                    httpOnly: true,
                    path: '/'
                })
                // window.localStorage.setItem('access_token', accessToken)

                res.send({
                    username: result[0].username
                })
            }
        })
    })
})


app.post("/auth", (req,res)=>{

})

app.post("/profile", validateToken, (req,res) =>{
    res.json("Profile")
})


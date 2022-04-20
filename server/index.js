let express = require('express');
let cors = require('cors');
let bodyParser = require('body-parser')
let app = express();
let mysql = require('mysql');
const bcrypt = require("bcrypt")
const cookieParser = require("cookie-parser")
const {createTokens} = require("./JWT")
const path = require('path')
const uuid = require('uuid')
const multer = require('multer')

const port = process.env.PORT || 3001

// let con = mysql.createPool({
//     host: 'eu-cdbr-west-02.cleardb.net',
//     user: 'b5005a6251479d',
//     password: '8a1ce7a8',
//     database: 'heroku_fd4c78f0a943f8a'
// });

let con = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'justnews',
    port: 8889
});

let temp = 'http://localhost:3000'
// let temp = 'https://purple-omega.vercel.app'

app.use('/images', express.static(path.join(__dirname, 'images')))

app.use(cors({credentials: true, origin: temp}));
app.use(express.json({extended: true}))
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", temp);
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type,token");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Content-Type", "application/json;charset=utf-8");
    res.setHeader('set-cookie', [
        'cookie2=value2; SameSite=None; Secure',
    ]);

    next();
});



///Images upload

// let filename = uuid.v4() + '.jpg';
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'images'),
    filename(rew, file, cb){
        cb(null, uuid.v4()+'.jpg')
    }
})

app.post('/upload/avatar', async (req, res) => {
    try {
        // 'avatar' is the name of our file input field in the HTML form

        let upload = multer({ storage: storage}).single('avatar');
        const id = req.query.id

        upload(req, res, function(err) {
            // req.file contains information of uploaded file
            // req.body contains information of text fields

            if (!req.file) {
                return res.send('Please select an image to upload');
            }
            else if (err instanceof multer.MulterError) {
                return res.send(err);
            }
            else if (err) {
                return res.send(err);
            }

            const imageName = req.file.filename
            const sql = "UPDATE users SET avatar = ? WHERE idUser = ?";
            con.query(sql, [imageName, id], (err, results) => {  if (err) throw err;
                res.json({ success: 1, pathImg: req.file.filename})
            });

        });

    }catch (err) {console.log(err)}
})




app.listen(port, ()=>{
    console.log("Running on port 3001")
})


app.get('/api/get', (req, res) =>{

    const id = req.query.id
    console.log(id)
    const sqlSelect = "SELECT * FROM justnews INNER JOIN users ON authorId = idUser WHERE categoryId IN (?) ORDER BY id DESC";
    con.query(sqlSelect, id, (err, result)=>{
        res.send(result)
    })

})


app.get('/api/get/propose', (req, res) =>{

    const sqlSelect = "SELECT * FROM Propose JOIN categories INNER JOIN users ON authorId = idUser WHERE Propose.categoryId = categories.idCat ORDER BY id DESC";
    con.query(sqlSelect, (err, result)=>{
        res.send(result)
    })

})

app.get('/api/get/profile', (req, res) =>{

    const id = req.query.id

    const sqlSelect = "SELECT * FROM justnews INNER JOIN users ON authorId = idUser WHERE authorId = ? ORDER BY id DESC";
    con.query(sqlSelect, id, (err, result)=>{
        res.send(result)
    })

})
app.get('/api/get/profile/propose', (req, res) =>{

    const id = req.query.id

    const sqlSelect = "SELECT * FROM Propose INNER JOIN users ON authorId = idUser WHERE authorId = ? ORDER BY id DESC";
    con.query(sqlSelect, id, (err, result)=>{
        res.send(result)
    })

})
app.get('/api/get/user/profile', (req, res) =>{

    const id = req.query.id

    const sqlSelect = "SELECT * FROM users WHERE idUser = ?";
    con.query(sqlSelect, id, (err, result)=>{
        res.send(result)
    })

})




app.get('/api/get/item', (req, res) =>{

    const id = req.query.id

    const sqlSelect = `SELECT * FROM justnews INNER JOIN categories ON categoryId = idCat INNER JOIN users ON authorId = idUser WHERE id = ? ORDER BY id DESC`;
    con.query(sqlSelect, id,(err, result)=>{
        res.send(result)
        console.log(result)
    })

})

app.get('/api/get/comments', (req, res) =>{

    const id = req.query.id

    const sqlSelect = `SELECT * FROM comments INNER JOIN users ON authorId = idUser WHERE cardId = ?`;
    con.query(sqlSelect, id,(err, result)=>{
        res.send(result)
        console.log(result)
    })

})


app.post('/api/post/comment', (req, res) =>{

    const authorId = req.body.authorId
    const cardId = req.body.cardId
    const text = req.body.text


    const sqlInsert = "INSERT INTO comments (authorId, cardId, text, likes, dislikes) VALUES (?, ?, ?, ?, ?);"
    con.query(sqlInsert, [authorId, cardId, text, 0, 0], (err, result)=>{
        console.log(result)
        res.send(result)
    })
})



app.get('/api/get/all', (req, res) =>{

    const sqlSelect = "SELECT * FROM justnews JOIN categories WHERE justnews.categoryId = categories.idCat ORDER BY id DESC";
    con.query(sqlSelect, (err, result)=>{
        res.send(result)
    })

})
app.get('/api/get/user', (req, res) =>{

    const idUser = req.query.idUser
    console.log(idUser)

    const sqlSelect = "SELECT * FROM justnews INNER JOIN users ON authorId = idUser WHERE idUser = ?";
    con.query(sqlSelect, idUser,(err, result)=>{
        res.send(result)
        console.log(result)
    })

})

app.get('/api/get/live', (req, res) =>{

    const sqlSelect = "SELECT * FROM LiveNews";
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
    const userId = req.body.userId


    const sqlInsert = "INSERT INTO Propose (name, image, description, author, categoryId, authorId) VALUES (?, ?, ?, ?, ?, ?);"
    con.query(sqlInsert, [title, image, text, author, category, userId], (err, result)=>{
        console.log(result)
        res.send(result)
    })
})
app.post('/api/post/live', (req, res) =>{

    const author = req.body.author
    const title = req.body.title
    const text = req.body.text
    const userId = req.body.userId


    const sqlInsert = "INSERT INTO ProposeLive (name, text, author, authorId) VALUES (?, ?, ?, ?);"
    con.query(sqlInsert, [title, text, author, userId], (err, result)=>{
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
    const authorId = req.body.authorId


    const sqlInsert = "INSERT INTO justnews (name, image, description, author, categoryId, authorId) VALUES (?, ?, ?, ?, ?, ?);"
    con.query(sqlInsert, [title, image, text, author, categoryId, authorId], (err, result)=>{
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
            // return res.status(400).json("User doesn't exist")
            return res.send(true);
        }

        const dbPassword = result[0].password

        bcrypt.compare(password, dbPassword).then((match)=>{
            if(!match){
                // return res.status(405).json({error: "Wrong username or password"})
                return res.send(true);
            }else{
                const accessToken = createTokens(result[0])
                console.log(result[0])

                // res.cookie("access-token", accessToken, {
                //     maxAge: 60*60*24*30*1000,
                //     httpOnly: true,
                //     path: '/',
                // })

                res.send({
                    username: result[0].username,
                    accessToken: accessToken,
                    userId: result[0].idUser,
                    avatar: result[0].avatar
                })
            }
        })
    })
})









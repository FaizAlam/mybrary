if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')
const bookRouter = require('./routes/books')
const methodOveride = require('method-override')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser:true,useUnifiedTopology:true})
const db = mongoose.connection
db.on('error',error=>console.error(error))
db.once('open',()=>console.log("database connected"))



app.set("view engine","ejs")
app.set("views",__dirname+"/views")
app.set('layout','layouts/layout')
app.use(express.static('./public'))
app.use(expressLayouts)
app.use(express.static('public '))
app.use(bodyParser.urlencoded({limit:'10mb',extended:false}))
app.use(methodOveride('_method'))


app.use('/',indexRouter)
app.use('/authors',authorRouter)
app.use('/books',bookRouter)
var server_port = process.env.YOUR_PORT || process.env.PORT || 80;

app.listen(server_port, () =>{
    console.log('Listening on port %d', server_port);
});
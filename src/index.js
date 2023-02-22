const express = require('express')
const mongoose = require('mongoose')
const handlebars = require('express-handlebars')
const router = require('./router')

const app = express()

const port = 8080

mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://LeloPaniales:LeloPañalera@cluster0.yehvjpt.mongodb.net/?retryWrites=true&w=majority', (err)=>{
  if(err) console.log(err)
})

app.use(express.json())

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));

router(app)

app.listen(port, ()=>{
  console.log(`server running at port ${port}`)
})

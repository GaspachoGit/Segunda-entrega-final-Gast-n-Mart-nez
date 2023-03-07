const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')

const handlebars = require('express-handlebars')
const router = require('./router')



const app = express()

const port = 8080

mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://LeloPaniales:LeloPañalera@cluster0.yehvjpt.mongodb.net/?retryWrites=true&w=majority', (err)=>{
  if(err) console.log(err)
})

app.use(express.json())
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({extended:true}))
app.use(session({
  store: MongoStore.create({
    mongoUrl: 'mongodb+srv://LeloPaniales:LeloPañalera@cluster0.yehvjpt.mongodb.net/sessions?retryWrites=true&w=majority',
    mongoOptions: {useNewUrlParser:true, useUnifiedTopology:true},
  }),
  secret:'123456',
  resave:false,
  saveUninitialized: false
}))


app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

router(app)

app.listen(port, ()=>{
  console.log(`server running at port ${port}`)
})

const express = require("express")
const session = require("express-session")
const app = express()
const port = 3000

require("dotenv").config()


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
  }));


const passport = require("passport");
app.use(passport.initialize())
app.use(passport.session())

var authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);

app.listen(port, ()=>{
    console.log(`Activa en el puerto ${port}`)
})
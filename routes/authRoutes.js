const express = require("express");
const passport = require("passport");
require("../auth")

var router = express.Router();

function isLoggedIn(req, res, next){
    req.user ? next() : res.sendStatus(401)
}

router.get("/",(req, res)=>{
    console.log(req.user)
    res.send("Hola");
})

router.get("/protected", isLoggedIn,(req, res)=>{
    res.send("Me puedes ver")
})

router.get("/login",(req, res)=>{
    res.send(`<a href="/auth/google">Log In with OAuth Provider</a>`);
})

router.get("/failure", (req, res)=>{
    res.send("Error al iniciar sesion")
})

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"]}))

router.get("/google/callback", passport.authenticate("google",{
    failureRedirect: "/auth/failure"}), (req, res)=>{
    console.log(req.user)
    console.log(req.isAuthenticated())
    res.redirect("/auth/protected");
})

router.get("/logout",(req, res, next)=>{
    req.logout((err)=>{
        if (err){ return next(err)}
        res.redirect("/");
    });
    //res.send("Sesion cerrada");
})
module.exports = router;
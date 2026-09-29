const express = require("express")
const router = express.Router()
const Client = require("../models/Client")
const isSignedIn = require("../middleware/is-signed-in")


router.get("/new", isSignedIn, (req,res)=>{
   
    try {
    res.render("clients/create-client.ejs")
    } catch (error) {
    console.log(error)
    res.redirect("/")
}
})


router.post("/", isSignedIn, async (req,res)=>{
 try {
await Client.create({
name: req.body.name,
email: req.body.email,
phone: req.body.phone,
company: req.body.company,
owner: req.session.user._id

})
res.redirect("/clients")

} catch (error) {
 console.log(error)
 res.redirect("/clients/new")
 }
})



router.get("/", isSignedIn, async (req,res)=>{
    try {
    const clients = await Client.find({
    owner: req.session.user._id
    })

    res.render("clients/all-clients.ejs", {clients})

    } catch (error) {
    console.log(error)
     res.redirect("/")
    }
})

module.exports = router
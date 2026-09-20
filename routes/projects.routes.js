const express = require("express")
const router = express.Router()
const Project = require("../models/Project")
const Client = require("../models/Client")
const isSignedIn = require("../middleware/is-signed-in")

// to create a new project
router.get("/new", isSignedIn, async (req,res)=>{
    try{
        const clients = await Client.find({
            owner: req.session.user._id
        })

        res.render("projects/create-project.ejs", {clients})

    }catch (error){
        console.log(error)
        res.redirect("/")
    }
})

module.exports = router
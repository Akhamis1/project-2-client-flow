const express = require("express")
const router = express.Router()
const Project = require("../models/Project")
const Client = require("../models/Client")
const isSignedIn = require("../middleware/is-signed-in")

// shows the form to create a new project
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
// create the project to save it in the database
router.post("/",isSignedIn,async (req,res)=>{
    try{
    await Project.create({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    status: req.body.status,
    deadline: req.body.deadline,
    client: req.body.client,
    owner: req.session.user._id
    
    })
    res.redirect("/projects")
    
    } catch (error) {
    console.log(error)
    res.redirect("/projects/new")
    }
})



module.exports = router
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
// show the projects to the user
router.get("/",isSignedIn,async(req,res)=>{
try{
    const projects = await Project.find({
    owner : req.session.user._id,
    isDeleted: false
    })
    res.render("projects/all-projects.ejs",{projects})
}catch(error){
    console.log(error)
    res.redirect("/")
}

})

// show one project
router.get("/:projectId", isSignedIn, async(req,res)=>{
    try{
   const project = await Project.findById(req.params.projectId).populate("client")

if (!project || project.owner.toString() !== req.session.user._id.toString()) {
    return res.redirect("/projects")
    }
    res.render("projects/project-details.ejs", {project})

    }catch(error){
    console.log(error)
     res.redirect("/projects")
    }
})
// shows the form to edit a project
router.get("/:projectId/edit", isSignedIn, async(req,res)=>{
    try{

    const project = await Project.findById(req.params.projectId)

    if (!project || project.owner.toString() !== req.session.user._id.toString()) {
    return res.redirect("/projects")
    }

    const clients = await Client.find({
    owner: req.session.user._id
    })

    res.render("projects/update-project.ejs", {project, clients})

    }catch(error){
    console.log(error)
    res.redirect("/projects")
    }
})
// updates the project in the database
router.put("/:projectId", isSignedIn, async(req,res)=>{
try{

const project = await Project.findById(req.params.projectId)

if (!project || project.owner.toString() !== req.session.user._id.toString()) {
return res.redirect("/projects")
}

await Project.findByIdAndUpdate(req.params.projectId, {
title: req.body.title,
description: req.body.description,
price: req.body.price,
status: req.body.status,
deadline: req.body.deadline,
client: req.body.client
})

res.redirect("/projects/" + req.params.projectId)

}catch(error){
console.log(error)
res.redirect("/projects")
}
})

// soft delete 
router.delete("/:projectId", isSignedIn, async(req,res)=>{
    try{

    const project = await Project.findById(req.params.projectId)

    if (!project || project.owner.toString() !== req.session.user._id.toString()) {
    return res.redirect("/projects")
  }

    await Project.findByIdAndUpdate(req.params.projectId,{
    isDeleted: true
    })

    res.redirect("/projects")

    }catch(error){
    console.log(error)
    res.redirect("/projects")
    }
})


module.exports = router
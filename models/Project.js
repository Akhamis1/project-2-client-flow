const mongoose = require("mongoose")

const projectSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    price:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:["Pending","In Progress","Completed","Cancel"],
        default:"Pending"
    },
    deadline:{
        type:Date
    },
    client:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Client"
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    isDeleted:{
    type:Boolean,
    default:false
    }
},{timestamps:true})

const Project = mongoose.model("Project",projectSchema)

module.exports = Project
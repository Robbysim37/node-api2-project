// implement your posts router here

const dbFunctions = require("./posts-model")
const express = require("express")
const router = express.Router()

router.get("/", (req,res) => {
    dbFunctions.find()
    .then( array => {
        res.status(200).json(array)
    })
    .catch( err => {
        res.status(500).json({ message: "The posts information could not be retrieved" })
    })
})

router.get("/:id", (req,res) => {
    dbFunctions.findById(req.params.id)
    .then( post => {
        if(post){
            res.status(200).json(post)
        }else{
            res.status(404).json({ message: "The post with the specified ID does not exist" })
        }
    })
    .catch(err => {
        res.status(500).json({ message: "The post information could not be retrieved" })
    })
})

router.post("/", (req, res) => {
    if(req.body.title && req.body.contents){
        dbFunctions.insert(req.body)
        .then(post => {
            id = post.id
            res.status(201).json({...req.body,id})
        })
        .catch(err => {
            res.status(500).json({ message: "There was an error while saving the post to the database" })
    })}
    else{
        res.status(400).json({ message: "Please provide title and contents for the post" })
    }
})

router.put("/:id", (req,res) => {
    if(req.body.title && req.body.contents){
        dbFunctions.update(req.params.id,req.body)
        .then(post => {
            dbFunctions.findById(req.params.id)
            .then(postById => {
                if(postById)
                    res.status(200).json(postById)
                else{
                    res.status(404).json({ message: "The post with the specified ID does not exist" })
                }
            })
        })
        .catch(err => {
            res.status(500).json({ message: "The post information could not be modified" })
        })
    }
    else{
        res.status(400).json({ message: "Please provide title and contents for the post" })
    }
})



module.exports = router
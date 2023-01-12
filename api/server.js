// implement your server here
// require your posts router and connect it here

const bodyParser = require("body-parser")
const express = require("express")
const server = express()
const postRoutes = require("./posts/posts-router")

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))

server.use("/api/posts",postRoutes)




module.exports = server
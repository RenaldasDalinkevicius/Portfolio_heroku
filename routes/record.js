import express from "express"
import { getDb } from "../db/conn.js"
import { ObjectId } from "mongodb"
import path from "path"

export const recordRoutes = express.Router()
recordRoutes.route("/record").get(function (req, res) {
  let db_connect = getDb("portfolio")
  db_connect.collection("projects").find({}).toArray(function(err, result) {
      if (err) throw err
      res.json(result)
    })
})
recordRoutes.route("/record/getcomment/:id").get(function (req, res) {
  let db_connect = getDb("portfolio")
  let myquery = { _id: ObjectId( req.params.id )}
  db_connect
      .collection("projects")
      .findOne(myquery, function (err, result) {
        if (err) throw err
        res.json(result)
      })
})
recordRoutes.route("/record/addcomment/:id").post(function (req, response) {
  let db_connect = getDb("portfolio")
  let myquery = { _id: ObjectId(req.params.id )}
  let myobj = {
    _id: new ObjectId(),
    name: req.body.name,
    comment: req.body.comment,
    date: req.body.date
  }
  db_connect.collection("projects").updateOne(
    myquery, {
      $push: {
        comments: myobj
      }
    }
  , function (err, res) {
    if (err) throw err
    response.json(res)
  })
})
recordRoutes.route("/record/add").post(function (req, response) {
  let db_connect = getDb("portfolio")
  let myobj = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    about: req.body.about
  }
  db_connect.collection("form").insertOne(myobj, function (err, res) {
    if (err) throw err
    response.json(res)
  })
})
recordRoutes.route("/update/:id").post(function (req, response) {
    let db_connect = getDb()
    let myquery = { _id: ObjectId( req.params.id )}
    let newvalues = {    
        $set: {      
        firstName: req.body.firstName,     
        lastName: req.body.lastName,
        email: req.body.email,
        about: req.body.about 
        },
    }
})
recordRoutes.route("/record/deleteComment/:id").post((req, response) => {
  let db_connect = getDb()
  let myquery = { _id: ObjectId( req.params.id )}
  let project = { _id: ObjectId( req.body.project)}
  db_connect.collection("projects").updateOne(project,{$pull: {"comments": myquery}
  }, {new: true}, function (err, obj) {
    if (err) throw err
    response.json(obj)
  })
})
const __dirname = path.resolve(path.dirname(""))
recordRoutes.use("*", function(req, res) {
	res.sendFile(path.join(__dirname, "client/dist/index.html"))
}) 
import express from "express"
import { getDb } from "../db/conn.js"
import { ObjectId } from "mongodb"
import path from "path"

export const recordRoutes = express.Router()
const __dirname = path.resolve(path.dirname(""))
recordRoutes.use("*", function(req, res) {
	res.sendFile(path.join(__dirname, "client/dist/index.html"))
})
recordRoutes.route("/record").get(function (req, res) {
  let db_connect = dbo.getDb("portfolio")
  db_connect.collection("form").find({}).toArray(function(err, result) {
      if (err) throw err
      res.json(result)
    })
})
recordRoutes.route("/record/:id").get(function (req, res) {
  let db_connect = getDb()
  let myquery = { _id: ObjectId( req.params.id )}
  db_connect
      .collection("records")
      .findOne(myquery, function (err, result) {
        if (err) throw err
        res.json(result)
      })
})
recordRoutes.route("/record/add").post(function (req, response) {
  let db_connect = getDb()
  let myobj = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    about: req.body.about
  }
  db_connect.collection("records").insertOne(myobj, function (err, res) {
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
recordRoutes.route("/:id").delete((req, response) => {
  let db_connect = getDb()
  let myquery = { _id: ObjectId( req.params.id )}
  db_connect.collection("records").deleteOne(myquery, function (err, obj) {
    if (err) throw err
    console.log("1 document deleted")
    response.json(obj)
  })
})
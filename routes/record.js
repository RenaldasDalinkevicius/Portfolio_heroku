import express from "express"
import { getDb } from "../db/conn.js"
import { ObjectId } from "mongodb"
import path from "path"
import {registrationValidation, loginValidation} from "../validation/validate.js"
import bcryptjs from "bcryptjs"
import { generateToken } from "../utils/generateToken.js"

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
    _id: new ObjectId(),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    about: req.body.about
  }
  db_connect.collection("users").insertOne(myobj, function (err, res) {
    if (err) throw err
    response.json(res)
  })
})
recordRoutes.route("/record/login").post(async (req, response, next) => {
  const {error} = loginValidation(req.body)
  if (error) {
    const err = new Error(error.details[0].message)
    err.status = 400
    next(err)
  }
  const {email, password} = req.body
  let db_connect = getDb("portfolio")
  const user = await db_connect.collection("users").findOne({email})
  async function matchPassword(p) {
    return await bcryptjs.compare(p, user.password)
  }
  if (user && await matchPassword(password)) {
    response.json({
      firstName: user.firstName,
      token: generateToken(user._id)
    })
  } else {
    const err = new Error("Invalid email or password")
    err.status = 401
    next(err)
  }
})
recordRoutes.route("/record/register").post(async (req, response, next) => {
  const {error} = registrationValidation(req.body)
  if (error) {
    const err = new Error(error.details[0].message)
    err.status = 400
    next(err)
  }
  const {firstName, lastName, email, password} = req.body
  /*
  const userExists = User.findOne({email})
  if (userExists===true) {
    const err = new Error("User already exists")
    err.status = 400
    next(err)
  }
  */
  const salt = await bcryptjs.genSalt(10)
  const user = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: await bcryptjs.hash(password, salt)
  }
  let db_connect = await getDb()
  db_connect.collection("users").insertOne(user)
  response.json({message: "New user created"})
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
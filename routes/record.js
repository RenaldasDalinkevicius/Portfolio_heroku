import express from "express"
import { getDb } from "../db/conn.js"
import { ObjectId } from "mongodb"
import path from "path"
import {registrationValidation, loginValidation, newProjectValidation} from "../validation/validate.js"
import bcryptjs from "bcryptjs"
import { generateToken } from "../utils/generateToken.js"
import expressAsyncHandler from "express-async-handler"

export const recordRoutes = express.Router()
recordRoutes.route("/record").get(function (req, res) {
  let db_connect = getDb("portfolio")
  db_connect.collection("projects").find({}).toArray(function(err, result) {
      if (err) throw err
      res.json(result)
    })
})
recordRoutes.route("/record/projects/new").post(expressAsyncHandler(async (req, response, next) => {
  const {error} = newProjectValidation(req.body)
  if (error) {
    const err = new Error(error.details[0].message)
    err.status = 400
    next(err)
  }
  let db_connect = getDb()
  const {title, text, github, live, img, about, aboutOther}= req.body
  const titleExist = await db_connect.collection("projects").findOne({title})
  if (titleExist) {
    const err = new Error("Project with this title already exists")
    err.status = 400
    next(err)
  } else {
    const newPost = await db_connect.collection("projects").insertOne({
      title: title,
      text: text,
      github: github,
      live: live,
      img: img,
      about: about,
      aboutOther: aboutOther,
      comments: []
    })
    response.json({message: "New project created"})
  }
}))
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
    email: req.body.email,
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
recordRoutes.route("/record/add").post(function (req, response) {
  let db_connect = getDb("portfolio")
  let myobj = {
    _id: new ObjectId(),
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
recordRoutes.route("/record/login").post(expressAsyncHandler(async (req, response, next) => {
  const {error} = loginValidation(req.body)
  if (error) {
    const err = new Error(error.details[0].message)
    err.status = 400
    next(err)
  }
  const {email, password} = req.body
  let db_connect = getDb("portfolio")
  const user = await db_connect.collection("users").findOne({email})
  async function matchPassword(a,b) {
    return await bcryptjs.compare(a,b)
  }
  if (user && await matchPassword(password,user.password)) {
    response.json({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: generateToken(user._id),
      isAdmin: user.isAdmin?true:false
    })
  } else {
    const err = new Error("Invalid email or password")
    err.status = 401
    next(err)
  }
}))
recordRoutes.route("/record/register").post(expressAsyncHandler(async (req, response, next) => {
  const {error} = registrationValidation(req.body)
  if (error) {
    const err = new Error(error.details[0].message)
    err.status = 400
    next(err)
  }
  let db_connect = getDb()
  const {firstName, lastName, email, password} = req.body
  const userExists = await db_connect.collection("users").findOne({email})
  if (userExists) {
    const err = new Error("User already exists")
    err.status = 400
    next(err)
  } else {
    const salt = await bcryptjs.genSalt(10)
    const user = await db_connect.collection("users").insertOne({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: await bcryptjs.hash(password, salt)
    })
    response.json({message: "New user created"})
  }
}))
const __dirname = path.resolve(path.dirname(""))
recordRoutes.use("*", function(req, res) {
	res.sendFile(path.join(__dirname, "client/dist/index.html"))
}) 
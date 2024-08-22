import { MongoClient } from "mongodb"
const Db = process.env.ATLAS_URI
const DbName = process.env.DB_NAME
const client = new MongoClient(Db)
let _db
export async function connectToServer(callback) {
  await client.connect(function(err, db) {
    if (db) {
      _db = db.db("portfolio")
      console.log("Successfully connected to MongoDB.")
    }
    return callback(err)
  })
}
export function getDb() {
    return _db
}
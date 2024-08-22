import { MongoClient } from "mongodb"
const Db = process.env.ATLAS_URI
const DbName = process.env.DB_NAME
const client = new MongoClient(Db)
let _db
export async function connectToServer() {
  await client.connect()
  console.log("Connected successfully to server")
  _db = client.db(DbName)
  return "done."
}
export function getDb() {
    return _db
}
import {ApolloServer} from "@apollo/server"
import {startStandaloneServer} from "@apollo/server/standalone"
import {gql} from "graphql-tag"
import {MongoClient} from "mongodb"
import "dotenv/config"

import {readFileSync} from "fs"
import path from "path"

import {resolvers} from "./resolvers"
import MongoApi from "./dataSource/database"

const uri = process.env.MONGO_URI
const typeDefinitions = gql (
    readFileSync(path.resolve(__dirname, "./schema.graphql"), {encoding: "utf-8"})
)

// const client = new MongoClient('mongodb://127.0.0.1:27017/NotesApp')
const client = new MongoClient(uri)
const PORT = (process.env.PORT || '4000', 10)

async function startServer() {
    await client.connect()
    const server = new ApolloServer({typeDefs: typeDefinitions, resolvers: resolvers})
    const {url} = await startStandaloneServer(server, { listen: {port: PORT},
        context: async ()=>{
            const {cache} = server
            return {
                dataSource: {
                    usersDb: new MongoApi({modelOrCollection: client.db().collection('users'), cache: cache}),
                    notesDb: new MongoApi({modelOrCollection: client.db().collection('notes'), cache: cache})
                }
            }
        }
    })

    console.log(`
        🚀🚀Server has started
        🔗🔗Running on ${url}
        `)
}

startServer()
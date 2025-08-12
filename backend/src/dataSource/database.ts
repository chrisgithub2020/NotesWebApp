import { MongoDataSource } from "apollo-datasource-mongodb";
import {CreateNoteInput, CreateUserInput, GetUserInput, UpdateNoteInput} from "../types"
export default class MongoApi extends MongoDataSource<any> {
    createUser (userData: CreateUserInput) {
        this.collection.insertOne(userData)        
    }

    createNote (noteData: CreateNoteInput) {
        this.collection.insertOne(noteData)
    }

    updateNote (noteUpdate: UpdateNoteInput) {
        this.collection.updateOne({id: noteUpdate.id}, {$set:noteUpdate})
    }

    getUser (input: GetUserInput) {
        return this.collection.findOne({email: input.email})
    }

    getNote (id: string) {
        return this.collection.find({author: id}).toArray()
    }
}
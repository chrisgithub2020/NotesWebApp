import axios from "axios"
import { useState } from "react";
import {AddNoteQuery} from "../utils/queries"
import { useParams, useSearchParams } from "react-router";

export default function EditNote() {
    const [title, setTitle] = useState<string>()
    const [note, setNote] = useState<string>()

    const {id} = useParams()         


    const saveNote = async()=>{
        if (id === undefined) {
            const response = await axios.post("http://localhost:4000/graphql", {query: AddNoteQuery, variables: {input:{
                id: crypto.randomUUID().toString(),
                note: note, 
                title: title, 
                author: "look"
            }}})
        } else {
            const response = await axios.post("http://localhost:4000/graphql", {query: AddNoteQuery, variables: {input:{
                id: id,
                note: note, 
                title: title, 
                author: "look"
            }}})
        }
    }


  return (
    <div className="">
      <div className="user-details mx-1">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control mx-1"
            placeholder="Title"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            onChange={(event)=>{
                setTitle(event.target.value)
            }}
          />
          <div className="input-group-append">
            <button onClick={()=>{
                saveNote()
            }} className="btn btn-outline-secondary mx-1" type="button">
              Save
            </button>
          </div>
        </div>
      </div>
      <div className="px-2" style={{ height: "90vh" }}>
        <textarea onChange={(event)=>{
            setNote(event.target.value)
        }}
          style={{ height: "100%", width: "100%" , backgroundColor: "white", color: "black"}}
          placeholder="Your notes"
        />
      </div>
    </div>
  );
}

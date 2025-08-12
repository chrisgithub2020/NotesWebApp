import axios from "axios"
import { useState } from "react";
import {AddNoteQuery, UpdateNotesQuery, GRAPHQL_URL} from "../utils/queries"
import { useParams } from "react-router";
import { UseContext } from "../utils/Context";

export default function EditNote() {
    const [title, setTitle] = useState<string>()
    const [note, setNote] = useState<string>()

    const {userDetail} = UseContext()

    const {id} = useParams()         


    const saveNote = async()=>{
        if (id === undefined) {
            const response = await axios.post(GRAPHQL_URL, {query: AddNoteQuery, variables: {input:{
                id: crypto.randomUUID().toString(),
                note: note, 
                title: title, 
                author: userDetail.current.id
            }}})
            if (response.data.data.createNote.success){
              alert("Note was saved")
            } else {
              alert("There was a problem try again")
            }
        } else {
            const response = await axios.post(GRAPHQL_URL, {query: UpdateNotesQuery, variables: {input:{
                id: id,
                note: note, 
                title: title, 
                author: userDetail.current.id
            }}})
            if (response.data.data.updateNote.success){
              alert("Note was Updated")
            } else {
              alert("There was a problem try again")
            }
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

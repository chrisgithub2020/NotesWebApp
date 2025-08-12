import axios from "axios";
import { useEffect, useState } from "react";
import { UseContext } from "../utils/Context";
import Note from "./Note";
import type { Note as NoteType } from "../utils/Context";
import { GetNotesQuery } from "../utils/queries";
import { useNavigate } from "react-router";

export default function Home() {
  const { userDetail } = UseContext();
  const navigate = useNavigate()
  const [notes, setNote] = useState<NoteType[]>();

  const fetchNotes = async () => {
    const response = await axios.post("http://localhost:4000/graphql", {
      query: GetNotesQuery,
      variables: { getNoteId: userDetail.current.id },
    });
    setNote(response.data.data.getNote);
  };
  const dummy = () => {
    fetchNotes();
  };

  useEffect(() => {
    if (userDetail.current.id === ""){
        navigate("login")
    }
    dummy();
  }, []);

  return (
    <div>
      <div className="user-details p-2 d-flex justify-content-between">
        <div className="p-2">{userDetail.current.name.toUpperCase()}</div>
        <button onClick={()=>{
            navigate("editNote")
            }} className="btn btn-outline-secondary mx-1" type="button">
              Add Note
        </button>
      </div>
      <div className="p-3" style={{ height: "90vh", backgroundColor: "grey" }}>
        {notes?.map((val: NoteType) => {
          return <Note id={val.id} key={val.id} title={val.title} />;
        })}
      </div>
    </div>
  );
}

import { useNavigate } from "react-router";

export default function Note({title, id}:{title: string, id: string}) {
    const navigate = useNavigate()
  return (
    <div className="card m-2" onClick={()=>{
        navigate(`editNote/${id}`)
    }}>
      <div className="card-body">Title: {title}</div>
    </div>
  );
}

import {Routes, Route} from "react-router"
import HomePage from './pages/Homepage'
import EditNote from "./components/Editnote";
import 'bootstrap/dist/css/bootstrap.css'; // For styles
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // For interactivity
import { type UserDetails, type Note, HomeContext } from "./utils/Context";
import { useRef } from "react";
import SignUpPage from "./pages/Auth/SignUp";
import LogInPage from "./pages/Auth/LogIn";

function App() {
  const userDetails = useRef<UserDetails>({name: "", email: "", id:""})
  const notes = useRef<Array<Note>>([])

  return (
    <HomeContext.Provider value={{userDetail: userDetails, notes: notes}}>
      <div className="container-flush">
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/editNote/:id' element={<EditNote/>} />
          <Route path='/editNote' element={<EditNote/>} />
          <Route path='/register' element={<SignUpPage/>} />
          <Route path='/login' element={<LogInPage/>} />
        </Routes>
      </div>
    </HomeContext.Provider>
  )
}

export default App

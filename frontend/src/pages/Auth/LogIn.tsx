import { useState } from "react";
import { useNavigate } from "react-router";
import { LogInQuery ,GRAPHQL_URL} from "../../utils/queries";
import md5 from "md5";
import axios from "axios";
import { UseContext } from "../../utils/Context";

export default function LogInPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const {userDetail} = UseContext()

  const submit = async () => {
    if (!email || !password) {
      alert("Fill the form");
      return;
    }
    const response = await axios.post(GRAPHQL_URL, {
      query: LogInQuery,
      variables: {
        input: {
          email: email,
          password: md5(password.trimStart().toString()!),
        },
      },
    });
    if (!response.data.data.getUser) {
        alert("Incorrect Details")
    } else {
        userDetail.current = response.data.data.getUser
        navigate("/")
    }

  };
  return (
    <div className="container">
      <div className="card mx-auto" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">LogIn</h5>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-default">
                Email
              </span>
            </div>
            <input
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              type="text"
              className="form-control"
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-default">
                Password
              </span>
            </div>
            <input
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              type="text"
              className="form-control"
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
            />
          </div>
          <div className="d-flex flex-column">
            <a onClick={submit} href="#" className="btn">
              Submit
            </a>
            <p className="mx-auto">
              No Accout?
              <a
                onClick={() => {
                  navigate("../register");
                }}
                href="#"
                className="card-link p-1"
              >
                Register
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router";
import { SignUpQuery,GRAPHQL_URL } from "../../utils/queries";
import axios from "axios";
import md5 from "md5";
import { UseContext } from "../../utils/Context";

export default function SignUpPage() {
  const navigate = useNavigate();
  const {userDetail} = UseContext()
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const submit = async () => {
    if (!name || !email || !password) {
        return
    }
    password.trimStart()
    const response = await axios.post(GRAPHQL_URL, {
      query: SignUpQuery,
      variables: {
        input: {
          name: name,
          email: email,
          password: md5(password.trimStart().toString()!),
          id: crypto.randomUUID().toString(),
        },
      },
    });
    if (response.data.data.createUser.success){
        userDetail.current = response.data.data.createUser.user
        navigate("/")
    } else {
        alert(response.data.data.createUser.message)
    }
  };
  return (
    <div className="container">
      <div className="card mx-auto" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">SignUp</h5>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-default">
                Name
              </span>
            </div>
            <input
              onChange={(event) => {
                setName(event.target.value);
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
              Have an Accout?
              <a
                onClick={() => {
                  navigate("../login");
                }}
                href="#"
                className="card-link p-1"
              >
                Log In
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

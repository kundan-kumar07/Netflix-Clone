import React, { useState } from "react";
import "./Login.css";
import Logo from "../../assets/logo.png";
import { login, signup } from "../../firebase";
import { toast } from "react-toastify";

const Login = () => {
  const [signInState, setSignState] = useState("Sign In");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user_auth = async (event) => {
    event.preventDefault();
    if (signInState == "Sign In") {
      await login(email, password);
      
    } else {
      await signup(name, email, password);
      
    }
  };

  return (
    <div className="login">
      <img src={Logo} alt="" className="login-logo" />
      <div className="login-form">
        <h1>{signInState}</h1>
        <form>
          {signInState === "Sign Up" ? (
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          ) : (
            <></>
          )}

          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            type="email"
            name=""
            id=""
            placeholder="Email "
          />
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            type="password"
            name=""
            id=""
            placeholder="Password"
          />
          <button onClick={user_auth}  type="submit">
            {signInState}
          </button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" name="" id="" />
              <label htmlFor="">Remember me</label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>
        <div className="form-switch">
          {signInState === "Sign In" ? (
            <p>
              New to Netflix?
              <span
                onClick={() => {
                  setSignState("Sign Up");
                }}
              >
                Sign Up Now
              </span>
            </p>
          ) : (
            <p>
              Already have account?
              <span
                onClick={() => {
                  setSignState("Sign In");
                }}
              >
                Sign In Now
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;

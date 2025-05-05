import { useState } from "react";

export default function Login() {
  const [loginSelected, setLoginSelected] = useState(true);
  
    return (
      <div id="login-page">
        <div id="login-tabs" style={{ display: "flex" }}>
          <button
            disabled={loginSelected}
            onClick={() => setLoginSelected(!loginSelected)}
            style={{ flexGrow: 1, textAlign: "center" }}
          >
            Login
          </button>
          <button
            disabled={!loginSelected}
            onClick={() => setLoginSelected(!loginSelected)}
            style={{ flexGrow: 1, textAlign: "center" }}
          >
            Register
          </button>
        </div>
        {loginSelected ? (
          <form id="login">
            <label>
              Username: <br />
              <input />
            </label>
            <br />
            <label>
              Password: <br />
              <input />
            </label>
            <br />
            <br />
            <button>Login</button>
          </form>
        ) : (
          <form id="register">
            <label>
              Username: <br />
              <input />
            </label>
            <br />
            <label>
              Password: <br />
              <input />
            </label>
            <br />
            <br />
            <button>Login</button>
          </form>
        )}
      </div>
    );
}

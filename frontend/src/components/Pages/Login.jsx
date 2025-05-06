import { useEffect, useState } from "react";

export default function Login() {

  const [loginSelected, setLoginSelected] = useState(true);
  // useEffect(() => {loginSelected ? document.body.style.backgroundColor = "var(--login-background)" : document.body.style.backgroundColor = "var(--registration-background)"}, [loginSelected]);
  const submitLogin = async (e) => {
    e.preventDefault();
    let res = await fetch('/api/auth/login', {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        username: e.target.form[0].value,
        password: e.target.form[1].value
      })
    });
    res = await res.json()
    if (res.success)
      {}else{}

  }

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
              <input type="text" style={{ outlineColor: "#2874a6" }} />
            </label>
            <br />
            <label>
              Password: <br />
              <input type="password" style={{ outlineColor: "#2874a6" }} />
            </label>
            <br />
            <br />
            <button onClick={(e) => submitLogin(e)}>Login</button>
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

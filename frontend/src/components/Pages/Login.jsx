import { useEffect, useState } from "react";

export default function Login() {
  const [loginSelected, setLoginSelected] = useState(true);
  // useEffect(() => {loginSelected ? document.body.style.backgroundColor = "var(--login-background)" : document.body.style.backgroundColor = "var(--registration-background)"}, [loginSelected]);
  const submitLogin = async (e) => {
    e.preventDefault();
    let res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: e.target.form[0].value,
        password: e.target.form[1].value,
      }),
    });
    res = await res.json();
    e.target.form[0].value = "";
    e.target.form[1].value = "";
    if (res.success) {
      // go to chat
    } else {
    }
  };

  const submitRegistration = (e) => {
    e.preventDefault()
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
            <input type="text" />
          </label>
          <br />
          <label>
            Password: <br />
            <input type="password" />
          </label>
          <br />
          <br />
          <button className="login-button" onClick={(e) => submitLogin(e)}>Login</button>
        </form>
      ) : (
        <form id="register">
          <label>
            Email: <br />
            <input type="email" />
          </label>
          <br />
          <label>
            First Name: <br />
            <input />
          </label>
          <br />
          <label>
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "end" , margin: 0}}><span>Username: </span><span style={{fontSize: "0.6rem"}}>used for logging in only</span></div>
            <input />
          </label>
          <br />
          <label>
            Password: <br />
            <input type="password" />
          </label>
          <br />
          <button className="login-button" onClick={(e) => {submitRegistration(e)}}>Register</button>
        </form>
      )}
    </div>
  );
}

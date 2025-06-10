import { useEffect, useState } from "react";

export default function Login (
  {setLogState}
) {
  const [loginSelected, setLoginSelected] = useState(true);
  const submitLogin = async (e) => {
    e.preventDefault();
    setLogState({loading: true, loggedIn: false})
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
      setLogState({loading: false, loggedIn: "pending socket"})
    } else {
      setLogState({ loading: false, loggedIn: false });
    }
  };

  useEffect(() => setLogState({loading: false, loggedIn: false}), [])

  const submitRegistration = async (e) => {
    e.preventDefault();
    setLogState({loading: true, loggedIn: false});
    let res = await fetch("/api/auth/signup", {
      method: "POST",
      body: new FormData(e.target.form)
    })
    res = await res.json();
    if (res._id) {
      setLogState({loading: false, loggedIn: "pending socket"})
    } else {
      //error popup
      console.error("Sign up error");
      setLogState({loading: false, loggedIn: false});
    }
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
            <input name="email" type="email" />
          </label>
          <br />
          <label>
            First Name: <br />
            <input name="firstName" />
          </label>
          <br />
          <label>
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "end" , margin: 0}}><span>Username: </span><span style={{fontSize: "0.6rem"}}>used for logging in only</span></div>
            <input name="username" />
          </label>
          <br />
          <label>
            Password: <br />
            <input name="password" type="password" />
          </label> <br />
          <label>
            Profile Photo: <br />
            <input name="profile-photo" type="file" />
          </label>
          <br />
          <button className="login-button" onClick={(e) => {submitRegistration(e)}}>Register</button>
        </form>
      )}
    </div>
  );
}

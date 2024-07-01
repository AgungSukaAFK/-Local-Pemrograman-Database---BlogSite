import React from "react";
import Loading from "@/ui/loading/loading";
import { useRouter } from "next/navigation";
import API_URL from "@/lib/Api";
import { useState } from "react";
import { signIn } from "next-auth/react";
import swal from "sweetalert";
import "./signupAdmin.css";

function SignupAdmin() {
  const [userId, setUserId] = useState();
  const [password, setPassword] = useState();
  const [username, setUsername] = useState();
  const [role, setRole] = useState("WRITER");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const api = API_URL;
  async function signupHandler() {
    setLoading(true);
    let data = {
      redirect: false,
      email: userId,
      password,
      callbackUrl: "/dashboard",
    };
    try {
      /*
          1. Login dulu
          2. Kalau login berhasil baru signIn bikin session
          3. Kembalikan informsi error lewat alert
        */

      let signup = await fetch(`${api}/api/auth/register`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          userId,
          username,
          password,
          role,
        }),
      });

      let dataSignup = await signup.json();
      let { create, message } = dataSignup;
      if (create == "failed") {
        // throw new Error(message);
        swal("Signup error", message);
      } else {
        swal(`Signup Message`, message, "User created");
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      swal(`Error`, err.message, "error");
    }
  }

  function idChangeHandler(e) {
    setUserId(e.target.value);
  }

  function pwChangeHandler(e) {
    setPassword(e.target.value);
  }

  function usernameChangeHandler(e) {
    setUsername(e.target.value);
  }

  function backHandler() {
    router.back();
  }

  function roleChangeHandler() {
    const select = document.getElementById("roleInput");
    const selectedValue = select.options[select.selectedIndex].value;
    setRole(selectedValue);
  }

  return (
    <div className="login-container">
      <Loading isLoading={loading} />
      <div className="login__card">
        <div className="login__title">Register</div>
        <div className="login__input-wrapper">
          <div className="login__input-group">
            <label htmlFor="userId">User ID</label>
            <input
              name="userId"
              type="text"
              placeholder="UserId"
              onChange={idChangeHandler}
            />
          </div>
          <div className="login__input-group">
            <label htmlFor="userId">Username</label>
            <input
              name="username"
              type="text"
              placeholder="Username"
              onChange={usernameChangeHandler}
            />
          </div>
          <div className="login__input-group login__combobox">
            <label htmlFor="role">Role</label>
            <select
              name="role"
              id="roleInput"
              className="login__combobox-wrapper"
              onChange={roleChangeHandler}
            >
              <option value="WRITER" selected>
                Writer
              </option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          <div className="login__input-group">
            <label htmlFor="password">Password</label>
            <div className="login__input__password-wrapper">
              <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={pwChangeHandler}
              />
              {/* <span>🔒</span> */}
            </div>
          </div>

          <button
            disabled={!userId || !password || !username || !role}
            className={`login__login-btn ${
              !userId || !password || !username || !role ? "disabled" : ""
            }`}
            onClick={signupHandler}
          >
            Signup
          </button>

          <div>
            <p className="back-button" onClick={backHandler}>
              Kembali
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupAdmin;

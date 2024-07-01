"use client";
import { useState } from "react";
import "./login.css";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Loading from "@/ui/loading/loading";
import swal from "sweetalert";
import API_URL from "@/lib/Api";

function Page() {
  const [userId, setUserId] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const api = API_URL;
  async function loginHandler() {
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

      let login = await fetch(`${api}/api/auth/login`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          userId,
          password,
        }),
      });

      let dataLogin = await login.json();
      let { success, message } = dataLogin;
      if (!success) {
        throw new Error(message);
      }

      let user = await fetch(`http://localhost:3000/api/user?id=${userId}`);

      let dataUser = await user.json();
      let data = dataUser.data;

      let res = await signIn("credentials", {
        redirect: false,
        callbackUrl: "/dashboard",
        userid: userId,
        username: data.username,
        role: data.role,
      });
      if (!res.error) {
        setLoading(false);
        swal(
          "Login berhasil!",
          "Akan diarahkan ke halaman dashboard",
          "success"
        );
        router.push("/dashboard");
      }
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

  function backHandler() {
    router.back();
  }

  return (
    <div className="login-container">
      <Loading isLoading={loading} />
      <div className="login__card">
        <div className="login__title">Login</div>
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
            disabled={!userId || !password}
            className={`login__login-btn ${
              !userId || !password ? "disabled" : ""
            }`}
            onClick={loginHandler}
          >
            Login
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

export default Page;

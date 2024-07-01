"use client";
import { useRouter } from "next/navigation";
import "./dashboard.css";
import swal from "sweetalert";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Loading from "@/ui/loading/loading";
import API_URL from "@/lib/Api";
function Page() {
  const [userId, setUserId] = useState();
  const [username, setUsername] = useState();
  const [role, setRole] = useState();
  const [loading, setLoading] = useState(true);
  const [authStatus, setAuthStatus] = useState();
  const api = API_URL;
  const { data, status } = useSession();
  let router = useRouter();

  useEffect(() => {
    setAuthStatus(status);
    if (status !== "loading") {
      setLoading(false);
    }

    if (status === "authenticated") {
      setUserId(data.user.userid);
      setUsername(data.user.username);
      setRole(data.user.role);
    }
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [router, status, data]);

  function btnMyBlog__onClick() {
    setLoading(true);
    router.push(`/home/filter?from=${userId}`);
  }

  function btnCreatePost__onClick() {
    setLoading(true);
    router.push(`/post/create`);
  }

  function btnEditPost__onClick() {
    setLoading(true);
    router.push(`/post/edit`);
  }

  function btnChangePassword__onClick() {
    swal({
      title: "Ganti password",
      text: "Password lama",
      content: "input",
      button: {
        text: "Cek password",
        closeModal: false,
      },
    })
      .then((name) => {
        if (!name) throw null;

        return fetch(`${api}/api/user/changepass`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            purpose: "check",
            userId: userId,
            oldPassword: name,
          }),
        });
      })
      .then((results) => {
        // console.log(results);
        return results.json();
      })
      .then((json) => {
        let { isValid } = json;
        if (isValid) {
          swal({
            title: "Ganti password",
            text: "Masukkan password baru",
            content: "input",
            button: {
              text: "Ubah password",
              closeModal: false,
            },
          }).then(async (newPass) => {
            try {
              const results = await fetch(`${api}/api/user/changepass`, {
                method: "POST",
                headers: {
                  "content-type": "application/json",
                },
                body: JSON.stringify({
                  purpose: "change",
                  userId: userId,
                  newPassword: newPass,
                }),
              });
              const json = await results.json();
              swal({
                title: "Ganti password berhasil",
                icon: "success",
                button: "Ok",
              });
            } catch (err) {
              return err;
            }
          });
        } else {
          swal({
            title: "Ganti password",
            text: "Password lama salah.",
            button: "Ok",
          });
        }
      })
      .catch((err) => {
        if (err) {
          swal("Oh noes!", "The AJAX request failed!", "error");
        } else {
          swal.stopLoading();
          swal.close();
        }
      });
  }

  function btnRegistWriter__onClick() {
    router.push("/signup");
  }

  return (
    <div className="dashboard-container">
      {loading ? (
        <Loading isLoading={loading} />
      ) : (
        <>
          <h1 className="dashboard__title">Dashboard</h1>
          <div className="dashboard__account">
            <p>User ID : {userId}</p>
            <div>Username : {username}</div>
            <div>User Role : {role}</div>
          </div>
          <button
            className="dashboard__button btn-changePassword"
            onClick={btnChangePassword__onClick}
          >
            Change Password
          </button>
          <button
            className="dashboard__button btn-myBlog"
            onClick={btnMyBlog__onClick}
          >
            My Post(s)
          </button>
          <button
            className="dashboard__button btn-createPost"
            onClick={btnCreatePost__onClick}
          >
            Create New Post
          </button>
          <button
            className="dashboard__button btn-createPost"
            onClick={btnEditPost__onClick}
          >
            Edit My Post
          </button>
          {role == "ADMIN" && (
            <button
              className="dashboard__button btn-createPost"
              onClick={btnRegistWriter__onClick}
            >
              Register New Writer
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default Page;

import React from "react";
import "./post.css";
import Image from "next/image";
import API_URL from "@/lib/Api";

async function Page({ params }) {
  let { postId } = params;
  let title, thumbnail, writerId, createdAt, category, estimate, content;
  const api = API_URL;
  try {
    // AMBIL SEMUA POSTINGAN KHUSUS BERDASARKAN ID
    let response = await fetch(`${api}/api/post/get`, {
      method: "POST",
      body: JSON.stringify({ postId }),
    });
    let result = await response.json();

    if (result.post) {
      ({ title, thumbnail, writerId, createdAt, category, estimate, content } =
        await result.post);

      createdAt = new Date(createdAt);
      const options = { day: "numeric", month: "long", year: "numeric" };
      createdAt = createdAt.toLocaleDateString("id-ID", options);

      async function getWriterUsername(id) {
        let res = await fetch(`${api}/api/user?id=${id}`);

        let response = await res.json();
        let { data } = response;
        return data?.username;
      }

      // Bikin tombol edit post jika userId yang login == writerId

      return (
        <div className="post-container ">
          <h1>{title}</h1>
          <hr />
          <div className="info">
            <p>
              Diperbarui: <span className="date">{createdAt}</span> Oleh:
              <span className="writerUsername">
                {" "}
                {getWriterUsername(writerId)}
              </span>
            </p>
            <p>
              Kategori: <span className="category">{category}</span>
            </p>
            <p>
              Estimasi Waktu: <span className="estimate">{estimate}</span> Menit
            </p>
          </div>
          <div className="thumbnail-container">
            <Image
              className="thumbnail"
              width={1000}
              height={1000}
              src={`/uploads/${thumbnail}`}
              alt={"singa lepas"}
            />
          </div>
          <div className="content-container">
            <div
              className="content"
              dangerouslySetInnerHTML={{ __html: content }}
            ></div>
          </div>
        </div>
      );
    } else {
      return <div className="post-container">Tidak ditemukan</div>;
    }
  } catch (error) {
    console.log(error);
  }
}

export default Page;
export const fetchCache = "default-no-store";

// "use client";
// import React, { useState, useEffect } from "react";
// import "./post.css";
// import Image from "next/image";
// import API_URL from "@/lib/Api";

// function Post({ params }) {
//   const [post, setPost] = useState(null);
//   const api = API_URL;
//   let { postId } = params;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // AMBIL SEMUA POSTINGAN KHUSUS BERDASARKAN ID
//         let response = await fetch(`${api}/api/post/get`, {
//           method: "POST",
//           body: JSON.stringify({ postId }),
//         });
//         let result = await response.json();

//         if (result.post) {
//           setPost(result.post);
//         } else {
//           setPost(null);
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchData();
//   }, [postId, api]);

//   const getWriterUsername = async (id) => {
//     try {
//       let res = await fetch(`${api}/api/user?id=${id}`);
//       let response = await res.json();
//       let { data } = response;
//       return data?.username;
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   if (!post) {
//     return <div className="post-container">Tidak ditemukan</div>;
//   }

//   let { title, thumbnail, writerId, createdAt, category, estimate, content } =
//     post;

//   createdAt = new Date(createdAt);
//   const options = { day: "numeric", month: "long", year: "numeric" };
//   createdAt = createdAt.toLocaleDateString("id-ID", options);

//   return (
//     <div className="post-container ">
//       <h1>{title}</h1>
//       <hr />
//       <div className="info">
//         <p>
//           Diperbarui: <span className="date">{createdAt}</span> Oleh:
//           <span className="writerUsername"> {getWriterUsername(writerId)}</span>
//         </p>
//         <p>
//           Kategori: <span className="category">{category}</span>
//         </p>
//         <p>
//           Estimasi Waktu: <span className="estimate">{estimate}</span> Menit
//         </p>
//       </div>
//       <div className="thumbnail-container">
//         <Image
//           className="thumbnail"
//           width={1000}
//           height={1000}
//           src={`/uploads/${thumbnail}`}
//           alt={"singa lepas"}
//         />
//       </div>
//       <div className="content-container">
//         <div
//           className="content"
//           dangerouslySetInnerHTML={{ __html: content }}
//         ></div>
//       </div>
//     </div>
//   );
// }

// export default Post;
// export const fetchCache = "force-no-store";

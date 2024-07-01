// "use client";
// import "@/app/home/home.css";
// import Card from "@/ui/card-home/card";
// import { useState, useEffect } from "react";
// import Loading from "@/ui/loading/loading";
// import { useRouter, useSearchParams } from "next/navigation";
// import Search from "@/ui/search-box/Search";
// import API_URL from "@/lib/Api";

// function Page() {
//   const [posts, setPosts] = useState();
//   const [loading, setLoading] = useState(true);
//   const param = useSearchParams();
//   const router = useRouter();
//   const api = API_URL;
//   useEffect(() => {
//     const res = async (params) => {
//       let response = await fetch(`${api}/api/post/filter?${params}`);
//       let result = await response.json();
//       if (result) {
//         const sortedPosts = result.post?.sort(
//           (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//         );
//         setPosts(sortedPosts);
//       }
//       setLoading(false);
//     };

//     const search = param.get("search");
//     if (search) {
//       res(`search=${search}`);
//     } else {
//       let writerId = param.get("from");
//       res(`from=${writerId}`);
//     }
//   }, [param, api]);

//   function backbutton__onClick() {
//     router.back();
//   }

//   function searchButton__onClick() {
//     let input = document.getElementById("search-home");
//     let search = input.value;

//     router.push(`/home/filter?search=${search}`);
//   }
//   return (
//     <div className="home__page-container">
//       <button className="back-button" onClick={backbutton__onClick}>
//         kembali
//       </button>
//       <Search />
//       <hr />
//       <div className="home__cards-container">
//         {/* <Card thumbnail={"code.png"} title={"Lorem ipsum dolor sit"} />
//         <Card */}
//         {!loading ? (
//           posts.length ? (
//             posts?.map((post) => {
//               return (
//                 <Card
//                   thumbnail={post.thumbnail}
//                   title={post.title}
//                   postId={post.postId}
//                   key={post.postId}
//                 />
//               );
//             })
//           ) : (
//             <div className="home__cards-information">
//               Penulis ini belum membuat postingan
//             </div>
//           )
//         ) : (
//           <Loading isLoading={loading} />
//         )}
//       </div>
//     </div>
//   );
// }

// export default Page;

"use client";
import "@/app/home/home.css";
import Card from "@/ui/card-home/card";
import { useState, useEffect, Suspense } from "react";
import Loading from "@/ui/loading/loading";
import { useRouter, useSearchParams } from "next/navigation";
import Search from "@/ui/search-box/Search";
import API_URL from "@/lib/Api";

function Posts() {
  const [posts, setPosts] = useState();
  const [loading, setLoading] = useState(true);
  const param = useSearchParams();
  const router = useRouter();
  const api = API_URL;

  useEffect(() => {
    const res = async (params) => {
      let response = await fetch(`${api}/api/post/filter?${params}`);
      let result = await response.json();
      if (result) {
        const sortedPosts = result.post?.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setPosts(sortedPosts);
      }
      setLoading(false);
    };

    const search = param.get("search");
    if (search) {
      res(`search=${search}`);
    } else {
      let writerId = param.get("from");
      res(`from=${writerId}`);
    }
  }, [param, api]);

  return (
    <div className="home__cards-container">
      {!loading ? (
        posts.length ? (
          posts?.map((post) => {
            return (
              <Card
                thumbnail={post.thumbnail}
                title={post.title}
                postId={post.postId}
                key={post.postId}
              />
            );
          })
        ) : (
          <div className="home__cards-information">
            Penulis ini belum membuat postingan
          </div>
        )
      ) : (
        <Loading isLoading={loading} />
      )}
    </div>
  );
}

function Page() {
  const router = useRouter();

  function backbutton__onClick() {
    router.back();
  }

  function searchButton__onClick() {
    let input = document.getElementById("search-home");
    let search = input.value;

    router.push(`/home/filter?search=${search}`);
  }

  return (
    <div className="home__page-container">
      <button className="back-button" onClick={backbutton__onClick}>
        kembali
      </button>
      <Search />
      <hr />
      <Suspense fallback={<Loading isLoading={true} />}>
        <Posts />
      </Suspense>
    </div>
  );
}

export default Page;

"use client";
import "./home.css";
import Card from "@/ui/card-home/card";
import { useState, useEffect } from "react";
import Loading from "@/ui/loading/loading";
import { useRouter } from "next/navigation";
import Search from "@/ui/search-box/Search";
import API_URL from "@/lib/Api";

function Page() {
  const [posts, setPosts] = useState();
  const [loading, setLoading] = useState(true);

  const api = API_URL;

  const router = useRouter();
  useEffect(() => {
    const res = async () => {
      let response = await fetch(`${api}/api/post/get`);
      let result = await response.json();
      const sortedPosts = result?.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setPosts(sortedPosts);
      setLoading(false);
    };
    res();
  }, [api]);

  function searchButton__onClick() {
    let input = document.getElementById("search-home");
    let search = input.value;

    router.push(`/home/filter?search=${search}`);
  }

  return (
    <div className="home__page-container">
      <Search />
      <hr />
      <div className="home__cards-container">
        {/* <Card thumbnail={"code.png"} title={"Lorem ipsum dolor sit"} />
        <Card */}
        {!loading ? (
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
          <Loading isLoading={loading} />
        )}
      </div>
    </div>
  );
}

export default Page;

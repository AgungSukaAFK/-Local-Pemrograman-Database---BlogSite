"use client";
import "./penulis.css";
import { useState, useEffect } from "react";
import Loading from "@/ui/loading/loading";
import { useRouter } from "next/navigation";
import Search from "@/ui/search-box/Search";
import Card from "@/ui/card-category/card";
import API_URL from "@/lib/Api";

function Page() {
  const [cards, setCards] = useState();
  const [loading, setLoading] = useState(true);
  const api = API_URL;
  const router = useRouter();
  useEffect(() => {
    const res = async () => {
      let response = await fetch(`${api}/api/user`);
      let json = await response.json();
      let users = json.data.user;
      let result = users.map((i) => `${i.username} (${i.userId})`);
      const sortedCategories = result.sort((a, b) => a.localeCompare(b));

      setCards(sortedCategories);
      setLoading(false);
    };
    res();
  }, [api]);

  return (
    <div className="kategori__page-container">
      <Search />
      <hr />
      <div className="kategori__cards-container">
        {!loading ? (
          cards?.map((kategori) => {
            return <Card text={kategori} key={Math.random()} />;
          })
        ) : (
          <Loading isLoading={loading} />
        )}
      </div>
    </div>
  );
}

export default Page;

"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";
import Loading from "@/ui/loading/loading";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import swal from "sweetalert";
import API_URL from "@/lib/Api";

const NewPostForm = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [writerId, setWriterId] = useState();
  const [thumbnail, setThumbnail] = useState(null);
  const [estimate, setEstimate] = useState(0);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [authStatus, setAuthStatus] = useState();

  const { data, status } = useSession();
  // console.log(data, status);
  const router = useRouter();
  const api = API_URL;
  useEffect(() => {
    setAuthStatus(status);
    if (status !== "loading") {
      setIsLoading(false);
    }

    if (status === "authenticated") {
      setWriterId(data.user.userid);
      console.log(data.user);
    }
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [router, status, data]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    let arrKategori = category.split(",");
    let Kategori = arrKategori.map((k) => k.trimStart());
    setCategory(`${Kategori}`);

    const formData = new FormData();
    formData.append("file", thumbnail);
    formData.append("title", title);
    formData.append("writerId", writerId);
    formData.append("category", category);
    formData.append("estimate", estimate);
    // markup dulu kontennya
    formData.append("content", convertMarkupToHTML(content));

    function convertMarkupToHTML(text) {
      // Convert **text** to <strong>text</strong>
      text = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
      // Convert __text__ to <em>text</em>
      text = text.replace(/__(.*?)__/g, "<em>$1</em>");
      // Convert newline (\n) to <br>
      text = text.replace(/\n/g, "<br>");

      text = text.replace(
        /#image\((.*?)\)/g,
        `<Image class="thumbnail inside-img" width=1000 height=1000 src="$1" alt="singa lepas"/>`
      );
      return text;
    }

    try {
      const res = await axios.post(`${api}/api/post/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setIsLoading(false);
      swal("Post Created", "", "success");
      setTitle("");
      setCategory("");
      setThumbnail(null);
      setEstimate(0);
      setContent("");
      console.log(res.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  function toTitleCase(str) {
    // Daftar kata yang tidak dikapitalisasi kecuali di awal judul
    const smallWords = [
      "di",
      "dan",
      "atau",
      "dengan",
      "pada",
      "untuk",
      "yang",
      "dari",
      "ke",
      "oleh",
      "untuk",
    ];

    return str
      .split(" ")
      .map((word, index) => {
        // Kapitalisasi kata jika tidak ada dalam daftar kata kecil atau jika kata ada di awal judul
        if (index === 0 || !smallWords.includes(word.toLowerCase())) {
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        } else {
          return word.toLowerCase();
        }
      })
      .join(" ");
  }

  return (
    <div className="create__post-container">
      <Loading isLoading={isLoading} />
      {status === "authenticated" ? (
        <>
          <h1>Create New Post</h1>
          <form onSubmit={handleFormSubmit} encType="multipart/form-data">
            <label htmlFor="title">Judul:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(toTitleCase(e.target.value))}
            />

            <label htmlFor="category">Kategori:</label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />

            <label htmlFor="thumbnail">Thumbnail Foto:</label>
            <input
              type="file"
              id="thumbnail"
              onChange={(e) => setThumbnail(e.target.files[0])}
            />

            <label htmlFor="estimate">Estimasi Waktu Baca (menit):</label>
            <input
              type="number"
              id="estimate"
              value={estimate}
              onChange={(e) => setEstimate(parseInt(e.target.value))}
            />

            <label htmlFor="content">Konten:</label>
            <p style={{ fontSize: "0.8rem" }}>
              <strong>**bold**</strong>, <em>__italic__</em>, #image(url)
            </p>
            <textarea
              id="content"
              value={content}
              rows={10}
              onChange={(e) => setContent(e.target.value)}
            />

            <button
              disabled={
                !title || !category || !thumbnail || !estimate || !content
              }
              className={`${
                !title || !category || !thumbnail || !estimate || !content
                  ? "disabled"
                  : ""
              }`}
              type="submit"
            >
              Buat Postingan Baru
            </button>
          </form>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default NewPostForm;

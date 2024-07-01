"use client";
import { useEffect, useState } from "react";
import "./edit.css";
import "@/app/post/create/index.css";
import { useSession } from "next-auth/react";
import Loading from "@/ui/loading/loading";
import { useRouter } from "next/navigation";
import API_URL from "@/lib/Api";
import swal from "sweetalert";

function Page() {
  const api = API_URL;
  const [userId, setUserId] = useState();
  const [loading, setLoading] = useState(true);
  const [inputPostId, setInputPostId] = useState();
  const [editValid, setEditValid] = useState(false);
  const [realPostId, setRealPostId] = useState();

  // Post
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [writerId, setWriterId] = useState();
  const [thumbnail, setThumbnail] = useState(null);
  const [estimate, setEstimate] = useState(0);
  const [content, setContent] = useState("");

  // session auth
  const { data, status } = useSession();
  let router = useRouter();
  useEffect(() => {
    if (status !== "loading") {
      setLoading(false);
    }

    if (status === "authenticated") {
      setUserId(data.user.userid);
    }

    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router, data]);

  function inputPostId__onClick(e) {
    setInputPostId(e.target.value);
  }

  async function editButton__onClick() {
    setLoading(true);
    // cek apakah postId tujuan adalah milik user
    let currentId = userId;
    let response = await fetch(`${API_URL}/api/post/get`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ postId: inputPostId }),
    });

    let { post } = await response.json();
    if (post) {
      let { writerId } = post;
      if (writerId == currentId) {
        setEditValid(true);
        let { postId, title, thumbnail, category, estimate, content } = post;
        setTitle(title);
        setRealPostId(postId);
        setCategory(category);
        setWriterId(writerId);
        setThumbnail(thumbnail);
        setEstimate(estimate);
        setContent(convertHTMLToMarkdown(content));
      } else {
        swal(
          "Informasi",
          "Tidak bisa mengedit post yang bukan milik anda.",
          "error"
        );
      }
    } else {
      swal("Informasi", "Post dengan ID tersebut tidak ditemukan.", "error");
    }
    setLoading(false);
  }

  // post
  function convertHTMLToMarkdown(html) {
    // Convert <strong>...</strong> to **...**
    html = html.replace(/<strong>(.*?)<\/strong>/g, "**$1**");
    // Convert <em>...</em> to __...__
    html = html.replace(/<em>(.*?)<\/em>/g, "__$1__");
    // Convert <br> to newline (\n)
    html = html.replace(/<br\s*\/?>/g, "\n");
    // Convert <Image .../> to #image(url)
    html = html.replace(/<Image.*?src=["'](.*?)["'].*?\/>/g, "#image($1)");

    return html;
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Submitted");
    let arrKategori = category.split(",");
    let Kategori = arrKategori.map((k) => k.trimStart());
    setCategory(`${Kategori}`);

    const formData = new FormData();
    if (realPostId) {
      formData.append("postId", realPostId);
    }
    if (thumbnail) {
      formData.append("file", thumbnail);
    }
    if (title) {
      formData.append("title", title);
    }
    if (writerId) {
      formData.append("writerId", writerId);
    }
    if (category) {
      formData.append("category", category);
    }
    if (estimate) {
      formData.append("estimate", estimate);
    }
    if (content) {
      formData.append("content", convertMarkupToHTML(content));
    }

    try {
      const res = await fetch(`${api}/api/post/edit`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setLoading(false);
      swal("Post Updated", "", data.isUpdated);
      router.push(`/post/${realPostId}`);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
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
    <div className="edit-container">
      {loading ? (
        <Loading isLoading={loading} />
      ) : (
        <div>
          <p>Masukkan postId dari postingan kamu yang ingin diedit:</p>
          <input
            type="text"
            name="inputPostId"
            onChange={inputPostId__onClick}
          />
          <button onClick={editButton__onClick}>Edit</button>
        </div>
      )}

      {editValid && (
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

          <button type="submit">Edit Postingan</button>
        </form>
      )}
    </div>
  );
}

export default Page;

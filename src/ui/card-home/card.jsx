"use client";
import Image from "next/image";
import "./card.css";
import Loading from "../loading/loading";
import { useRouter } from "next/navigation";
import { useState } from "react";

function Card({ thumbnail, title, postId }) {
  const [loading, setLoading] = useState(false);
  let router = useRouter();
  function card__onClick(postId) {
    // swal(`${postId}`, "", "success");
    setLoading(true);
    router.push(`/post/${postId}`);
  }
  return (
    <>
      <Loading isLoading={loading} />
      <div className="card__home" onClick={() => card__onClick(postId)}>
        <Image
          className="card__home-image"
          src={`/uploads/${thumbnail}`}
          width={1000}
          height={1000}
          alt="image-thumbnail"
        />
        <p className="card__home-title">{title}</p>
      </div>
    </>
  );
}

export default Card;

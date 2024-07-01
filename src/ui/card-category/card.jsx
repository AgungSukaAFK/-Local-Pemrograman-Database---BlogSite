import React from "react";
import "./card.css";
import { useRouter } from "next/navigation";
function Card({ text }) {
  const router = useRouter();
  function card__onClick() {
    const userIdTest = text.match(/\(([^)]+)\)/);
    let userId = userIdTest ? userIdTest[1] : null;
    if (userId) {
      router.push(`/home/filter?from=${userId}`);
    } else {
      router.push(`/home/filter?search=${text}`);
    }
  }
  return (
    <div>
      <button className="card__btn" onClick={card__onClick}>
        {text}
      </button>
    </div>
  );
}

export default Card;

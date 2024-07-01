"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loading from "./loading/loading";

export default function Navbar() {
  const [authStatus, setAuthStatus] = useState();
  const [loading, setLoading] = useState(false);
  let router = useRouter();

  const { status } = useSession();
  useEffect(() => {
    setAuthStatus(status);
  }, [status]);
  function hamburgerHandler() {
    const hamburger = document.querySelector(".hamburger-lines");
    hamburger.classList.toggle("active");

    const listMenu = document.querySelector(".list-menu");
    listMenu.classList.toggle("active");
  }

  function linkHandler(url) {
    setLoading(true);
    router.push(`${url}`);
    setLoading(false);
  }
  return (
    <div className="navbar-container">
      <Loading isLoading={loading} />
      <nav className="navbar ">
        <div className="logo ">
          <Image
            src="/web-light-AgungCipta.png"
            alt="Agungcipta logo"
            width={60}
            height={60}
            className="image-logo"
            draggable="false"
            onClick={() => linkHandler("/")}
          />
        </div>
        <div className="nav-container" onClick={hamburgerHandler}>
          <div className="hamburger-lines">
            <div className="line line1"></div>
            <div className="line line2"></div>
            <div className="line line3"></div>
          </div>
        </div>
        <ul className="list-menu ">
          <li onClick={() => linkHandler("/home")}>Home</li>
          <li onClick={() => linkHandler("/kategori")}>Kategori</li>
          <li onClick={() => linkHandler("/penulis")}>Penulis</li>
          <li onClick={() => linkHandler("/about")}>Tentang</li>
          {/* <li onClick={() => linkHandler("/donasi")}>Donasi</li> */}
          {authStatus === "authenticated" ? (
            <>
              <li onClick={() => linkHandler("/dashboard")}>Dashboard</li>
              <li onClick={() => signOut()}>Logout</li>
            </>
          ) : (
            <li onClick={() => linkHandler("/login")}>Login</li>
          )}
        </ul>
      </nav>
    </div>
  );
}

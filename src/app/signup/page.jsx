"use client";
import { useSession } from "next-auth/react";
import "./signup.css";
import API_URL from "@/lib/Api";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import swal from "sweetalert";
import Loading from "@/ui/loading/loading";
import SignupAdmin from "./_pages/signupAdmin";

function Page() {
  const api = API_URL;
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState();
  const { data, status } = useSession();

  let router = useRouter();

  useEffect(() => {
    if (status !== "loading") {
      setLoading(false);
    }

    if (status === "authenticated") {
      setRole(data.user.role);
    }
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [router, status, data]);
  return (
    <div className="signup-container">
      {loading ? (
        <Loading isLoading={loading} />
      ) : role == "ADMIN" ? (
        <SignupAdmin />
      ) : (
        <div>Anjay</div>
      )}
    </div>
  );
}

export default Page;

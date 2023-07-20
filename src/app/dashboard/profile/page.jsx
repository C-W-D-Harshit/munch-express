"use client";
import axios from "axios";
import "@/components/styles/dashboard/profile.css";
import Swal from "sweetalert2";
// import Logout from "@/components/dashboard/Logout";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// const getData = async () => {
//   const res = await fetch(`${process.env.LINK}/api/v1/user/me`, {
//     headers: { Cookie: cookies().toString() },
//     next: { revalidate: 10 },
//   });

//   return res.json();
// };

const Profile = () => {
  const router = useRouter();

  // const { user } = await getData();
  const [user, setUser] = useState({
    name: "Harshit Sharma",
    phoneNumber: 9876543210,
    email: "hello@cleverdevloper.in",
    role: "user",
  });
  const getUser = async () => {
    try {
      const res = await axios.get("/api/v1/user/me");
      const data = res.data;
      setUser(data.user);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  const Logout = async () => {
    try {
      const res = await axios.get("/api/v1/user/logout");
      const data = res.data;
      Swal.fire("See you soon!", data.message, "success");
      router.push("/");
    } catch (err) {
      Swal.fire("Error", "Server Error", "error");
    }
  };

  return (
    <div className="profilepg">
      <p>Personal Info</p>
      <p>
        Name: <b>{user.name}</b>
      </p>
      <p>
        Email: <b>{user.email}</b>
      </p>
      <p>
        Phone: <b>{user.phoneNumber}</b>
      </p>
      <button type="button" onClick={Logout}>
        Logout
      </button>
      {user.role === "admin" && (
        <Link passHref href={"/admin"}>
          <button type="button">Admin</button>
        </Link>
      )}
    </div>
  );
};

export default Profile;

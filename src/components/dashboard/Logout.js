"use client";
import axios from "axios";
import { useRouter } from "next/navigation"; // Update import path for useRouter
import Swal from "sweetalert2";

const Logout = async () => {
  const router = useRouter();
  try {
    const res = await axios.get("/api/v1/user/logout");
    const data = res.data;
    Swal.fire("See you soon!", data.message, "success");
    router.push("/");
  } catch (err) {
    Swal.fire("Error", "Server Error", "error");
  }
};

export default Logout;

import axios from "axios";
import "@/components/styles/dashboard/profile.css";
import Swal from "sweetalert2";
import { cookies } from "next/headers";
import Logout from "@/components/dashboard/Logout";
import Link from "next/link";

const getData = async () => {
  const res = await fetch(`${process.env.LINK}/api/v1/user/me`, {
    headers: { Cookie: cookies().toString() },
    next: { revalidate: 10 },
  });

  return res.json();
};

const Profile = async () => {
  const { user } = await getData();
  // const [user, setUser] = useState({
  //   name: "Harshit Sharma",
  //   phoneNumber: 9876543210,
  //   email: "hello@cleverdevloper.in",
  //   role: "user",
  // });
  // const getUser = async () => {
  //   try {
  //     const res = await axios.get("/api/v1/user/me");
  //     const data = res.data;
  //     setUser(data.user);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // useEffect(() => {
  //   getUser();
  // }, []);

  return (
    <div className="profilepg">
      <p>Personal Info</p>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phoneNumber}</p>
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

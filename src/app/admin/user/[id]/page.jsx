"use client";
import Loader from "@/components/loader";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoReturnDownBackSharp } from "react-icons/io5";
import "@/components/styles/admin/productDetails.css";
import Swal from "sweetalert2";

const Page = ({ params }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [nuser, setNuser] = useState(null);
  const getData = async () => {
    try {
      let apiUrl = `/api/v1/user/${params.id}`;

      const { data } = await axios.get(apiUrl);
      setUser(data.user);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  if (!user || loading === true) {
    return <Loader />;
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    let newValue = type === "checkbox" ? checked : value;

    if (name === "role") {
      const role = newValue === true ? "admin" : "user";
      // console.log(role);
      setUser((prevuser) => ({
        ...prevuser,
        [name]: role,
      }));
      setNuser((prevuser) => ({
        ...prevuser,
        [name]: role,
      }));
      return;
    }

    if (type === "number") {
      newValue = parseFloat(newValue);
    }

    setUser((prevuser) => ({
      ...prevuser,
      [name]: newValue,
    }));
    setNuser((prevuser) => ({
      ...prevuser,
      [name]: newValue,
    }));
  };
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based
    const year = date.getFullYear();
    return `${day}-${month < 10 ? "0" + month : month}-${year}`;
  }

  const save = async () => {
    try {
      setLoading(true);
      const { data } = await axios.patch(`/api/v1/user/${params.id}`, nuser);

      Swal.fire("Updated Successfully!", "", "success");
      setUser(data.user);
    } catch (err) {
      Swal.fire("Validation Error", err.message, "error");
      setLoading(false);
    }
    setLoading(false);
  };

  const del = async () => {
    try {
      const { data } = await axios.delete(`/api/v1/user/${params.id}`);

      Swal.fire("Deleted Successfully!", data.message, "success");
    } catch (err) {
      Swal.fire("Validation Error", err.message, "error");
    }
  };

  return (
    <div className="adminProductDetails">
      <div className="adminProductDetails_top">
        <p>
          User ID: <span>{params.id}</span>
        </p>
      </div>
      <Link href="/admin/users">
        <IoReturnDownBackSharp />
      </Link>
      <div className="adminPD">
        <div className="adminPD_">
          <div>
            <div className="adminPD_name">
              <p>Name</p>
              <input
                type="text"
                name="name"
                id="name"
                placeholder={"User Name"}
                value={user.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="adminPD_name">
              <p>Email</p>
              <input
                type="email"
                name="email"
                id="email"
                placeholder={"User Email"}
                value={user.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="adminPD_name">
              <p>Phone Number</p>
              <input
                type="number"
                name="phoneNumber"
                id="phoneNumber"
                placeholder={"User Phone Number"}
                value={user.phoneNumber}
                onChange={handleInputChange}
              />
            </div>
            <div className="adminPD_name">
              <p>IP</p>
              <input
                type="text"
                name="ip"
                id="ip"
                placeholder={"User IP"}
                value={user.ip}
                disabled
                onChange={handleInputChange}
              />
            </div>
            <div className="adminPD_name">
              <p>Admin</p>
              <input
                type="checkbox"
                name="role"
                id="role"
                checked={nuser ? nuser.role === "admin" : user.role === "admin"}
                onChange={handleInputChange}
              />
            </div>
            <div className="adminPD_name">
              <p>Created At</p>
              <input
                type="text"
                name="createdAt"
                id="createdAt"
                placeholder="Example Date"
                value={formatDate(user.createdAt)}
                onChange={handleInputChange}
                disabled
              />
            </div>
            <div className="adminPD_name">
              <p>Updated At</p>
              <input
                type="text"
                name="updatedAt"
                id="updatedAt"
                placeholder="Example Date"
                value={formatDate(user.updatedAt)}
                onChange={handleInputChange}
                disabled
              />
            </div>
            <div className="adminPD_name">
              <p>Password Changed At</p>
              <input
                type="text"
                name="passwordChangedAt"
                id="passwordChangedAt"
                placeholder="Example Date"
                value={formatDate(user.passwordChangedAt)}
                onChange={handleInputChange}
                disabled
              />
            </div>
            {/* <div className="divider" style={{ marginBottom: "2rem" }}></div> */}
          </div>
        </div>
        <div className="adminPD__">
          {/* <div className="adminPD__v">Views: {product.viewCount}</div> */}
          <div className="adminPD__bt">
            <button onClick={save}>Save</button>
            <button onClick={del}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

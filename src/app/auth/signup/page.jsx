"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { BiRename } from "react-icons/bi";
import { RiLockPasswordLine } from "react-icons/ri";
import { Balancer } from "react-wrap-balancer";
import Swal from "sweetalert2";

const Login = () => {
  const router = useRouter();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    phoneNumber: 0,
    name: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const log = async (e) => {
    e.preventDefault();
    console.log(userData);
    try {
      const response = await axios.post("/api/v1/user/signup", userData);
      const data = response.data;
      Swal.fire("Good job!", data.message, "success");
      router.push("/dashboard");
    } catch (err) {
      Swal.fire("Shit Bro!", err.response.data.message, "error");
    }
  };

  return (
    <div className="authBox">
      <div className="authBox_">
        <Image src="/chef.png" alt="Image Here!" width={900} height={900} />
        <Link href="/" className="authBox_closem">
          <AiOutlineClose />
        </Link>
      </div>
      <div className="authBox__">
        <form onSubmit={log} className="loginBox">
          <p className="loginBox_tit">
            <Balancer>Hello Their!</Balancer>{" "}
          </p>
          <div className="loginBox_com">
            <p>Full Name:</p>
            <label htmlFor="name" />
            <div>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Harshit Sharma"
                value={userData.name}
                onChange={handleChange}
                required
              />
              <BiRename />
            </div>
          </div>
          <div className="loginBox_com">
            <p>Phone Number:</p>
            <label htmlFor="phoneNumber" />
            <div>
              <input
                type="number"
                name="phoneNumber"
                id="phoneNumber"
                placeholder="9876543210"
                value={userData.phoneNumber !== 0 ? userData.phoneNumber : ""}
                onChange={handleChange}
                required
              />
              <AiOutlinePhone />
            </div>
          </div>
          <div className="loginBox_com">
            <p>Email:</p>
            <label htmlFor="email" />
            <div>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="xyz@email.com"
                value={userData.email}
                onChange={handleChange}
                required
              />
              <AiOutlineMail />
            </div>
          </div>
          <div className="loginBox_com" style={{ marginBottom: "2rem" }}>
            <p>Password:</p>
            <lable htmlFor="password" />
            <div>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Minimum 8 characters!"
                value={userData.password}
                onChange={handleChange}
                required
              />
              <RiLockPasswordLine />
            </div>
          </div>
          <div className="loginBox_com" style={{ marginBottom: "2rem" }}>
            <p>Confirm Password:</p>
            <lable htmlFor="password" />
            <div>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Same as password!"
                value={userData.confirmPassword}
                onChange={handleChange}
                required
              />
              <RiLockPasswordLine />
            </div>
          </div>
          <button type="submit" className="loginBox_but">
            Sign Up
          </button>
          <div className="authDivider">
            <div />
            <p>OR</p>
            <div />
          </div>
          <div className="authChange" style={{ marginBottom: "2rem" }}>
            <p>
              <Balancer>
                Already have an account?{"   "}
                <Link href="/auth/login" className="authChange_">
                  Login
                </Link>
              </Balancer>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

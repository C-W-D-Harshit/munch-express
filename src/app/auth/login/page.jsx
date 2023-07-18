"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { Balancer } from "react-wrap-balancer";
import Swal from "sweetalert2";

const Login = () => {
  const router = useRouter();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const log = async (e) => {
    e.preventDefault();
    console.log(userData);
    try {
      const response = await axios.post("/api/v1/user/login", userData);
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
            <Balancer>Welcome Back!</Balancer>{" "}
          </p>
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
          <button type="submit" className="loginBox_but">
            Login
          </button>
          <div className="authDivider">
            <div />
            <p>OR</p>
            <div />
          </div>
          <div className="authChange">
            <p>
              <Balancer>
                New to Munch Express?{"   "}
                <Link href="/auth/signup" className="authChange_">
                  Sign Up
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

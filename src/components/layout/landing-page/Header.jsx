import Link from "next/link";
import React from "react";
import { RxExit } from "react-icons/rx";
import "@/components/styles/header.css";

const Header = () => {
  const menu = [
    {
      text: "Why?",
      link: "/",
    },
    {
      text: "Services",
      link: "/services",
    },
    {
      text: "Menu",
      link: "/menu",
    },
    {
      text: "Contact",
      link: "/",
    },
  ];
  return (
    <div className="margin header">
      <Link href={"/"} className="header__logo">
        <p>
          Munch <span>Express</span>
        </p>
      </Link>
      <div className="header__menu">
        {menu?.map((item, index) => (
          <Link key={index} href={item.link}>
            <p>{item.text}</p>
            <span />
          </Link>
        ))}
      </div>
      <Link href={"/auth/login"} className="header__pot">
        <RxExit />
        Login
      </Link>
    </div>
  );
};

export default Header;

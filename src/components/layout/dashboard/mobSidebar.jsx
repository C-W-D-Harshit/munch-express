"use client";
import Link from "next/link";
import React from "react";
import { BiCategory, BiHome } from "react-icons/bi";
import { BsSearch, BsShopWindow } from "react-icons/bs";
import { IoBagHandleOutline, IoPersonCircleOutline } from "react-icons/io5";
import "@/components/styles/dashboard/dashboard.css";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

const MobSidebar = () => {
  const path = usePathname();
  const cart = useSelector((state) => state.cart.totalQuantity);
  const icons = [
    { icon: <BsShopWindow />, link: "/dashboard/m-shop" },
    { icon: <BsSearch />, link: "/dashboard/search" },
    { icon: <BiHome />, link: "/dashboard" },
    { icon: <IoBagHandleOutline />, link: "/dashboard/cart" },
    // { icon: <AiOutlineHeart />, link: "/dashboard/wishlist" },
    // { icon: <HiOutlineLocationMarker />, link: "/dashboard/saved-addresses" },
    { icon: <IoPersonCircleOutline />, link: "/dashboard/profile" },
  ];

  return (
    <div className="mobSidebar">
      {icons?.map((icon, i) => (
        <Link
          href={icon.link}
          key={i}
          className={path === icon.link ? "avt" : ""}
        >
          {icon.icon}
          {icon.link === "/dashboard/cart" ? <span>{cart}</span> : null}
        </Link>
      ))}
    </div>
  );
};

export default MobSidebar;

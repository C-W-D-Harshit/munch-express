"use client";
import React from "react";
import { RxExit } from "react-icons/rx";
import { BiCategory, BiHome } from "react-icons/bi";
import { BsGear, BsShop, BsShopWindow } from "react-icons/bs";
import { GiCookingPot } from "react-icons/gi";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiOutlineHeart, AiOutlineShop } from "react-icons/ai";
import { FaShoppingBag } from "react-icons/fa";
import { IoBagHandleOutline, IoPersonCircleOutline } from "react-icons/io5";
import { HiOutlineLocationMarker } from "react-icons/hi";

const Sidebar = () => {
  const path = usePathname();
  const icons = [
    { icon: <BiHome />, link: "/dashboard" },
    { icon: <BsShopWindow />, link: "/dashboard/shop" },
    { icon: <BiCategory />, link: "/dashboard/categories" },
    { icon: <GiCookingPot />, link: "/dashboard/recipes" },
    { icon: <AiOutlineHeart />, link: "/dashboard/wishlist" },
    { icon: <HiOutlineLocationMarker />, link: "/dashboard/saved-addresses" },
    { icon: <BsGear />, link: "/dashboard/settings" },
  ];
  return (
    <div className="sidebar">
      <div className="sidebar_">
        {icons?.map((icon, index) => (
          <Link
            href={icon.link}
            key={index}
            className={path === icon.link ? "sidAct" : null}
          >
            {icon.icon}
          </Link>
        ))}
      </div>
      <div className="sidebar__">
        <RxExit />
      </div>
    </div>
  );
};

export default Sidebar;

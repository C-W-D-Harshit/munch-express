"use client";
import React from "react";
import "@/components/styles/admin/sidebar.css";
import Link from "next/link";
import { MdDashboard } from "react-icons/md";
import { BsFillBagCheckFill } from "react-icons/bs";
import { RxExit } from "react-icons/rx";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";
import { GiShop } from "react-icons/gi";
import { IoCreate } from "react-icons/io5";
import { RiFolderUserFill, RiCoupon3Fill } from "react-icons/ri";

const SidebarAdmin = () => {
  const router = useRouter();
  const path = usePathname();
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

  const data = [
    {
      href: "/admin",
      icon: <MdDashboard />,
      text: "Live Orders",
    },
    {
      href: "/admin/order-history",
      icon: <BsFillBagCheckFill />,
      text: "Order History",
    },
    {
      href: "/admin/products",
      icon: <GiShop />,
      text: "Products",
    },
    {
      href: "/admin/create-product",
      icon: <IoCreate />,
      text: "Create Product",
    },
    {
      href: "/admin/users",
      icon: <RiFolderUserFill />,
      text: "Users",
    },

    {
      href: "/admin/coupons",
      icon: <RiCoupon3Fill />,
      text: "Coupons",
    },
    // Add more link objects as needed
  ];
  return (
    <div className="adminSidebar">
      <Link
        href={"/admin"}
        className="header__logo"
        style={{ fontSize: "3.3rem" }}
      >
        <p>
          Munch <span>Express</span>
        </p>
      </Link>
      <div className="adminSidebar2">
        {data.map((link, index) => (
          <Link
            href={link.href}
            key={index}
            className={path === link.href ? "addAct" : null}
          >
            {link.icon}
            <p>{link.text}</p>
          </Link>
        ))}
      </div>
      <button type="button" className="adminSidebar3" onClick={Logout}>
        <RxExit style={{ marginRight: "1.2rem" }} />
        <p>Logout</p>
      </button>
    </div>
  );
};

export default SidebarAdmin;

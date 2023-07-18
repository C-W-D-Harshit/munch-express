/* eslint-disable react/no-unescaped-entities */
"use client";
import { usePathname } from "next/navigation";
import NextTopLoader from "nextjs-toploader";
import Header from "./landing-page/Header";
import Sidebar from "./dashboard/Sidebar";
import { BsSearch } from "react-icons/bs";
import Link from "next/link";
import { BiBell } from "react-icons/bi";
import { IoBagHandleOutline, IoPersonCircleOutline } from "react-icons/io5";
import { LuLayoutDashboard } from "react-icons/lu";
import { useSelector } from "react-redux";
import SidebarAdmin from "./admin/Sidebar";
import "@/components/styles/admin/admin.css";
import MobSidebar from "@/components/layout/dashboard/mobSidebar";

const LayoutProvider = ({ children }) => {
  const path = usePathname();
  const inDashboard = /^\/dashboard\b/.test(path);
  const inAuth = /^\/auth\b/.test(path);
  const inAdmin = /^\/admin\b/.test(path);
  const notificationCounter = 1;
  const cart = useSelector((state) => state.cart.items);
  if (inDashboard) {
    return (
      <div className="dashboardLayout">
        <NextTopLoader showSpinner={false} color="#fb9501" />
        <Sidebar />
        <MobSidebar />
        <div className="dashCont">
          <div className="dashCounty">
            {/* <div className="dashIco mobDashIco">
              <LuLayoutDashboard />
            </div> */}
            <Link href={"/dashboard"} className="header__logo">
              <p>
                Munch <span>Express</span>
              </p>
            </Link>
            <div className="dashCounty_menu">
              {/* <div className="dashSearch">
                <input type="text" placeholder="Search by food name" />
                <BsSearch />
              </div> */}
              <Link href={"/dashboard/notification"} className="dashIco">
                <BiBell />
                <span>{notificationCounter}</span>
              </Link>
              <Link href={"/dashboard/cart"} className="dashIco">
                <IoBagHandleOutline />
                <span>{cart.length}</span>
              </Link>
              <Link href={"/dashboard/profile"} className="dashIco">
                <IoPersonCircleOutline />
              </Link>
            </div>
            {/* <div className="dashIco mobDashIco">
              <BsSearch />
            </div> */}
          </div>
          {/* for mobile menu bro */}
          {children}
        </div>
        <div className="dashMvi" style={{ minHeight: "10rem" }} />
      </div>
    );
  }
  if (inAuth) {
    return (
      <>
        <NextTopLoader showSpinner={false} color="#fb9501" />
        {children}
      </>
    );
  }

  if (inAdmin) {
    return (
      <>
        <NextTopLoader showSpinner={false} color="#fb9501" />
        <div className="admin">
          <SidebarAdmin />
          <div className="adminWrapper">
            <div className="adminWrapper_">{children}</div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div>
      <NextTopLoader showSpinner={false} color="#fb9501" />
      <Header />
      {children}
    </div>
  );
};

export default LayoutProvider;

"use client";
import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import "@/components/styles/dashboard/search.css";
import { useRouter } from "next/navigation";

const Page = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const Search = (e) => {
    e.preventDefault();
    router.push(`/dashboard/search/${search}`);
  };
  return (
    <div className="search">
      <form onSubmit={Search} className="dashSearch" style={{ width: "100%" }}>
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <BsSearch />
        <input type="submit" hidden />
      </form>
    </div>
  );
};

export default Page;

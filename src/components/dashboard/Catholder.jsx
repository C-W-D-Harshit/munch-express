import React from "react";
import { AiFillPlusSquare } from "react-icons/ai";
import CatCard from "../cards/CatCard";
import Link from "next/link";

const Catholder = () => {
  const categories = [
    {
      icon: "/pizza.png",
      name: "pizza",
    },
    {
      icon: "/burger.png",
      name: "burger",
    },
    {
      icon: "/hotdog.png",
      name: "hotdog",
    },
    {
      icon: "/snacks.png",
      name: "snacks",
    },
    {
      icon: "/drinks.png",
      name: "drinks",
    },
    {
      icon: "/thali.png",
      name: "thali",
    },
    {
      icon: "/thali.png",
      name: "thali",
    },
  ];
  return (
    <div className="category">
      <div className="category_top">
        <p>Categories</p>
        <Link href={"/dashboard/categories"}>
          <p>View All</p>
          <AiFillPlusSquare />
        </Link>
      </div>
      <div className="category_hold">
        {categories?.map((category, index) => (
          <CatCard category={category} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Catholder;

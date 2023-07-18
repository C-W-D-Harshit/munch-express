import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiOutlineRight } from "react-icons/ai";

const CatCard = ({ category }) => {
  return (
    <Link href={`/dashboard/categories/${category._id}`} className="catCard">
      <div className="catCard_img">
        <Image
          src={category.icon}
          alt={category.name}
          width={320}
          height={320}
          quality={100}
        />
      </div>
      <p>{category.name}</p>
      <div className="catCard_but">
        <AiOutlineRight />
      </div>
    </Link>
  );
};

export default CatCard;

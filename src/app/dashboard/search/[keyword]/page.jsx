import React from "react";
import { cookies } from "next/headers";
import ProductCard from "@/components/cards/ProductCard";
import "@/components/styles/dashboard/mShop.css";

const getData = async (keyword) => {
  const res = await fetch(
    `${process.env.LINK}/api/v1/products?keyword=${keyword}`,
    {
      headers: { Cookie: cookies().toString() },
      next: { revalidate: 10 },
    }
  );

  return res.json();
};

const page = async ({ params }) => {
  let data = await getData(params.keyword);
  return (
    <div className="mShop">
      <div className="mShop_holder">
        {data.products?.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
    </div>
  );
};

export default page;

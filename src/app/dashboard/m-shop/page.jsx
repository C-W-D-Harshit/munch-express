"use client";
import ProductCard from "@/components/cards/ProductCard";
import Loader from "@/components/loader";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import InfiniteScroll from "react-infinite-scroll-component";
import "@/components/styles/dashboard/mShop.css";

const Page = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(1);

  const apiUrl = `/api/v1/products?page=${currentPage}`;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(apiUrl);
        setProducts((prevProducts) => [...prevProducts, ...data.products]);
        setTotalProducts(data.totalProducts);
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
      setLoading(false);
    };

    fetchData();
  }, [apiUrl, currentPage]);

  const fetchMoreData = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  if (loading && currentPage === 1) {
    return (
      <div className="shop">
        <Loader />
      </div>
    );
  }

  return (
    <div className="mShop">
      <div className="mShop_holder">
        <InfiniteScroll
          dataLength={products.length}
          next={fetchMoreData}
          hasMore={totalProducts > products.length}
          loader={<Loader />}
          endMessage={<p>No more products to load</p>}
        >
          {products.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Page;

"use client";
import React, { useEffect, useState } from "react";
import "@/components/styles/admin/products.css";
import { BsSearch } from "react-icons/bs";
import { AiFillCaretDown } from "react-icons/ai";
import axios from "axios";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import Loader from "@/components/loader";
import Link from "next/link";

const Products = () => {
  const [products, setProducts] = useState(null);
  const [sort, setSort] = useState(null);
  const [toggle, setToggle] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      let apiUrl = `/api/v1/products?keyword=${search}&page=${currentPage}`;

      if (sort) {
        setSort(sort.replace(/"/g, ""));
        let tog = toggle ? "-" : "+";
        tog = tog.replace(/"/g, "");
        apiUrl += `&sort=${tog}${sort}`;
      }

      const { data } = await axios.get(apiUrl);
      setProducts(data.products);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error(err.message);
      setLoading(false);
    }
    setLoading(false);
  };
  useEffect(() => {
    getData();
  }, [search, sort, toggle, currentPage]);

  const SORT = (name) => {
    setSort(name);
    setToggle(!toggle);
    console.log(sort, toggle);
  };
  const searchFun = (e) => {
    setSearch(e.target.value);
  };
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };
  const handleFirstPage = () => {
    setCurrentPage(1);
  };
  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  //   console.log(sort, toggle);
  return (
    <div className="adminProducts">
      <div className="adminProducts_top">
        <p>All Products</p>
        <div className="dashSearch">
          <input
            type="text"
            placeholder="Search by food name"
            onChange={(e) => searchFun(e)}
          />
          <BsSearch />
        </div>
      </div>
      <div className="adminProducts_table">
        <div>
          <div onClick={() => SORT("_id")}>
            <p>ID</p>
            <AiFillCaretDown />
          </div>
          <div onClick={() => SORT("name")}>
            <p>NAME</p>
            <AiFillCaretDown />
          </div>
          <div onClick={() => SORT("category")}>
            <p>CATEGORY</p>
            <AiFillCaretDown />
          </div>
          <div onClick={() => SORT("price")}>
            <p>PRICE</p>
            <AiFillCaretDown />
          </div>
          <div onClick={() => SORT("featured")}>
            <p>FEATURED</p>
            <AiFillCaretDown />
          </div>
          <div onClick={() => SORT("isPopular")}>
            <p>POPULAR</p>
            <AiFillCaretDown />
          </div>
        </div>
        {products ? (
          products.map((product) => {
            //   console.log(product);
            return (
              <Link href={`/admin/product/${product._id}`} key={product._id}>
                <p>{product._id}</p>
                <p>{product.name}</p>
                <p>{product.category}</p>
                <p>{product.price}</p>
                <p>{product.featured?.toString()}</p>
                <p>{product.isPopular?.toString()}</p>
              </Link>
            );
          })
        ) : (
          <Loader />
        )}
      </div>
      <div className="adminProduct_pag">
        <div>
          <div onClick={handleFirstPage} disabled={currentPage === 1}>
            First
          </div>

          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            <BiSkipPrevious />
          </button>
        </div>
        <div>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={currentPage === i + 1 ? "pagActive pagBut" : "pagBut"}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <div>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            <BiSkipNext />
          </button>
          <div onClick={handleLastPage} disabled={currentPage === totalPages}>
            Last
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;

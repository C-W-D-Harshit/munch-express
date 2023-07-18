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

  const getData = async () => {
    try {
      let apiUrl = `/api/v1/coupons?keyword=${search}&page=${currentPage}`;

      if (sort) {
        setSort(sort.replace(/"/g, ""));
        let tog = toggle ? "-" : "+";
        tog = tog.replace(/"/g, "");
        apiUrl += `&sort=${tog}${sort}`;
      }

      const { data } = await axios.get(apiUrl);
      setProducts(data.coupons);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error(err.message);
    }
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
        <p>All Coupons</p>
        <div className="dashSearch">
          <input
            type="text"
            placeholder="Search by coupon name"
            onChange={(e) => searchFun(e)}
          />
          <BsSearch />
        </div>
      </div>
      <div className="adminProducts_table">
        <div>
          <div onClick={() => SORT("name")}>
            <p>NAME</p>
            <AiFillCaretDown />
          </div>
          <div onClick={() => SORT("description")}>
            <p>DESCRIPTION</p>
            <AiFillCaretDown />
          </div>
          <div onClick={() => SORT("code")}>
            <p>CODE</p>
            <AiFillCaretDown />
          </div>
          <div onClick={() => SORT("discount")}>
            <p>DISCOUNT</p>
            <AiFillCaretDown />
          </div>
          <div onClick={() => SORT("maxUses")}>
            <p>Max Uses</p>
            <AiFillCaretDown />
          </div>

          <div onClick={() => SORT("validFrom")}>
            <p>From</p>
            <AiFillCaretDown />
          </div>
          <div onClick={() => SORT("vaildUntil")}>
            <p>Till</p>
            <AiFillCaretDown />
          </div>
        </div>
        {products ? (
          products.map((product) => {
            //   console.log(product);
            function formatDate(dateString) {
              const date = new Date(dateString);
              const day = date.getDate();
              const month = date.getMonth() + 1; // Months are zero-based
              const year = date.getFullYear();
              return `${day}-${month < 10 ? "0" + month : month}-${year}`;
            }
            return (
              <Link href={`/admin/coupon/${product._id}`} key={product._id}>
                <p>{product.name}</p>
                <p>{product.description}</p>
                <p>{product.code}</p>
                <p>{product.discount}%</p>
                <p>{product.maxUses}</p>
                <p>{formatDate(product.validFrom)}</p>
                <p>{formatDate(product.validUntil)}</p>
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

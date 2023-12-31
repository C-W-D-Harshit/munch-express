"use client";
import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import "@/components/styles/dashboard/shop.css";
import ProductCard from "@/components/cards/ProductCard";
import Loader from "@/components/loader";
import axios from "axios";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import "@/components/styles/admin/products.css";
import { Flex, RadioGroup, Text } from "@radix-ui/themes";

const Shop = () => {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [toggle, setToggle] = useState(false);
  const [selectedRating, setSelectedRating] = useState("");
  const [sortByPrice, setSortByPrice] = useState("");
  const [sortByRatings, setSortByRatings] = useState("");
  const [data, setData] = useState(null);

  let apiUrl = `/api/v1/products?keyword=${search}&page=${currentPage}&sort=${sort}`;
  const handlePriceSortChange = (event) => {
    setSort(event.target.value);
  };

  const handleRatingsSortChange = (event) => {
    setSort(event.target.value);
  };

  const handleRatingChange = (event) => {
    setSelectedRating(event.target.value);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(apiUrl);
        setProducts(data.products);
        setData(data);
        // setTotalPages(data.totalPages);
      } catch (err) {
        console.error(err.message);
      }
    };
    getData();
  }, [
    search,
    sort,
    toggle,
    currentPage,
    sortByRatings,
    sortByPrice,
    selectedRating,
    apiUrl,
  ]);

  const remFilt = () => {
    setSort("");
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };
  const handleLastPage = () => {
    setCurrentPage(data.totalPages);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  if (products === null) {
    return (
      <div className="shop">
        <Loader />
      </div>
    );
  }

  return (
    <div className="shop">
      <div className="shop_search">
        <div className="shop_search_"></div>
        <div className="dashSearch">
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <BsSearch />
        </div>
      </div>
      <div className="shop_">
        <div className="shop_filter">
          <div className="shop_filter_">
            <p>Sort By</p>
            <div>
              <div>
                <p>Price</p>
                <div>
                  <RadioGroup.Root defaultValue="1">
                    <div>
                      {/* <label>
                        <input
                          type="radio"
                          name="priceSort"
                          value="+price"
                          checked={sort === "+price"}
                          onChange={handlePriceSortChange}
                        />
                        Low to High
                      </label> */}
                      <label>
                        <Flex gap="2" align="center">
                          <RadioGroup.Item
                            // name="priceSort"
                            value="+price"
                            checked={sort === "+price"}
                            // onChange={handlePriceSortChange}
                            onClick={() => setSort("+price")}
                          />
                          <Text size="2">Low To High</Text>
                        </Flex>
                      </label>
                    </div>
                    <div>
                      {/* <label>
                        <input
                          type="radio"
                          name="priceSort"
                          value="-price"
                          checked={sort === "-price"}
                          onChange={handlePriceSortChange}
                        />
                        High to Low
                      </label> */}
                      <label>
                        <Flex gap="2" align="center">
                          <RadioGroup.Item
                            // name="priceSort"
                            value="-price"
                            checked={sort === "-price"}
                            // onChange={handlePriceSortChange}
                            onClick={() => setSort("-price")}
                          />
                          <Text size="2">High To Low</Text>
                        </Flex>
                      </label>
                    </div>
                  </RadioGroup.Root>
                </div>
              </div>
              <div>
                <p>Ratings</p>
                <div>
                  <RadioGroup.Root defaultValue="1">
                    <div>
                      {/* <label>
                        <input
                          type="radio"
                          name="ratingsSort"
                          value="+averageratings"
                          checked={sort === "+averageratings"}
                          onChange={handleRatingsSortChange}
                        />
                        Low to High
                      </label> */}
                      <label>
                        <Flex gap="2" align="center">
                          <RadioGroup.Item
                            // name="priceSort"
                            value="+averageratings"
                            checked={sort === "+averageratings"}
                            // onChange={handlePriceSortChange}
                            onClick={() => setSort("+averageratings")}
                          />
                          <Text size="2">Low To High</Text>
                        </Flex>
                      </label>
                    </div>
                    <div>
                      {/* <label>
                        <input
                          type="radio"
                          name="ratingsSort"
                          value="-averageratings"
                          checked={sort === "-averageratings"}
                          onChange={handleRatingsSortChange}
                        />
                        High to Low
                      </label> */}
                      <label>
                        <Flex gap="2" align="center">
                          <RadioGroup.Item
                            // name="priceSort"
                            value="+averageratings"
                            checked={sort === "-averageratings"}
                            // onChange={handlePriceSortChange}
                            onClick={() => setSort("-averageratings")}
                          />
                          <Text size="2">High to Low</Text>
                        </Flex>
                      </label>
                    </div>
                  </RadioGroup.Root>
                </div>
              </div>
            </div>
          </div>
          <div className="divider" style={{ marginBottom: "2rem" }} />
          <button className="filt_but" onClick={remFilt}>
            <p>Remove Filters</p>
          </button>
        </div>
        <div className="shop_holder">
          <div className="shop_holder_">
            {products.length > 0 ? (
              products.map((product) => {
                return <ProductCard product={product} key={product._id} />;
              })
            ) : (
              <div className="product_not">
                <p>No product found!</p>
              </div>
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
              {Array.from({ length: data.totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  className={
                    currentPage === i + 1 ? "pagActive pagBut" : "pagBut"
                  }
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <div>
              <button
                onClick={handleNextPage}
                disabled={currentPage === data.totalPages}
              >
                <BiSkipNext />
              </button>
              <div
                onClick={handleLastPage}
                disabled={currentPage === data.totalPages}
              >
                Last
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;

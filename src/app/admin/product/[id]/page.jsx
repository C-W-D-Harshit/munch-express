"use client";
import React, { useEffect, useState } from "react";
import "@/components/styles/admin/productDetails.css";
import axios from "axios";
import Loader from "@/components/loader";
import { IoReturnDownBackSharp } from "react-icons/io5";
import Link from "next/link";
import Swal from "sweetalert2";
import Image from "next/image";

const Page = ({ params }) => {
  const [product, setProduct] = useState(null);
  const [nproduct, setNproduct] = useState(null);
  const [addOn, setAddOn] = useState(false);
  const [addons, setAddons] = useState(null);
  const [addOnCount, setAddOnCount] = useState(0);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAddMore = () => {
    setAddOnCount((prevCount) => prevCount + 1);
  };
  const getData = async () => {
    try {
      let apiUrl = `/api/v1/product/${params.id}`;

      const { data } = await axios.get(apiUrl);
      setProduct(data.product);
      if (data.product.addons.length > 0) {
        setAddOn(true);
        setAddons(data.product.addons);
        setAddOnCount(data.product.addons.length);
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    setProduct({
      price: 0,
    });
    setAddons({
      price: 0,
    });
    getData();
  }, []);

  if (!product) {
    return <Loader />;
  }

  if (loading === true) {
    return <Loader />;
  }

  const handleInputChangeA = (e, index) => {
    const { name, value, type, checked } = e.target;
    const updatedAddons = [...addons];
    if (name === "price") {
      const price = parseFloat(value);
      updatedAddons[index] = {
        ...updatedAddons[index],
        [name]: price,
      };
    } else {
      updatedAddons[index] = {
        ...updatedAddons[index],
        [name]: value,
      };
    }
    let addon = [...updatedAddons];
    addon = addon.splice(0, product.addons?.length + 1);
    setAddons(updatedAddons);
    setNproduct((prevProduct) => ({
      ...prevProduct,
      addons: addon,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = type === "checkbox" ? checked : value;

    if (name === "tags") {
      newValue = newValue.split(",");
    }

    if (name === "addons") {
      setAddOn(checked);
      if (!checked && product.addons.length !== 0) {
        setNproduct((prevProduct) => {
          const { addons, ...updatedNProduct } = prevProduct;
          return updatedNProduct;
        });
      }
      return;
    }
    if (name === "price") {
      newValue = parseFloat(newValue);
    }

    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: newValue,
    }));
    setNproduct((prevProduct) => ({
      ...prevProduct,
      [name]: newValue,
    }));
  };
  const handleRemoveAddon = (index) => {
    const updatedAddons = [...addons];
    updatedAddons.splice(index, 1);
    setAddons(updatedAddons);
    setAddOnCount(addOnCount - 1);
    setNproduct((prevProduct) => ({
      ...prevProduct,
      addons: updatedAddons,
    }));
  };
  // console.log(nproduct);
  const handleImageChange = (event) => {
    // const selectedImage = event.target.files[0];
    // setImage(selectedImage);
    // setProduct((prevProduct) => ({
    //   ...prevProduct,
    //   image: [selectedImage],
    // }));
    const files = event.target.files;
    const imagesArray = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onloadend = () => {
        imagesArray.push(reader.result);

        if (imagesArray.length === files.length) {
          setImage(imagesArray);
          setNproduct((prevProduct) => ({
            ...prevProduct,
            image: imagesArray,
          }));
          // console.log(imagesArray);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const save = async () => {
    try {
      setLoading(true);
      const { data } = await axios.patch(
        `/api/v1/product/${params.id}`,
        nproduct
      );

      Swal.fire("Updated Successfully!", "", "success");
      setProduct(data.product);
      if (data.product.addons.length > 0) {
        setAddOn(true);
        setAddons(data.product.addons);
        setAddOnCount(data.product.addons.length);
      }
    } catch (err) {
      Swal.fire("Validation Error", err.response.data.message, "error");
      setLoading(false);
    }
    setLoading(false);
  };

  const del = async () => {
    try {
      const { data } = await axios.delete(`/api/v1/product/${params.id}`);

      Swal.fire("Deleted Successfully!", data.message, "success");
    } catch (err) {
      Swal.fire("Validation Error", err.message, "error");
    }
  };

  return (
    <div className="adminProductDetails">
      <div className="adminProductDetails_top">
        <p>
          Product ID: <span>{params.id}</span>
        </p>
      </div>
      <Link href="/admin/products">
        <IoReturnDownBackSharp />
      </Link>
      <div className="adminPD">
        <div className="adminPD_">
          <div>
            <div className="adminPD_name">
              <p>Name</p>
              <input
                type="text"
                name="name"
                id="name"
                placeholder={"Product Name"}
                value={product.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="adminPD_name">
              <p>Description</p>
              <textarea
                id="description"
                rows="4"
                name="description"
                value={product.description}
                placeholder="Product Description"
                onChange={handleInputChange}
              />
            </div>
            <div className="adminPD_name">
              <p>Price</p>
              <input
                type="number"
                name="price"
                id="price"
                placeholder={"Product Price"}
                value={product.price}
                onChange={handleInputChange}
              />
            </div>
            <div className="adminPD_name">
              <p>Category</p>
              <input
                type="text"
                name="category"
                id="category"
                placeholder={"Product Category"}
                value={product.category}
                onChange={handleInputChange}
              />
            </div>
            <div className="adminPD_name">
              <p>Featured</p>
              <input
                type="checkbox"
                name="featured"
                id="featured"
                checked={product.featured}
                onChange={handleInputChange}
              />
            </div>
            <div className="adminPD_name" style={{ marginBottom: "2rem" }}>
              <p>Tags</p>
              <input
                type="text"
                name="tags"
                id="tags"
                placeholder="Example harshit,sharma,dev"
                value={product.tags}
                onChange={handleInputChange}
              />
            </div>
            <div className="adminPD_name">
              <p>Addons</p>
              <input
                type="checkbox"
                name="addons"
                id="addons"
                checked={addOn}
                onChange={handleInputChange}
              />
            </div>
            <div className="divider" style={{ marginBottom: "2rem" }}></div>
          </div>
          {addOn === true &&
            [...Array(addOnCount)].map((_, index) => {
              const addon = addons[index];

              return (
                <>
                  <div className="adminPD_addon" key={index}>
                    <button onClick={() => handleRemoveAddon(index)}>
                      Remove
                    </button>
                    <input
                      type="text"
                      name="name"
                      onChange={(e) => handleInputChangeA(e, index)}
                      value={addon ? addon.name : ""}
                    />
                    <input
                      type="number"
                      name="price"
                      onChange={(e) => handleInputChangeA(e, index)}
                      value={addon ? addon.price : ""}
                      min={0}
                    />
                  </div>
                  {index === addOnCount - 1 && (
                    <button onClick={handleAddMore}>Add More</button>
                  )}
                </>
              );
            })}
        </div>
        <div className="adminPD__">
          <div className="adminPD_img">
            <p>Image</p>
            <input type="file" name="image" onChange={handleImageChange} />
            <div>
              <Image
                src={image ? image[0] : product.image}
                width={500}
                height={500}
                alt="Product Image"
              />
            </div>
          </div>
          <div className="adminPD__v">Views: {product.viewCount}</div>
          <div className="adminPD__bt">
            <button onClick={save}>Save</button>
            <button onClick={del}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

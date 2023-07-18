"use client";
import React, { useEffect, useState } from "react";
import "@/components/styles/admin/productDetails.css";
import axios from "axios";
import Loader from "@/components/loader";
import { IoReturnDownBackSharp } from "react-icons/io5";
import Link from "next/link";
import Swal from "sweetalert2";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Page = ({ params }) => {
  const router = useRouter();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    featured: false,
    tags: "",
    addons: [],
    sizes: [],
  });
  const [addOn, setAddOn] = useState(false);
  const [size, setSize] = useState(false);
  const [addons, setAddons] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [addOnCount, setAddOnCount] = useState(0);
  const [sizeCount, setSizeCount] = useState(0);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newProduct, setNewProduct] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/v1/product/${params.id}`);
        setProduct(data.product);
        setSizes(data.product.sizes);
        setAddons(data.product.addons);
        setAddOnCount(data.product.addons.length);
        setSizeCount(data.product.sizes.length);
        setSize(data.product.sizes.length > 0);
        setAddOn(data.product.addons.length > 0);
      } catch (err) {
        setLoading(false);
        console.error(err);
      }
      setLoading(false);
    };
    getData();
  }, []);

  if (loading === true) {
    return <Loader />;
  }

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
          setProduct((prevProduct) => ({
            ...prevProduct,
            image: imagesArray,
          }));
          setNewProduct((prevProduct) => ({
            ...prevProduct,
            image: imagesArray,
          }));
          // console.log(imagesArray);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleAddMore = () => {
    setAddOnCount((prevCount) => prevCount + 1);
  };
  const handleAddMoreSize = () => {
    setSizeCount((prevCount) => prevCount + 1);
  };

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
    addon = addon.splice(0, addons.length + 1);
    setAddons(updatedAddons);
    setProduct((prevProduct) => ({
      ...prevProduct,
      addons: addon,
    }));
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      addons: addon,
    }));
  };
  const handleInputChangeS = (e, index) => {
    const { name, value, type, checked } = e.target;
    const updatedSizes = [...sizes];
    if (name === "price") {
      const price = parseFloat(value);
      updatedSizes[index] = {
        ...updatedSizes[index],
        [name]: price,
      };
    } else {
      updatedSizes[index] = {
        ...updatedSizes[index],
        [name]: value.toLowerCase(),
      };
    }
    let size = [...updatedSizes];
    size = size.splice(0, sizes.length + 1);
    setSizes(updatedSizes);
    setProduct((prevProduct) => ({
      ...prevProduct,
      sizes: size,
    }));
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      sizes: size,
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
      setAddOnCount(checked ? 1 : 0);
      if (!checked) {
        setProduct((prevProduct) => ({
          ...prevProduct,
          addons: [],
        }));
        setNewProduct((prevProduct) => ({
          ...prevProduct,
          addons: [],
        }));
        return;
      }
    }

    if (name === "sizes") {
      setSize(checked);
      setSizeCount(checked ? 1 : 0);
      if (!checked) {
        setProduct((prevProduct) => ({
          ...prevProduct,
          sizes: [],
        }));
        setNewProduct((prevProduct) => ({
          ...prevProduct,
          sizes: [],
        }));
        return;
      }
    }

    if (name === "price") {
      newValue = parseFloat(newValue);
    }

    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: newValue,
    }));
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: newValue,
    }));
  };

  const handleRemoveAddon = (index) => {
    const updatedAddons = [...addons];
    updatedAddons.splice(index, 1);
    setAddons(updatedAddons);
    setAddOnCount((prevCount) => prevCount - 1);
    setProduct((prevProduct) => ({
      ...prevProduct,
      addons: updatedAddons,
    }));
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      addons: updatedAddons,
    }));
  };
  const handleRemoveSize = (index) => {
    const updatedSizes = [...sizes];
    updatedSizes.splice(index, 1);
    setSizes(updatedSizes);
    setSizeCount((prevCount) => prevCount - 1);
    setProduct((prevProduct) => ({
      ...prevProduct,
      sizes: updatedSizes,
    }));
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      sizes: updatedSizes,
    }));
  };

  const config = {
    headers: { "Content-Type": "application/json" },
  };

  const save = async () => {
    // console.log(product);
    // setImage(product.image);

    try {
      setLoading(true);

      if (newProduct) {
        const { data } = await axios.patch(
          `/api/v1/product/${product._id}`,
          newProduct,
          config
        );

        Swal.fire("Successfull!", data.message, "success");
        router.push("/admin/products");
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
      router.push("/admin/products");
    } catch (err) {
      Swal.fire("Validation Error", err.message, "error");
    }
  };

  return (
    <div className="adminProductDetails">
      <div className="adminProductDetails_top">
        <p>
          Product ID: <span>{product._id}</span>
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
                value={
                  product.description.charAt(0).toUpperCase() +
                  product.description.slice(1)
                }
                placeholder="Product Description"
                onChange={handleInputChange}
                style={{ textTransform: "none" }}
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
                min={0}
              />
            </div>
            <div className="adminPD_name">
              <p>Category</p>
              <input
                type="text"
                name="category"
                id="category"
                placeholder={"Product Category"}
                value={product.category.replace(/\s+/g, "-")}
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
            <div className="adminPD_name">
              <p>Sizes</p>
              <input
                type="checkbox"
                name="sizes"
                id="sizes"
                checked={size}
                onChange={handleInputChange}
              />
            </div>
            <div className="divider" style={{ marginBottom: "2rem" }}></div>
          </div>
          {addOn === true &&
            [...Array(addOnCount)].map((_, index) => {
              const addon = addons && addons[index];

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
          {size === true &&
            [...Array(sizeCount)].map((_, index) => {
              const size = sizes && sizes[index];

              return (
                <>
                  <div className="adminPD_addon" key={index}>
                    <button onClick={() => handleRemoveSize(index)}>
                      Remove
                    </button>
                    <input
                      type="text"
                      name="name"
                      onChange={(e) => handleInputChangeS(e, index)}
                      value={size ? size.name : ""}
                    />
                    <input
                      type="number"
                      name="price"
                      onChange={(e) => handleInputChangeS(e, index)}
                      value={size ? size.price : ""}
                      min={0}
                    />
                  </div>
                  {index === sizeCount - 1 && (
                    <button onClick={handleAddMoreSize}>Add More</button>
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

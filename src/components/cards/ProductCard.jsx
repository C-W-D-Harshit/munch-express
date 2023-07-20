"use client";
import { addToCart } from "@/redux/features/cartSlice";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  AiFillCloseSquare,
  AiFillPlusSquare,
  AiOutlineClose,
  AiOutlinePlus,
} from "react-icons/ai";
import { useDispatch } from "react-redux";
import ReactStars from "react-stars";
import Swal from "sweetalert2";

const ProductCard = ({ product }) => {
  // console.log(product);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  // const [nProduct, setNproduct] = useState(null);
  const [addons, setAddons] = useState(product.addons);
  const [sizes, setSizes] = useState(product.sizes);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);

  const handleAddonSelection = (addonName) => {
    const isAddonSelected = selectedAddons.includes(addonName);
    if (isAddonSelected) {
      const updatedAddons = selectedAddons.filter(
        (selectedAddon) => selectedAddon !== addonName
      );
      setSelectedAddons(updatedAddons);
    } else {
      setSelectedAddons([...selectedAddons, addonName]);
    }
  };
  // onClick={() => dispatch(addToCart(product))}
  let nProduct;
  const addToCar = () => {
    if (product.sizes.length > 0 || product.addons.length) {
      // open a modal
      setOpen(true);

      // dispatch nProduct to reducer
    } else {
      const updatedProduct = {
        ...product,
        quantity: 1,
      };
      dispatch(addToCart(updatedProduct));
    }
  };

  const handleSizeSelection = (sizeName) => {
    setSelectedSize(sizeName);
  };

  const atp = () => {
    // Calculate the total price of selected addons
    const addonsPrice = selectedAddons.reduce((total, addon) => {
      const addonItem = product.addons.find((item) => item.name === addon);
      return total + addonItem.price;
    }, 0);

    const sizeItem = sizes.find((size) => size.name === selectedSize);
    const sizePrice = sizeItem ? sizeItem.price : 0;

    // Calculate the final price of the product with addons
    const finalPrice = product.price + addonsPrice + sizePrice;

    // Create the updated product object with selected addons, quantity, and final price
    const updatedProduct = {
      ...product,
      selectedAddons: [...selectedAddons],
      selectedSize,
      quantity: 1,
      finalPrice: finalPrice,
    };

    // Set nProduct with the updated product object
    nProduct = updatedProduct;
    console.log(nProduct);

    // Dispatch addToCart action with nProduct
    dispatch(addToCart(nProduct));

    // Reset
    setSelectedSize(null);
    setSelectedAddons([]);

    //close
    setOpen(false);
  };

  const addTobag = () => {
    if (sizes.length > 0 && selectedSize !== null) {
      atp();
    } else {
      Swal.fire("Plz select", "Size", "warning");
    }
  };

  const close = () => {
    setOpen(false);
    setSelectedAddons([]);
    setSelectedSize(null);
  };

  console.log(nProduct);
  console.log(selectedAddons);
  return (
    <>
      {open === true && (
        <>
          <div className="addon">
            <div className="addon_">
              <div className="addon_close" onClick={close}>
                <AiOutlineClose />
              </div>
              <div className="addon__">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={600}
                  height={900}
                />
              </div>
              <div className="addon___">
                {addons.length > 0 ? (
                  <>
                    <p>Select Addons</p>
                    <div className="addon_tb">
                      <div>
                        <p>S.No</p>
                        <p>Name</p>
                        <p>Price</p>
                        <p>Select</p>
                      </div>
                      {addons?.map((addon, index) => (
                        <div key={index}>
                          <p>{index + 1}</p>
                          <p>{addon.name}</p>
                          <p>{addon.price}</p>
                          <input
                            type="checkbox"
                            name={addon.name}
                            checked={selectedAddons.includes(addon.name)}
                            onChange={() => handleAddonSelection(addon.name)}
                          />
                        </div>
                      ))}
                    </div>
                  </>
                ) : null}
                {sizes.length > 0 ? (
                  <>
                    <p>Select Size</p>
                    <div className="addon_tb">
                      <div>
                        <p>S.No</p>
                        <p>Size</p>
                        <p>Price</p>
                        <p>Select</p>
                      </div>
                      {sizes?.map((size, index) => (
                        <div
                          key={index}
                          onClick={() => handleSizeSelection(size.name)}
                        >
                          <p>{index + 1}</p>
                          <p>{size.name}</p>
                          <p>{size.price}</p>
                          <input
                            type="radio"
                            name="size"
                            value={size.name}
                            checked={selectedSize === size.name}
                            onChange={() => handleSizeSelection(size.name)}
                          />
                        </div>
                      ))}
                    </div>
                  </>
                ) : null}

                <button onClick={addTobag}>Add To Bag</button>
              </div>
            </div>
          </div>
          <div className="mob_addon">
            <div className="mob_addon_" onClick={close} />
            <div className="mob_addon__">
              <div className="addon___" style={{ width: "100%" }}>
                {addons.length > 0 ? (
                  <>
                    <p>Select Addons</p>
                    <div className="addon_tb">
                      <div>
                        <p>S.No</p>
                        <p>Name</p>
                        <p>Price</p>
                        <p>Select</p>
                      </div>
                      {addons?.map((addon, index) => (
                        <div key={index}>
                          <p>{index}</p>
                          <p>{addon.name}</p>
                          <p>{addon.price}</p>
                          <input
                            type="checkbox"
                            name={addon.name}
                            checked={selectedAddons.includes(addon.name)}
                            onChange={() => handleAddonSelection(addon.name)}
                          />
                        </div>
                      ))}
                    </div>
                  </>
                ) : null}
                {sizes.length > 0 ? (
                  <>
                    <p>Select Size</p>
                    <div className="addon_tb">
                      <div>
                        <p>S.No</p>
                        <p>Size</p>
                        <p>Price</p>
                        <p>Select</p>
                      </div>
                      {sizes?.map((size, index) => (
                        <div
                          key={index}
                          onClick={() => handleSizeSelection(size.name)}
                        >
                          <p>{index + 1}</p>
                          <p>{size.name}</p>
                          <p>{size.price}</p>
                          <input
                            type="radio"
                            name="size"
                            value={size.name}
                            checked={selectedSize === size.name}
                            onChange={() => handleSizeSelection(size.name)}
                          />
                        </div>
                      ))}
                    </div>
                  </>
                ) : null}

                <button onClick={addTobag}>Add To Bag</button>
              </div>
            </div>
          </div>
        </>
      )}
      <div className="productCard" title={product.name}>
        <Link href={`/dashboard/product/${product._id}`}>
          <div className="productCard_img">
            <Image
              src={product.image}
              alt={product.name}
              width={500}
              height={500}
            />
          </div>
        </Link>
        <div className="productCard_info">
          <div>
            <p>{product.name}</p>
            <ReactStars
              value={product.averageRating}
              color2="#fdb631"
              edit={false}
              half={true}
              size={24}
            />
            <p>₹{product.price}</p>
          </div>
          <div>
            <div onClick={addToCar}>
              <AiOutlinePlus />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;

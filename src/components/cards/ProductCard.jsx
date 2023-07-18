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

const ProductCard = ({ product }) => {
  // console.log(product);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  // const [nProduct, setNproduct] = useState(null);
  const [addons, setAddons] = useState(product.addons);
  const [selectedAddons, setSelectedAddons] = useState([]);

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
    if (product.addons) {
      // open a modal
      setOpen(true);

      // dispatch nProduct to reducer
    } else {
      dispatch(addToCart(product));
    }
  };

  const atp = () => {
    // Calculate the total price of selected addons
    const addonsPrice = selectedAddons.reduce((total, addon) => {
      const addonItem = product.addons.find((item) => item.name === addon);
      return total + addonItem.price;
    }, 0);

    // Calculate the final price of the product with addons
    const finalPrice = product.price + addonsPrice;

    // Create the updated product object with selected addons, quantity, and final price
    const updatedProduct = {
      ...product,
      selectedAddons: [...selectedAddons],
      quantity: 1,
      finalPrice: finalPrice,
    };

    // Set nProduct with the updated product object
    nProduct = updatedProduct;
    console.log(nProduct);

    // Dispatch addToCart action with nProduct
    dispatch(addToCart(nProduct));

    // Reset selected addons
    setSelectedAddons([]);

    //close
    setOpen(false);
  };

  const close = () => {
    setOpen(false);
    setSelectedAddons([]);
  };

  console.log(nProduct);
  console.log(selectedAddons);
  return (
    <>
      {open === true && (
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
              <button onClick={atp}>Add To Bag</button>
            </div>
          </div>
        </div>
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

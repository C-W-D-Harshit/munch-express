"use client";
import React, { useEffect, useState } from "react";
import "@/components/styles/dashboard/cart.css";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import {
  clearCart,
  decrementQuantity,
  incrementQuantity,
} from "@/redux/features/cartSlice";
import Loader from "@/components/loader";
import Swal from "sweetalert2";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  return (
    <div className="cart">
      <div className="cart_" style={{ marginBottom: "4rem" }}>
        {cart.totalQuantity !== 0 ? (
          <>
            <div className="cart_table" style={{ marginBottom: "2rem" }}>
              <div>
                <div>S.No</div>
                <div>Name</div>
                <div>Addons</div>
                <div>Size</div>
                <div>Quantity</div>
                <div>Price</div>
                <div>Final Price</div>
              </div>
              {cart.items.map((item, i) => {
                return (
                  <div key={item._id}>
                    <div>{i + 1}.</div>
                    <div>{item.name}</div>
                    <div className="cart_addon">
                      {item.addons
                        ? item.selectedAddons?.map((addon, i) => {
                            return <div key={addon._id}>{addon}</div>;
                          })
                        : "No Addons!"}
                    </div>
                    <div>{item.selectedSize}</div>
                    <div className="cart_quantity">
                      <div className="cart_quantity_">
                        <div
                          onClick={() => dispatch(decrementQuantity(item._id))}
                        >
                          <AiOutlineMinus />
                        </div>
                        <div>{item.quantity}</div>
                        <div
                          onClick={() => dispatch(incrementQuantity(item._id))}
                        >
                          <AiOutlinePlus />
                        </div>
                      </div>
                    </div>
                    <div>{item.price}</div>
                    <div>
                      {(item.finalPrice ? item.finalPrice : item.price) *
                        item.quantity}
                    </div>
                  </div>
                );
              })}
            </div>
            <button
              className="cart_clear"
              onClick={() => dispatch(clearCart())}
            >
              Clear Bag
            </button>
          </>
        ) : (
          <div>
            <p>Nothing in Bag</p>
          </div>
        )}
      </div>
      <div className="cart__">
        {cart.totalQuantity !== 0 && (
          <>
            <div>
              <div>
                <p>Coupon</p>
                <input type="text" name="coupon" id="coupon" />
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <p>Delivery Price</p>
                <p>40</p>
              </div>
              <div className="divider" style={{ marginBottom: "1rem" }}></div>

              <div>
                <p>Total Price</p>
                <p>{cart.totalPrice}</p>
              </div>
            </div>
            <button
              onClick={() => {
                Swal.fire("Sorry!", "This is a demo Website!", "warning");
              }}
            >
              Checkout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;

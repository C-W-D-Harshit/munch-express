import React from "react";

const page = ({ params }) => {
  return (
    <div className="adminUserDetails">
      <p>Coupon ID: {params.id}</p>
    </div>
  );
};

export default page;

import Link from "next/link";
import React from "react";

const layout = ({ children }) => {
  return (
    <div className="profile">
      <div className="profile_">
        <p>Profile:</p>
        <div className="profile_acc">
          <Link href="/dashboard/profile">
            <p>Personal Info</p>
          </Link>
          <Link href="/dashboard/profile/order-history">
            <p>Order History</p>
          </Link>
          <Link href="/dashboard/profile/update-profile">
            <p>Update Profile</p>
          </Link>
          <Link href="/dashboard/profile/change-password">
            <p>Change Passoword</p>
          </Link>
        </div>
      </div>
      <div className="profile__">{children}</div>
    </div>
  );
};

export default layout;

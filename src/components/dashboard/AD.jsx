import axios from "axios";
import { cookies } from "next/headers";
import Image from "next/image";

const getData = async () => {
  const res = await fetch(`${process.env.LINK}/api/v1/user/me`, {
    headers: { Cookie: cookies().toString() },
    next: { revalidate: 10 },
  });

  return res.json();
};

const AD = async () => {
  const { user } = await getData();

  return (
    <div className="dashAd">
      <div className="dashboard_ad">
        <div className="dashboard_ad_img">
          <Image src="/ad.png" width={500} height={500} alt="ad" />
        </div>
        <div>
          <p>Hello {user ? user?.name?.split(" ")[0] : "User"},</p>
          <p>
            Get free delivery on orders above <span>₹499</span>
          </p>
          <button>Learn More</button>
        </div>
      </div>
      <div className="dashboard_secAd">
        <p>Coupons</p>
      </div>
    </div>
  );
};

export default AD;

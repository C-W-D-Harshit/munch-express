import AD from "@/components/dashboard/AD";
import Popholder from "@/components/dashboard/Popholder";
import React from "react";

const Dashboard = () => {
  return (
    <main className="dashboard">
      <AD />
      <Popholder feature={"category"} title="Categories" link="categories" />
      <Popholder feature={"isPopular"} title="Popular Now" link="popular" />
      <Popholder feature={"featured"} title="Featured" link="featured" />
    </main>
  );
};

export default Dashboard;

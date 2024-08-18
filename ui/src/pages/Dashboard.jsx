import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashboardProfile from "../components/DashboardProfile";
import Dashposts from "../components/Dashposts";
import DashUsers from "../components/DashUsers";
import DashComments from "../components/DashComments";
import DashboardComp from "../components/DashboardComp";
import DashChart from "../components/DashChart";

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
    console.log(tabFromUrl);
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        <DashSidebar />
      </div>
      <div className="flex-grow ml-10">
        {tab === "profile" && <DashboardProfile />}
        {tab === "posts" && <Dashposts />}
        {tab === "users" && <DashUsers />}
        {tab === "comments" && <DashComments />}

        {/* {tab === "dash" && <DashChart />} */}
        {tab === "dash" && <DashboardComp />}
        
      </div>
    </div>
  );
};

export default Dashboard;

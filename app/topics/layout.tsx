import Navbar from "@/components/Navbar";
import React from "react";

function TopicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dashboard-layout">
      <Navbar />
      <main>{children}</main>
    </div>
  );
}

export default TopicLayout;

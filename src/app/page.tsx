"use client";
import { useState } from "react";
import DashboardCards from "./dashBoradCards";
import ProductsPage from "./products/page";
import Sidebar from "./sideBar";

export default function Home() {
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6">
        <h1 className="text-2xl font-bold text-gray-200">Dashboard</h1>

        {/* Dashboard Cards */}
        <DashboardCards />

        {/* Product List */}
        <ProductsPage />
      </div>
    </div>
  );
}
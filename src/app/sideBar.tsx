"use client";
import { useState } from "react";

type SidebarProps = {
  isOpen: boolean;
  toggleSidebar: () => void;
};

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const [active, setActive] = useState<string>("Dashboard");
  const menuItems: string[] = ["Dashboard", "Product", "Order", "Delivery"];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden p-3 text-white bg-green-600 fixed top-4 left-4 z-50 rounded-md"
      >
        ☰
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-gray-900 text-white shadow-md p-4 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:translate-x-0 md:relative md:flex md:flex-col md:w-64`}
      >
        <h2 className="text-xl font-bold text-green-600">ElaAdmin</h2>
        <ul className="mt-6 space-y-2">
          {menuItems.map((item) => (
            <li
              key={item}
              onClick={() => setActive(item)}
              className={`p-2 rounded-lg cursor-pointer transition-colors ${
                active === item ? "bg-green-500 text-white" : "hover:bg-gray-700"
              }`}
            >
              {item}
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}
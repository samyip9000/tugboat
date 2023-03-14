import React from "react";

export default function SidebarMenuItem({ text, Icon, active }) {
  return (
    <div className="hoverEffect flex items-center text-gray-700 justify-center">
      <Icon className="h-7" />
      <span className={`${active && "font-bold"} hidden xl:inline` }>{text}</span>
    </div>
  );
}

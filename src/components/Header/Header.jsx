import React from "react";
import { BarIcon, NotificationIcon } from "../../Svg/Svg";

export default function Header({onToggle}) {
  return  (
    <header className="sticky top-0 right-0 flex items-center justify-between py-5 z-[1]">
      {/* header right side */}
      <div className="flex items-center gap-4">
        <img src="./public/images/profile.png" className="w-[50px] h-[50px] rounded-full" alt="profile" />
        <div className="flex flex-col gap-1">
          <span className="text-sm">محمدامین سعیدی راد</span>
          <span className="text-xs text-[#858585]">برنامه نویس فرانت اند</span>
        </div>
      </div>

      {/* header left side */}
      <div className="flex items-center gap-5">
        <div className="hidden lg:flex items-center gap-1 relative bg-white rounded-xl p-1 shadow-primary">
          <input type="text" className="px-2 border-none outline-none" placeholder="جستحو کنید..." />
          <button className="bg-blue hover:bg-blue-hover text-white px-3 py-1 rounded-xl">جست و جو</button>
        </div>

        <button className="bg-blue hover:bg-blue-hover text-white p-2 rounded-xl shadow-primary">
          <NotificationIcon />
        </button>
        <button
          className="bg-blue hover:bg-blue-hover text-white p-2 rounded-xl shadow-primary lg:hidden"
          onClick={onToggle}
        >
          <BarIcon />
        </button>
      </div>
    </header>
  );
}

import React from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import { BagIcon, CloseIcon, CommentsIcon, DiscountIcon, HomeIcon, ProductIcon, UsersIcon } from "../../Svg/Svg";

export default function Sidebar({ isOpen, onToggle }) {
  return (
    <aside className={`w-[230px] fixed z-10 ${isOpen === true ? "right-0" : "-right-full"} lg:right-0 top-0 h-screen overflow-y-auto bg-blue flex flex-col gap-5`}>
      <div className="flex items-center justify-between p-[15px] border-b border-b-[#6c48bb]">
        <h2 className="text-white text-lg lg:text-[1.4rem] lg:text-center">به داشبورد خوش آمدید</h2>
        <button className="text-white flex justify-end lg:hidden" onClick={onToggle}>
          <CloseIcon />
        </button>
      </div>
      <ul>
        <li>
          <NavLink to="/" className="sidebar__link text-white flex items-center gap-2 p-[15px] hover:bg-blue-hover">
            <HomeIcon />
            <span className="text-xl">صفحه اصلی</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/products" className="sidebar__link text-white flex items-center gap-2 p-[15px] hover:bg-blue-hover">
            <ProductIcon />
            <span className="text-xl">محصولات</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/comments" className="sidebar__link text-white flex items-center gap-2 p-[15px] hover:bg-blue-hover">
            <CommentsIcon />
            <span className="text-xl">کامنت ها</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/users" className="sidebar__link text-white flex items-center gap-2 p-[15px] hover:bg-blue-hover">
            <UsersIcon />
            <span className="text-xl">کاربران</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/orders" className="sidebar__link text-white flex items-center gap-2 p-[15px] hover:bg-blue-hover">
            <BagIcon />
            <span className="text-xl">سفارشات</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/discounts" className="sidebar__link text-white flex items-center gap-2 p-[15px] hover:bg-blue-hover">
            <DiscountIcon />
            <span className="text-xl">تخفیفات</span>
          </NavLink>
        </li>
      </ul>
    </aside>
  );
}

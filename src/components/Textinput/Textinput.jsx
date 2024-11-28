import React from "react";

export default function Textinput({ icon, placeholder, value, onChange }) {
  return (
    <div className="relative flex items-center gap-2.5 px-5 rounded-[10px] bg-[#f4f4f4]">
      {icon}
      <input type="text" placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} className="w-full outline-none border-none bg-[#f4f4f4] text-black py-2 px-2.5 text-[1.1rem]" />
    </div>
  );
}
